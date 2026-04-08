import { useEffect, useState } from 'react'
import slugify from 'slugify';
import useCategories from '@/hooks/useCategories'
import DataTable from 'react-data-table-component';
import Link from 'next/link'
import Button from '@/components/buttons/simple_btn'
import Spinner from '@/components/loaders/spinner'
import DeleteAction from '@/components/modals/deleteAction';
import { InputText } from '@/components/InputText'
import { InputSelect } from '@/components/InputSelect'
import { productCategoriesTableColumns } from '@/mock/tablesdata'
import { SearchIcon } from '@/public/sidebaricons/SearchIcon'
// imports for Schema and validation
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Tooltip from '@/components/tooltips/tooltip'

export default function ProductCategories() {
    const { categories, getCategories, createCategory, updateCategory, deleteCategories, categLoading } = useCategories()
    const [selectedCategories, setSelectedCategories] = useState([])
    const [query, setQuery] = useState('')
    const [deleteModal, setDeleteModal] = useState(null)

    const filteredCategories = categories.filter((item) => {
        if (query !== '') {
            const { _id, name } = item
            return name.toLowerCase().includes(query.toLowerCase()) || _id.includes(query)
        }
        else return true
    });

    const onClickDelete = () => {
        if (selectedCategories.length == 0) return
        setDeleteModal(
            <DeleteAction
                show={true}
                heading="Delete Category(s)"
                msg={`This is an irreversible action and it may alter the realtions between associated child or parent categories, be sure and careful about deleting categories. All the products associated with the selected categories will be back to the "default" category.`}
                setDeleteModal={setDeleteModal}
                onTakeAction={() => deleteCategories(selectedCategories.map(c => c.id))}
            />
        )
    }
    const getSlug = (e) => {
        const { value } = e.target
        if (value === '' || value.endsWith('/')) return slugify(value, { lower: true })
        else return `${slugify(value, { lower: true })}/`
    }

    const validatedSchema = Yup.object({
        id: Yup.string().min(18).max(30).nullable(),
        name: Yup.string().max(35, "Category name should not exceed 35 chars").required("Please enter a category name."),
        slug: Yup.string().required("Slug is mandatory").matches(/^\S*$/, "Slug should have a '/' and sholdn't contain spaces."),
        parent: Yup.string().nullable(),
        description: Yup.string().max(300, 'description can be a maximum of 300 characters.')
    })

    const { values, touched, handleBlur, handleChange, handleSubmit, handleReset, errors, setFieldValue, setValues } = useFormik({
        initialValues: { id: null, name: '', slug: '', parent: null, description: '' },
        validationSchema: validatedSchema,
        onSubmit: (values) => {
            const { id } = values;
            console.log(values)
            if (id) updateCategory(values)
            if (!id) createCategory(values)
            handleReset()
            return setFieldValue('parent', null)
        }
    })

    useEffect(() => {
        if (categories.length < 1) getCategories()
    }, [])

    return <>
        {deleteModal}
        <div className="flex mt-[15px] justify-between items-center">
            <div>
                <h1 className="font_futura text-[22px] text-black">Categories</h1>
                <div className="flex items-center mt-4 font_futura text-sm gap-x-3">
                    <Link href="/">Home</Link> <i className="fa-solid fa-chevron-right" />
                    <Link href="/categories" >Categories</Link>
                </div>
            </div>
            <div className='flex gap-x-2' >
                <div className='w-64 h-10 py-2 px-5 gap-2 flex items-center bg-gray-50 border border-gray-300 rounded-full' >
                    <SearchIcon />
                    <input
                        type="text"
                        id="search"
                        value={query}
                        onChange={(e) => { setQuery(e.target.value) }}
                        className="w-full h-4 flex items-center text-sm font-[400] font_futuralt bg-transparent outline-none"
                        placeholder="Search (ID or Name)..."
                    />
                </div>
                <Button
                    className="text-black"
                    my="my-0" fontSize="text-sm"
                    loading={categLoading}
                    disabled={categLoading}
                    onClick={async () => { await getCategories() }}>
                    Refetch Data
                </Button>
                <Button
                    my="my-0" fontSize="text-sm"
                    disabled={!selectedCategories || selectedCategories.length == 0}
                    onClick={onClickDelete}
                >Delete</Button>
            </div>
        </div>

        <section className='w-full mt-5 min-h-[30vh] bg-white rounded-2xl card_boxshadow'>
            <div className='w-full p-8 flex gap-12'>
                <form onSubmit={handleSubmit} onReset={(e) => { handleReset(e); setFieldValue('parent', null) }} className='w-1/4 flex flex-col gap-8'>
                    {values.id ? <div className='flex flex-col' >
                        <label htmlFor='id' className='mb-2 font_futura text-sm flex items-center' >ID</label>
                        <span name="id" id='id' className='text-sm whitespace-nowrap'>{values.id}</span>
                    </div> : null}
                    <InputText
                        label="Name (English)"
                        placeholder="Category name"
                        name="name.en"
                        value={values?.name?.en}
                        onChange={(e) => { handleChange(e); setFieldValue('slug', getSlug(e)) }}
                        onBlur={handleBlur}
                        error={errors?.name?.en && touched?.name?.en ? (errors.name.en) : null}
                    />
                    <InputText
                        label="Name (Arabic)"
                        placeholder="Category name"
                        name="name.ar"
                        value={values?.name?.ar}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors?.name?.ar && touched?.name?.ar ? (errors.name.ar) : null}
                    />
                    <InputText
                        label="Slug"
                        placeholder="category-slug/"
                        name="slug"
                        value={values.slug}
                        onChange={(e) => { setFieldValue('slug', getSlug(e)) }}
                        onBlur={handleBlur}
                        error={errors.slug && touched.slug ? (errors.slug) : null}
                    />
                    <InputSelect
                        label="Parent"
                        name="parent"
                        defaultValue="Select Parent"
                        onChange={handleChange}
                        onBlur={handleBlur}>
                        {[{ id: null, path: "Select Parent" }, ...categories?.map((cat) => ({ id: cat._id, path: cat.path }))]?.map((obj, index) => {
                            const { id, path } = obj
                            return <option key={index} value={id} selected={values.parent == id} disabled={index == 0}> {path} </option>
                        })}
                    </InputSelect>
                    <div className="relative w-full data_field items-center">
                        <h2 className="mb-2 font_futura text-sm text-left">Description (English)</h2>
                        {touched?.description?.en && errors?.description?.en ? <Tooltip classes="form-error" content={errors.description.en} /> : null}
                        <textarea rows={3} className="w-full p-2 bg-transparent outline-none border rounded-md border-gray-300 focus:border-yellow-700 hover:border-yellow-600 transition" type="text" value={values?.description?.en} name="description.en" id="description.en" maxLength={1000} onBlur={handleBlur} onChange={handleChange} placeholder="Wow this category is superb." />
                    </div>
                    <div className="relative w-full data_field items-center">
                        <h2 className="mb-2 font_futura text-sm text-left">Description (Arabic)</h2>
                        {touched?.description?.ar && errors?.description?.ar ? <Tooltip classes="form-error" content={errors.description.ar} /> : null}
                        <textarea rows={3} className="w-full p-2 bg-transparent outline-none border rounded-md border-gray-300 focus:border-yellow-700 hover:border-yellow-600 transition" type="text" value={values?.description?.ar} name="description.en" id="description.en" maxLength={1000} onBlur={handleBlur} onChange={handleChange} placeholder="" />
                    </div>
                    <div className="full flex flex-col gap-y-2">
                        <Button disabled={categLoading} type="reset" bg="bg-gray-100" text="black" classes="w-full" font='font_futura' my="my-0" >Clear</Button>
                        <Button disabled={categLoading} type="submit" classes="w-full" my="my-0" >{values.id ? "Update Category" : "Create Category"}</Button>
                    </div>
                </form>
                <div className='w-3/4 overflow-hidden'>
                    <DataTable
                        className='scrollbar_x'
                        responsive={true}
                        customStyles={{
                            tableWrapper: {
                                style: {
                                    width: "97%",
                                    display: 'block',
                                    overflowY: 'visible',
                                    paddingBottom: "6rem"
                                }
                            }
                        }}
                        columns={productCategoriesTableColumns}
                        pagination
                        progressPending={categLoading}
                        progressComponent={<Spinner forBtn={true} variant="border-black" />}
                        highlightOnHover
                        selectableRows
                        onSelectedRowsChange={(state) => setSelectedCategories(state.selectedRows)}
                        sortIcon={<span className="datatable-sort-icon">&uarr;&darr;</span>}
                        data={filteredCategories.map((cat, index) => {
                            return {
                                id: cat._id,
                                name: cat.name,
                                description: cat.description,
                                slug: cat.slug,
                                order: (index + 1),
                                actions: [
                                    {
                                        onClick: () => {
                                            return setValues({ ...cat, id: cat._id, parent: cat.parent ? cat.parent._id : null })
                                        }, name: "Edit"
                                    },
                                    { onClick: () => { navigator.clipboard.writeText(cat._id) }, name: "Copy ID" },
                                    {
                                        onClick: () => {
                                            setDeleteModal(
                                                <DeleteAction
                                                    show={true}
                                                    heading="Delete Category(s)"
                                                    msg={`This is an irreversible action and it may alter the realtions between associated child or parent categories, be sure and careful about deleting categories. All the products associated with the selected categories will be back to the "default" category.`}
                                                    setDeleteModal={setDeleteModal}
                                                    onTakeAction={() => deleteCategories([cat._id])}
                                                />
                                            )
                                        }, name: "Delete"
                                    }
                                ]
                            }
                        })}
                    />
                </div>
            </div>
        </section>
    </>
}