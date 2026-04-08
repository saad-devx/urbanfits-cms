import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/buttons/simple_btn";
import LinkBtn from "@/components/buttons/link_btn";
import DeleteAction from "@/components/modals/deleteAction";
import CardAdmin from "@/components/cards/cardadmin";
import Spinner from "@/components/loaders/spinner";
import DataTable from 'react-data-table-component';
import useCoupon from "@/hooks/useCoupon";
import { SearchIcon } from "@/public/sidebaricons/SearchIcon";
import { CSVLink } from "react-csv";
import { couponsTableColumns } from "@/mock/tablesdata";

export default function AllCoupons() {
    const { getCoupons, couponLoading, deleteCoupon } = useCoupon()
    const [coupons, setCoupons] = useState([])
    const [query, setQuery] = useState('')
    const [actionsTip, setActionsTip] = useState(false)
    const [deleteModal, setDeleteModal] = useState(null)
    const [selectedCoupons, setSelectedCoupons] = useState([])

    const filteredCoupons = coupons.filter((item) => {
        if (query !== '') {
            const { _id, name } = item
            return name.toLowerCase().includes(query.toLowerCase()) || _id.includes(query)
        }
        else return true
    });

    // const onClickDelete = () => {
    //     if (!selectedCoupons.length) return
    //     setDeleteModal(
    //         <DeleteAction
    //             show={true}
    //             heading="Delete Coupons(s)"
    //             msg={`This is an irreversible action, are you sure you want to delete ${selectedCoupons} selected coupons?`}
    //             setDeleteModal={setDeleteModal}
    //             onTakeAction={() => { }}
    //         />
    //     )
    // }

    const CsvHeaders = [
        { label: 'Coupon ID', key: '_id' },
        { label: 'Coupon Name', key: 'name' },
        { label: 'Worth/Price', key: 'coupon_value' },
        { label: 'Created At', key: 'createdAt' },
        { label: 'Expiration At', key: 'expiration_date' }
    ];
    const CsvData = selectedCoupons.map(coupon => ({
        ...coupon,
        expiration_date: coupon.expiration_date || "N/A",
    }))

    useEffect(() => {
        getCoupons((coupon_data) => setCoupons(coupon_data))
        return () => setCoupons([])
    }, [])

    return <>
        <div className="flex mt-[15px] justify-between items-center">
            <nav>
                <h2 className="font_futura text-[22px]">Coupons List</h2>
                <div className="flex items-center mt-4 font_futura text-sm gap-x-3">
                    <Link href="/">Home</Link> <i className="fa-solid fa-chevron-right" />
                    <span>Coupons</span>
                </div>
            </nav>
            <LinkBtn href="/coupons/create-coupon">Create Coupon</LinkBtn>
        </div>

        {deleteModal}

        <CardAdmin classes="p-[40px] mt-[30px] min-h-[80vh]">
            <div className="flex justify-between">
                <div className="flex items-center gap-[13px] " >
                    <div className='w-64 h-10 py-2 px-5 gap-2 flex items-center bg-gray-50 border border-gray-300 rounded-full' >
                        <SearchIcon />
                        <input
                            type="text"
                            id="search"
                            value={query}
                            onChange={(e) => { setQuery(e.target.value) }}
                            className="w-full h-4 flex items-center text-sm font_futuralt bg-transparent outline-none"
                            placeholder="Search (ID or Name)..."
                        />
                    </div>
                </div>
                <span className={`${selectedCoupons.length ? "right-8" : "-right-full"} fixed z-40 bottom-10 px-20 py-3 rounded-full bg-black/40 backdrop-blur-[2px] flex items-center text-base text-white transition-all duration-700`}>Selected: {selectedCoupons?.length}</span>
                <section className='flex gap-x-4'>
                    {/* <div className="relative z-40 h-10 p-px text-sm bg-gold-land flex justify-center items-center rounded-lg">
                        <button onClick={() => setActionsTip(!actionsTip)} className="w-full h-full px-5 flex justify-center items-center text-xs bg-white rounded-[7px]">
                            Actions&nbsp;&nbsp;
                            <svg className={actionsTip && "rotate-180"} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.718574 1.26652C0.471471 0.976974 0.475731 0.51076 0.729225 0.226124C0.852776 0.0862599 1.01361 0.0163273 1.1755 0.0163274C1.34166 0.0163274 1.50675 0.0899399 1.63136 0.238392L4.99708 4.20367L8.44587 0.231032C8.6951 -0.0536042 9.09984 -0.054831 9.35014 0.232259C9.59831 0.520576 9.59831 0.985564 9.34907 1.27388L5.44336 5.77162C5.323 5.90903 5.1611 5.98633 4.99175 5.98633L4.98749 5.98633C4.81708 5.9851 4.65305 5.90535 4.53483 5.76426L0.718574 1.26652Z" fill="#C4C4C4" />
                            </svg>
                        </button>
                        <span className={`${actionsTip ? null : "opacity-0"} absolute left-1/2 -translate-x-1/2 top-[120%] min-w-full group-hover:max-h-52 px-3 bg-white equillibrium_shadow rounded-lg transition-all duration-500 overflow-hidden`}>
                            <button onClick={() => { onClickDelete(); setActionsTip(!actionsTip) }} className={`${!selectedCoupons.length && "pointer-events-none opacity-60"} w-full py-2 mb-1 hover:border-b hover:border-black text-xs text-left transition-all`}>Delete Coupons</button>
                        </span>
                    </div> */}
                    <Button onClick={() => setActionsTip(!actionsTip)} disabled={!selectedCoupons.length}>
                        <CSVLink className="text-xs" data={CsvData} headers={CsvHeaders} filename="urbanfits-users_data.csv">
                            Export Selected in CSV
                        </CSVLink>
                    </Button>
                    <button title="Refresh Data" disabled={couponLoading} onClick={() => getCoupons((coupon_data) => setCoupons(coupon_data))} className={`fa-solid fa-arrows-rotate text-sm ${couponLoading ? "fa-spin" : null}`}></button>
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
                            paddingBottom: "6rem"
                        }
                    }
                }}
                columns={couponsTableColumns}
                progressPending={couponLoading}
                progressComponent={<Spinner forBtn={true} variant="border-black" />}
                noDataComponent={<p>No Coupons to display</p>}
                highlightOnHover
                selectableRows
                onSelectedRowsChange={(state) => setSelectedCoupons(state.selectedRows)}
                sortIcon={<span className="datatable-sort-icon">&uarr;&darr;</span>}
                data={filteredCoupons.map((coupon, i) => {
                    return {
                        id: coupon._id,
                        ...coupon,
                        actions: [
                            { onClick: () => { navigator.clipboard.writeText(coupon._id) }, name: "Copy ID" },
                            {
                                onClick: () => {
                                    setDeleteModal(
                                        <DeleteAction
                                            show={true}
                                            heading="Delete Category(s)"
                                            msg={`This is an irreversible action. Are you sure you want to delete '${coupon.name}' coupon?`}
                                            setDeleteModal={setDeleteModal}
                                            onTakeAction={() => deleteCoupon(coupon._id)}
                                        />
                                    )
                                }, name: "Delete"
                            }
                        ]
                    }
                })}
            />
        </CardAdmin>
    </>
};