import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import DeleteAction from '@/components/modals/deleteAction';
import CardAdmin from "@/components/cards/cardadmin";
import { SearchIcon } from '@/public/sidebaricons/SearchIcon';
import Spinner from '@/components/loaders/spinner';
import Button from "@/components/buttons/simple_btn";
import LinkBtn from '@/components/buttons/link_btn';
import Link from 'next/link';
import { CSVLink } from "react-csv";
import useCategories from '@/hooks/useCategories';
import useProduct from '@/hooks/useProduct';
import { productListTableColumns } from '@/mock/tablesdata';

export default function AllProducts() {
    const { categories, getCategories, categLoading } = useCategories()
    const { products, getProducts, productLoading, totalProducts, deleteProducts, selectedProducts, setSelectedProducts, setProductInfo } = useProduct()
    const [categoryOption, setCategoryOption] = useState(false)
    const [deleteModal, setDeleteModal] = useState(null)
    const [query, setQuery] = useState('')
    const [actionsTip, setActionsTip] = useState(false)
    const [selectable, setSelectable] = useState(false)
    const filteredProducts = products.filter((item) => {
        if (query !== '') {
            const { _id, name } = item
            return name.toLowerCase().includes(query.toLowerCase()) || _id.includes(query)
        }
        else return true
    });

    const CsvHeaders = [
        { label: 'Product Name', key: 'name' },
        { label: 'Price', key: 'price' },
        { label: 'Sale Price', key: 'sale_price' },
        { label: 'In Stock', key: 'stock' },
        { label: 'Status', key: 'status' },
        { label: 'Bundle Items', key: 'bundle_items' },
        { label: 'Categories', key: 'categories' }
    ];
    const CsvData = selectedProducts.map(product => ({
        ...product,
        bundle_items: product.bundle_items?.join(", ") || "N/A",
        categories: product.categories?.map(category => category._id).join(", ")
    }))

    useEffect(() => {
        const getCategoriesAndProducts = async () => {
            if (categories.length !== 0 && products.length !== 0) return
            if (categories.length === 0) await getCategories()
            if (products.length === 0) await getProducts()
        }
        getCategoriesAndProducts()
        return () => { }
    }, [])

    const onCategoryChange = async (e) => {
        const { value } = e.target
        setCategoryOption(value)
        if (value == "false") await getProducts()
        if (value && value.length > 8) await getProducts(1, value)
    }

    const onClickDelete = () => {
        if (selectedProducts.length == 0) return
        setDeleteModal(
            <DeleteAction
                show={true}
                heading="Delete Product(s)"
                msg={`This is an irreversible action, the specified product will be deleted permanently. If it is included in a bundle, only this product will be removed from the bundle and rest of the bundle will remain intact.`}
                setDeleteModal={setDeleteModal}
                onTakeAction={() => deleteProducts(selectedProducts.map(c => c.id))}
            />
        )
    }

    return <>
        {deleteModal}
        <div className="flex mt-[15px] justify-between items-center ">
            <div>
                <h2 className="font_futura text-[22px]">Product List</h2>
                <div className="flex items-center mt-4 font_futura text-sm gap-x-3">
                    <Link href="/">Home</Link> <i className="fa-solid fa-chevron-right" />
                    <span >Products</span> <i className="fa-solid fa-chevron-right" />
                    <Link href="/products">Product List</Link>
                </div>
            </div>
            <div className='flex gap-x-2'>
                <LinkBtn href="/products/addbundle" my="my-0">Create Bundle</LinkBtn>
                <LinkBtn href="/products/addproduct" my="my-0">Add Product</LinkBtn>
            </div>
        </div>

        <CardAdmin classes="px-8 py-10 mt-5">
            <div className="flex justify-between">
                <div className="flex items-center gap-[13px] " >
                    <div className='flex flex-col'>
                        <select onChange={onCategoryChange} value={categoryOption} name="category" className="w-48 h-10 px-3 border rounded-full outline-none bg-gray-50 text-black cursor-pointer" placeholder="Category">
                            {[{ _id: false, path: "All Products" }, ...categories]?.map((category) => ({ value: category._id, name: category.path }))
                                .map((obj, index) => (
                                    <option key={index} value={obj.value}> {obj.name} </option>
                                ))}
                        </select>
                    </div>
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
                <span className={`${selectable ? "right-8" : "-right-full"} fixed z-40 bottom-10 px-20 py-3 rounded-full bg-black/40 backdrop-blur-[2px] flex items-center text-base text-white transition-all duration-700`}>Selected: {selectedProducts?.length}</span>
                <section className='flex gap-x-4'>
                    <div className="relative z-40 h-10 p-px text-sm bg-gold-land flex justify-center items-center rounded-lg">
                        <button onClick={() => setActionsTip(!actionsTip)} className="w-full h-full px-5 flex justify-center items-center text-xs bg-white rounded-[7px]">
                            Actions&nbsp;&nbsp;
                            <svg className={actionsTip && "rotate-180"} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.718574 1.26652C0.471471 0.976974 0.475731 0.51076 0.729225 0.226124C0.852776 0.0862599 1.01361 0.0163273 1.1755 0.0163274C1.34166 0.0163274 1.50675 0.0899399 1.63136 0.238392L4.99708 4.20367L8.44587 0.231032C8.6951 -0.0536042 9.09984 -0.054831 9.35014 0.232259C9.59831 0.520576 9.59831 0.985564 9.34907 1.27388L5.44336 5.77162C5.323 5.90903 5.1611 5.98633 4.99175 5.98633L4.98749 5.98633C4.81708 5.9851 4.65305 5.90535 4.53483 5.76426L0.718574 1.26652Z" fill="#C4C4C4" />
                            </svg>
                        </button>
                        <span className={`${actionsTip ? null : "opacity-0"} absolute left-1/2 -translate-x-1/2 top-[120%] min-w-full group-hover:max-h-52 px-3 bg-white equillibrium_shadow rounded-lg transition-all duration-500 overflow-hidden`}>
                            <button onClick={() => setActionsTip(!actionsTip)} className={`${!selectedProducts.length && "pointer-events-none opacity-60"} w-full py-2 text-xs text-left border-b border-transparent hover:border-black whitespace-nowrap transition-all`}>
                                <CSVLink className={!selectedProducts.length && "pointer-events-none opacity-60"} data={CsvData} headers={CsvHeaders} filename="urbanfits-users_data.csv">
                                    Export Selected in CSV
                                </CSVLink>
                            </button>
                            <Link href="/products/addbundle" disabled={!selectedProducts || selectedProducts.length <= 1} onClick={() => setActionsTip(!actionsTip)} className={`${selectedProducts.length <= 1 && "pointer-events-none opacity-60"} w-full py-2 text-xs text-left border-b border-transparent hover:border-black whitespace-nowrap transition-all`}>
                                Add to Bundle
                            </Link>
                            <button onClick={() => { onClickDelete(); setActionsTip(!actionsTip) }} className={`${!selectedProducts.length && "pointer-events-none opacity-60"} w-full py-2 mb-1 hover:border-b hover:border-black text-xs text-left transition-all`}>Delete Products</button>
                        </span>
                    </div>
                    <Button my="my-0" fontSize="text-sm"
                        onClick={() => {
                            setSelectable(!selectable)
                            setSelectedProducts([])
                        }}
                        classes={selectable ? "shadow-lg shadow-[#c3992c]" : null}
                    >Select Products</Button>
                    <button title="Refresh Data" disabled={productLoading} onClick={() => getProducts(1, categoryOption)} className={`fa-solid fa-arrows-rotate text-sm ${productLoading ? "fa-spin" : null}`}></button>
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
                onChangePage={(page) => getProducts(page, categoryOption)}
                paginationTotalRows={totalProducts}
                paginationPerPage={50}
                paginationRowsPerPageOptions={[50]}
                selectableRows={selectable}
                onSelectedRowsChange={(state) => setSelectedProducts(state.selectedRows)}
                clearSelectedRows={selectable}
                progressPending={categLoading || productLoading}
                progressComponent={<Spinner forBtn={true} variant="border-black" />}
                highlightOnHover
                sortIcon={<span>&uarr;&darr;</span>}
                columns={productListTableColumns}
                data={filteredProducts?.map(product => {
                    return {
                        ...product,
                        id: product._id,
                        product: process.env.NEXT_PUBLIC_BASE_IMG_URL + product.cover_image,
                        name: product.name,
                        price: product.price,
                        offer: 0,
                        purchased: 0,
                        stock: (() => {
                            let stock = 0;
                            product.variants.forEach(variant => {
                                stock += variant.stock
                            });
                            return stock
                        })(),
                        status: "Active",
                        date: product.createdAt,
                        updatedAt: product.updatedAt,
                        handleInfo: () => { console.log(product); setProductInfo(product) },
                        infoLink: "/products/productinfo",
                        actions: [
                            {
                                name: "Edit",
                                link: '/products/productinfo',
                                onClick: () => { setProductInfo(product) }
                            },
                            {
                                name: "Copy ID",
                                onClick: () => { navigator.clipboard.writeText(product._id) }
                            },
                            {
                                name: "Visit",
                                onClick: () => { window.open(`${process.env.NEXT_PUBLIC_HOST}/products/product/${product._id}`) }
                            },
                            {
                                name: "Delete",
                                onClick: () => {
                                    setDeleteModal(
                                        <DeleteAction
                                            show={true}
                                            heading="Delete Product(s)"
                                            msg={`This is an irreversible action, the specified product will be deleted permanently. If it is included in a bundle, only this product will be removed from the bundle and rest of the bundle will remain intact.`}
                                            setDeleteModal={setDeleteModal}
                                            onTakeAction={async () => await deleteProducts([product._id])}
                                        />
                                    )
                                }
                            },
                        ]
                    }
                })}
            />
        </CardAdmin>
    </>
}