import { useEffect, useState } from 'react'
import { SearchIcon } from '@/public/sidebaricons/SearchIcon';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from '@/components/buttons/simple_btn';
import LinkBtn from '@/components/buttons/link_btn';
import CardAdmin from "@/components/cards/cardadmin";
import DeleteAction from '@/components/modals/deleteAction';
import Spinner from '@/components/loaders/spinner';
import DataTable from 'react-data-table-component';
import useOrder from '@/hooks/useOrder';
import { CSVLink } from "react-csv";
import { ordersTableColumns } from '@/mock/tablesdata';

export default function AllOrders() {
    const router = useRouter();
    const { orders, getOrders, totalOrders, selectedOrders, setSelectedOrders, orderLoading, deleteOrders } = useOrder();
    const [deleteModal, setDeleteModal] = useState(null)
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(1)
    const [statusQuery, setStatusQuery] = useState(null)
    const [perPageLimit, setPerPageLimit] = useState(null)
    const [actionsTip, setActionsTip] = useState(false)
    const [selectable, setSelectable] = useState(false)
    const filteredOrders = orders.filter((item) => {
        if (query !== '') {
            const { _id, email } = item
            return email.toLowerCase().includes(query.toLowerCase()) || _id.includes(query)
        }
        else return true
    });

    useEffect(() => {
        const { status } = router?.query;
        if (status) {
            setStatusQuery(status)
            getOrders(1, status);
        }
        else getOrders();
    }, [router.isReady])

    const CsvHeaders = [
        { label: 'Order Id', key: 'id' },
        { label: 'Customer Email', key: 'email' },
        { label: 'Customer Name', key: 'customer_name' },
        { label: 'Price', key: 'price' },
        { label: 'Status', key: 'status' },
        { label: 'Date', key: 'date' }
    ];

    const CsvData = selectedOrders.map(order => ({
        id: order._id,
        email: order.email,
        customer_name: order.name,
        price: order.price_details.total_price + order.price_details.shipping_fees + "د.إ",
        status: order.order_status,
        date: order.createdAt
    }))

    const onClickDelete = () => {
        if (selectedOrders.length == 0) return
        setDeleteModal(
            <DeleteAction
                show={true}
                heading="Delete Order(s)"
                msg={`This is an irreversible action, the specified Order will be deleted permanently both for Admin panel and User.`}
                setDeleteModal={setDeleteModal}
                onTakeAction={() => deleteOrders(selectedOrders)}
            />
        )
    }

    return <>
        {deleteModal}
        <div className="flex mt-[15px] justify-between items-end ">
            <div>
                <h2 className="font_futura text-[22px]">Orders List</h2>
                <div className="flex items-center mt-4 font_futura text-sm gap-x-3">
                    <Link href="/">Home</Link> <i className="fa-solid fa-chevron-right" />
                    <span >Orders</span> <i className="fa-solid fa-chevron-right" />
                    <span>Orders List</span>
                </div>
            </div>
            <LinkBtn href="/products/addproduct" my="my-0">Add Order</LinkBtn>
        </div>

        <CardAdmin classes="px-10 py-[42px] mt-5 ">
            <div className="flex justify-between">
                <div className="flex items-center gap-[13px]" >
                    <div className='w-64 h-10 py-2 px-5 gap-2 flex items-center bg-gray-50 border border-gray-300 rounded-full' >
                        <SearchIcon />
                        <input
                            type="text"
                            id="search"
                            value={query}
                            onChange={(e) => { setQuery(e.target.value) }}
                            className="w-full h-4 flex items-center text-sm font_futuralt bg-transparent outline-none"
                            placeholder="Search (ID or By email)..."
                        />
                    </div>
                </div>
                <span className={`${selectable ? "right-8" : "-right-full"} fixed z-40 bottom-10 px-20 py-3 rounded-full bg-black/40 backdrop-blur-[2px] flex items-center text-base text-white transition-all duration-700`}>Selected: {selectedOrders?.length}</span>
                <section className='flex gap-x-4'>
                    <div className="relative z-40 h-10 p-px text-sm bg-gold-land flex justify-center items-center rounded-lg">
                        <button onClick={() => setActionsTip(!actionsTip)} className="w-full h-full px-5 flex justify-center items-center text-xs bg-white rounded-[7px]">
                            Actions&nbsp;&nbsp;
                            <svg className={actionsTip && "rotate-180"} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.718574 1.26652C0.471471 0.976974 0.475731 0.51076 0.729225 0.226124C0.852776 0.0862599 1.01361 0.0163273 1.1755 0.0163274C1.34166 0.0163274 1.50675 0.0899399 1.63136 0.238392L4.99708 4.20367L8.44587 0.231032C8.6951 -0.0536042 9.09984 -0.054831 9.35014 0.232259C9.59831 0.520576 9.59831 0.985564 9.34907 1.27388L5.44336 5.77162C5.323 5.90903 5.1611 5.98633 4.99175 5.98633L4.98749 5.98633C4.81708 5.9851 4.65305 5.90535 4.53483 5.76426L0.718574 1.26652Z" fill="#C4C4C4" />
                            </svg>
                        </button>
                        <span className={`${actionsTip ? null : "opacity-0"} absolute left-1/2 -translate-x-1/2 top-[120%] min-w-full group-hover:max-h-52 px-3 bg-white equillibrium_shadow rounded-lg transition-all duration-500 overflow-hidden`}>
                            <button onClick={() => setActionsTip(!actionsTip)} className={`${!selectedOrders.length && "pointer-events-none opacity-60"} w-full py-2 text-xs text-left border-b border-transparent hover:border-black whitespace-nowrap transition-all`}>
                                <CSVLink className={!selectedOrders.length && "pointer-events-none opacity-60"} data={CsvData} headers={CsvHeaders} filename="urbanfits-users_data.csv">
                                    Export Selected in CSV
                                </CSVLink>
                            </button>
                            <button onClick={() => { onClickDelete(); setActionsTip(!actionsTip) }} className={`${!selectedOrders.length && "pointer-events-none opacity-60"} w-full py-2 mb-1 hover:border-b hover:border-black text-xs text-left transition-all`}>Delete Orders</button>
                        </span>
                    </div>
                    <Button my="my-0" fontSize="text-sm"
                        onClick={() => {
                            setSelectable(!selectable)
                            setSelectedOrders([])
                        }}
                        classes={selectable ? "shadow-lg shadow-[#c3992c]" : null}
                    >Select Products</Button>
                    <button title="Refresh Data" disabled={orderLoading} onClick={() => getOrders(page, statusQuery, perPageLimit)} className={`fa-solid fa-arrows-rotate text-sm ${orderLoading ? "fa-spin" : null}`}></button>
                </section>
            </div>
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
                pagination
                paginationServer
                paginationDefaultPage={1}
                onChangePage={(page) => { getOrders(page, statusQuery, perPageLimit); setPage(page) }}
                onChangeRowsPerPage={(perPage) => { getOrders(page, statusQuery, perPage); setPerPageLimit(perPage) }}
                paginationTotalRows={totalOrders}
                paginationPerPage={20}
                paginationRowsPerPageOptions={[20, 30, 50, 100]}
                selectableRows={selectable}
                onSelectedRowsChange={(state) => setSelectedOrders(state.selectedRows)}
                clearSelectedRows={selectable}
                progressPending={orderLoading}
                progressComponent={<Spinner forBtn={true} variant="border-black" />}
                highlightOnHover
                sortIcon={<span>&uarr;&darr;</span>}
                columns={ordersTableColumns}
                data={filteredOrders?.map(order => {
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
                            }
                        ]
                    }
                })}
            />
        </CardAdmin>
    </>
}