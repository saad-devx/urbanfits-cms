import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CardAdmin from "@/components/cards/cardadmin";
import Link from "next/link";
import Loader from "@/components/loaders/loader";
import useOrder from "@/hooks/useOrder";
import LinkBtn from "@/components/buttons/link_btn";
import DataTable from 'react-data-table-component';
import mongoose from 'mongoose';
import toaster from "@/utils/toast_function";
import { orderProductDetailTableColumns } from "@/mock/tablesdata";
import { orderStatuses } from "@/uf.config";

export default function OrderDetails() {
    const router = useRouter();
    const { getOneOrder, changeOrderStatus, orderLoading } = useOrder();
    const [order, setOrder] = useState();

    useEffect(() => {
        if (mongoose.Types.ObjectId.isValid(router?.query?.order_id)) getOneOrder(router.query.order_id, (orderData) => setOrder(orderData))
        else toaster("error", "Invalid Order Identifier.")
    }, [router.query])

    const returnWindowData = (() => {
        let date = new Date(order?.createdAt || new Date());
        const currentDate = new Date();
        date.setDate(date.getDate() + 30);
        date = new Date(date);
        let returnExpiry = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();

        if (currentDate.getTime() > date.getTime()) return { expiry: returnExpiry, status: true };
        else return { expiry: returnExpiry, status: false };
    })()
    const date = new Date(order?.createdAt || 0);
    const haveGiftCard = order?.gift_cards?.some(item => item.is_giftcard);

    return <>
        {orderLoading && <Loader />}
        <div className="flex mt-[15px] justify-between items-end ">
            <div>
                <h2 className="font_futura text-[22px]">Order Details</h2>
                <div className="flex items-center mt-4 font_futura text-sm gap-x-3">
                    <Link href="/">Home</Link> <i className="fa-solid fa-chevron-right" />
                    <Link href="/orders">Orders</Link> <i className="fa-solid fa-chevron-right" />
                    <span>Order Details</span>
                </div>
            </div>
            <LinkBtn href="/products/addproduct" my="my-0">Add Order</LinkBtn>
        </div>

        <CardAdmin classes="px-0 py-0 mt-5">
            <div>
                <div className="px-[40px] pt-[57px] flex items-center justify-between ">
                    <p className="text-lg">Order Details</p>
                    <div className="flex items-center leading-tight">Return Window:&nbsp; {returnWindowData.status ? <span className="px-2 py-0.5 rounded-2xl text-xs text-white bg-red-600">closed</span> : <span className="px-2 py-0.5 rounded-2xl text-white text-xs bg-green-500">available</span>}</div>
                    <div className="flex items-center text-lg">
                        Status:&nbsp;
                        <div className="px-2 py-1 rounded-2xl text-xs">
                            <select
                            //  style={order ? { background: orderStatuses[order?.order_status?.status].bg, color: orderStatuses[order?.order_status?.status].text } : null} value={order?.order_status?.status}
                              onChange={(e) => { console.log(e.target.value); changeOrderStatus(order._id, e.currentTarget.value, (orderData) => setOrder(orderData)) }} className={`w-full px-2 py-1 border border-gray-300 transition rounded-lg outline-none bg-transparent`}>
                                {Object.keys(orderStatuses).map(status => <option>{status}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
                <hr className="mt-[17px]" />
                <section className="px-10 py-5 grid grid-cols-2 gap-[67px] ">
                    {!haveGiftCard && <nav className="min-h-[183px] border-[#DADADA] border-[1px] rounded-[25px] ">
                        <div className="h-[48.16px] bg-[#F4F4F4] rounded-t-[25px] flex items-center justify-center text-base">
                            <p>Shipping Address:</p>
                        </div>

                        <div className="p-5 text-sm">
                            <p>{order?.shipping_address?.address_title}</p>
                            <p>{order?.shipping_address?.firstname} {order?.shipping_address?.lastname}</p>
                            <p>{order?.shipping_address?.address}</p>
                            <p>{order?.shipping_address?.city} {order?.shipping_address?.country}</p>
                            <p>{order?.shipping_address?.phone_prefix} {order?.shipping_address?.phone_number}</p>
                        </div>
                    </nav>}
                    <nav className=" min-h-[183px] border-[#DADADA] border-[1px] rounded-[25px] ">
                        <div className="h-[48.16px] bg-[#F4F4F4] rounded-t-[25px] flex items-center justify-center text-base">
                            <p>Shipping Info:</p>
                        </div>

                        <div className="p-5 text-sm grid grid-cols-2">
                            <span>Order Reference: </span><span>{order?._id}</span>
                            <span>Tracking No: </span>{haveGiftCard ? "Doesn't apply" : <span>{order?.tracking_number}</span>}
                            <span>Status Group: </span><span>{order?.order_status?.group}</span>
                            <span>Order Date: </span><span>{date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()} | {date.toLocaleString('en-US', { hour: 'numeric', hour12: true }) + " : " + date.getMinutes()}</span>
                            <span>Return window close on: </span> <span>{returnWindowData.expiry}</span>
                        </div>
                    </nav>
                </section>

                <div className=" flex items-center justify-center h-[66px] bg-[#F9F9F9]  border-b-[1px] border-b-[#DADADA] " >
                    <p>Product Details</p>
                </div>

                <div className="p-10" >
                    {order && <><DataTable
                        className='scrollbar_x'
                        responsive={true}
                        customStyles={{
                            tableWrapper: {
                                style: {
                                    width: "100%",
                                    display: 'block',
                                    overflowY: 'visible',
                                }
                            },
                            head: { style: { fontSize: '13px' } },
                            rows: { style: { minHeight: "70px" } }
                        }}
                        highlightOnHover
                        sortIcon={<span>&uarr;&darr;</span>}
                        columns={orderProductDetailTableColumns}
                        data={(haveGiftCard ? order.gift_cards : order.order_items).map(item => {
                            return {
                                ...item,
                                haveGiftCard,
                                id: item._id,
                            }
                        })} />
                        <div className=" text-[14px] flex items-center gap-[36px] mt-[30px] justify-end " >
                            <span className="flex gap-10px items-center" >
                                <p>Item(s):&nbsp;</p>
                                <p> {haveGiftCard ? order?.gift_cards?.length : order?.order_items?.length} </p>
                            </span>
                            <span className="flex gap-10px items-center" >
                                <p>Shipping Fee:&nbsp;</p>
                                <p> {order.price_details.shipping_fees}د.إ </p>
                            </span>
                            <span className="flex gap-10px items-center" >
                                <p>Total Discount:&nbsp;</p>
                                <p> {order.price_details.total_discount}د.إ </p>
                            </span>
                            <span className="flex gap-10px items-center" >
                                <p>Subtotal:&nbsp;</p>
                                <p> {order.price_details.sub_total}د.إ </p>
                            </span>
                            <span className="flex gap-10px items-center" >
                                <p>Total Price:&nbsp;</p>
                                <p> {order.price_details.total}د.إ </p>
                            </span>
                        </div></>}
                </div>
            </div>
        </CardAdmin>

        {/* <CardAdmin classes="mt-[20px]" >
            <div>
                <div className="flex justify-center items-center text-[14px] font-[400] mt-[43px] mb-[13.5px] " >
                    <p>Tracking Order No - {order.tracking_number}</p>
                </div>
                <hr />

                <div className="px-[40px] pt-[20x] pb-[30px]   " >
                    <div className="grid grid-cols-9 gap-[13.55px] mt-[20px] " >
                        <div className="flex flex-col items-center gap-[15px] " >
                            <div className="w-[50px] h-[50px] flex justify-center items-center bg_btn_gold_2  rounded-xl ">
                                <CartLIcon />
                            </div>
                            <p className="text-center text-[14px] font-[300] " > Confirm Order</p>
                        </div>
                        <span className="mt-[25px] gradient_background h-[1px] " />
                        <div className="flex flex-col items-center gap-[15px] " >
                            <div className="w-[50px] h-[50px] flex justify-center items-center bg_btn_gold_2  rounded-xl ">
                                <ReplaceLIcon />
                            </div>
                            <p className="text-center text-[14px] font-[300] " > Confirm Order</p>
                        </div>
                        <span className="mt-[25px] gradient_background h-[1px] " />
                        <div className="flex flex-col items-center gap-[15px] " >
                            <div className="w-[50px] h-[50px] flex justify-center items-center bg_btn_gold_2  rounded-xl ">
                                <GiftLIcon />
                            </div>
                            <p className="text-center text-[14px] font-[300] " > Confirm Order</p>
                        </div>
                        <span className="mt-[25px] gradient_background h-[1px] " />
                        <div className="flex flex-col items-center gap-[15px] " >
                            <div className="w-[50px] h-[50px] flex justify-center items-center bg-[#DADADA] rounded-xl ">
                                <TruckLIcon />
                            </div>
                            <p className="text-center text-[14px] font-[300] " > Confirm Order</p>
                        </div>
                        <span className="mt-[25px] bg-[black] h-[1px] " />
                        <div className="flex flex-col items-center gap-[15px] " >
                            <div className="w-[50px] h-[50px] flex justify-center items-center bg-[#DADADA] rounded-xl ">
                                <PassengerLIcon />
                            </div>
                            <p className="text-center text-[14px] font-[300] " > Confirm Order</p>
                        </div>
                    </div>
                </div>
            </div>
        </CardAdmin> */}
    </>
};