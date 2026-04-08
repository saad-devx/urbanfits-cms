import { useEffect, useState } from 'react'
import CardAdmin from "@/components/cards/cardadmin";
import Spinner from '@/components/loaders/spinner';
import Button from "@/components/buttons/simple_btn";
import Image from 'next/image';
import Link from 'next/link';
import useProduct from '@/hooks/useProduct';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toaster from '@/utils/toast_function';

const BundleItem = (props) => {
    const { index, errors, handleChange, handleRemoveProduct, getOneProduct, productLoading } = props;
    const [foundProduct, setFoundProduct] = useState(null)
    useEffect(() => {
        if (props.value && props.value.length > 18) getOneProduct(props.value)
        else setFoundProduct(null)
    }, [props.value])
    const getCorrespondingProduct = async (e) => {
        const { value } = e.target
        handleChange(e);
        if (value.length < 10) return
        let product = await getOneProduct(value)
        setFoundProduct(product)
    }

    return <section className='w-full flex items-center' key={props.key}>
        <div className="w-1/2 flex items-center">
            <div className='relative w-4/5 my-4 flex flex-col' >
                <input className={`w-full h-11 px-[10px] py-3 border border-gray-300 focus:border-yellow-700 hover:border-yellow-600 transition rounded-lg outline-none `}
                    width='w-1/2'
                    type="text"
                    name={`products[${index}].id`}
                    value={props.value}
                    onChange={getCorrespondingProduct}
                    onPaste={getCorrespondingProduct}
                    placeholder="Product ID"
                />
                {errors.products && errors.products[index] && errors.products[index].id ? <p className='absolute text-red-600 bottom-[-19px] left-[10px] text-[11px]' >{errors.products[index].id}</p> : null}
            </div>
            {index > 1 && <button type="button" className="fa-solid fa-xmark mx-4" onClick={() => handleRemoveProduct(index)} />}
        </div>
        <div className="w-1/2 flex flex-col justify-center items-center transition-all duration-300">
            {foundProduct ?
                productLoading ? <div className="relative w-1/4 aspect-square flex justify-center"><Spinner variant="border-black" /></div> : <>
                    <div className="w-1/4 aspect-square overflow-hidden">
                        <Image width={560} height={590} src={process.env.NEXT_PUBLIC_BASE_IMG_URL + foundProduct.cover_image} alt="product image" className="w-full h-full rounded-lg md:rounded-xl object-cover object-top" />
                    </div>
                    <h3 className="font_futura my-2 text-lg">{foundProduct.name.en}</h3>
                </> : null}
        </div>
    </section>
}

export default function CreateBundles() {
    const { selectedProducts, getOneProduct, productLoading } = useProduct();
    const validationSchema = Yup.object().shape({
        products: Yup.array().of(
            Yup.object().shape({
                id: Yup.string().required('ID is required'),
            })
        ),
    });

    const initialValues = {
        products: [{ id: '' }, { id: '' }],
    };

    const { values, handleChange, handleReset, handleSubmit, setFieldValue, errors } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            const products = values.products.map(product => product.id)
            setLoading(true)
            const set = [...new Set(products)]
            if (set.length !== values.products.length) {
                toaster("error", "There shouldn't be same IDs.")
                return setLoading(false)
            }
            try {
                const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/products/createbundle`, { products })
                toaster("success", data.msg)
            } catch (error) {
                console.log(error)
                toaster("error", error.response.data.msg)
            }
            handleReset()
            return setLoading(false)
        },
    });

    const handleAddProduct = () => {
        setFieldValue('products', [...values.products, { id: '' }]);
    };

    const handleRemoveProduct = (index) => {
        const newProducts = [...values.products];
        newProducts.splice(index, 1);
        setFieldValue('products', newProducts);
    };

    useEffect(() => {
        if (selectedProducts.length <= 1) return
        setFieldValue('products', selectedProducts.map(product => ({ id: product.id })))
    }, [])

    return <>
        <div className="flex mt-[15px] justify-between items-center ">
            <div>
                <h2 className="font_futura text-[22px]">Create Bundle</h2>
                <div className="flex items-center mt-4 font_futura text-sm gap-x-3">
                    <Link href="/">Home</Link> <i className="fa-solid fa-chevron-right" />
                    <span >Products</span> <i className="fa-solid fa-chevron-right" />
                    <Link href="/addbundle">Create Bundle</Link>
                </div>
            </div>
            <Link href="/products" ><Button my="my-0">All Products</Button></Link>
        </div>

        <CardAdmin classes="px-8 py-10 mt-5 min-h-[50vh]">
            <form onSubmit={handleSubmit} onReset={handleReset}>
                {values.products.map((product, index) => (
                    <BundleItem
                        key={index}
                        index={index}
                        value={product.id}
                        getOneProduct={getOneProduct}
                        productLoading={productLoading}
                        errors={errors}
                        handleChange={handleChange}
                        handleRemoveProduct={handleRemoveProduct}
                    />
                ))}
                <button type="button" className='group text-xs text-white bg-slate-400 px-2 py-1 rounded-md my-4 transition-all duration-300' onClick={handleAddProduct}><i className="fa-solid fa-plus text-white group-hover:rotate-90 group-hover:mr-1 transition-all duration-300" />&nbsp;add another one</button>
                <Button loading={productLoading} disabled={productLoading} type="submit">Create Bundle</Button>
            </form>
        </CardAdmin>
    </>
}