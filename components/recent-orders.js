import { useEffect, useState } from 'react'
import CardAdmin from "@/components/cards/cardadmin";
import DeleteAction from '@/components/modals/deleteAction';
import Spinner from '@/components/loaders/spinner';
import DataTable from 'react-data-table-component';
import useOrder from '@/hooks/useOrder';
import { ordersTableColumns } from '@/mock/tablesdata';

export default function RecentOrders() {
    const { orders, getOrders, orderLoading, deleteOrders } = useOrder();
    const [deleteModal, setDeleteModal] = useState(null);
    const limit = 6

    useEffect(() => {
        getOrders(1, null, limit);
    }, [])

    return <CardAdmin classes="w-full mt-[30px]">
        {deleteModal}
        <div className='p-[30px]'>
            <div className='w-full flex justify-between items-center mb-[10px]'>
                <span className='text-[22px] mb-[10px]'>Recent Orders</span>
                <button title="Refresh Data" disabled={orderLoading} onClick={() => getOrders(1, null, limit)} className={`fa-solid fa-arrows-rotate text-sm ${orderLoading ? "fa-spin" : null}`}></button>
            </div>
            <div className='px-5'>
                <DataTable
                    className='scrollbar_x'
                    responsive={true}
                    customStyles={{
                        tableWrapper: {
                            style: {
                                width: "100%",
                                display: 'block',
                                overflowY: 'visible',
                                paddingBottom: "8rem"
                            }
                        },
                        head: { style: { fontSize: '13px' } },
                        rows: { style: { minHeight: "70px" } }
                    }}
                    progressPending={orderLoading}
                    progressComponent={<Spinner forBtn={true} variant="border-black" />}
                    highlightOnHover
                    sortIcon={<span>&uarr;&darr;</span>}
                    columns={ordersTableColumns}
                    data={orders.map(order => {
                        return {
                            ...order,
                            id: order._id,
                            name: order?.order_items[0]?.name.en || order?.gift_cards[0]?.name,
                            image: order?.order_items[0]?.image || order?.gift_cards[0]?.bg,
                            price: order.price_details.total + "د.إ",
                            status: order.order_status,
                            date: order.createdAt,
                            handleInfo: () => { },
                            infoLink: `/orders/${order._id}`,
                            actions: [
                                {
                                    name: "Copy Reference",
                                    onClick: () => { navigator.clipboard.writeText(order._id) }
                                },
                                {
                                    name: "Copy Tracking no.",
                                    onClick: () => { navigator.clipboard.writeText(order.tracking_number) }
                                },
                                {
                                    name: "Track Order",
                                    onClick: () => { window.open(process.env.NEXT_PUBLIC_HOST + "/trackorder?order_id=" + order._id) }
                                },
                                {
                                    name: "Shipping Label",
                                    onClick: () => { window.open(order.shipping_label_url) }
                                },
                                {
                                    name: "Delete",
                                    onClick: () => {
                                        setDeleteModal(
                                            <DeleteAction
                                                show={true}
                                                heading="Delete Order"
                                                msg={`This is an irreversible action, the specified Order will be deleted permanently both for Admin panel and User.`}
                                                setDeleteModal={setDeleteModal}
                                                onTakeAction={() => deleteOrders([order._id])}
                                            />
                                        )
                                    }
                                },
                            ]
                        }
                    })}
                />
            </div>
        </div>
    </CardAdmin>
}