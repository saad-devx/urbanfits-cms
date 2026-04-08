import { useState } from "react";
import CardAdmin from "@/components/cards/cardadmin";
import { InputText } from "@/components/InputText";
import Link from "next/link";
import InputTextArea from "@/components/InputTextArea";
import Button from "@/components/buttons/simple_btn";
import useProduct from "@/hooks/useProduct";
import useCategories from "@/hooks/useCategories";
import useCoupon from "@/hooks/useCoupon";
import Loader from "@/components/loaders/loader";
import { CouponProductItem, CouponCategoryItem } from "@/components/coupon_comps";
import { useFormik } from "formik";
import { couponSchema } from '@/mock/yupSchemas'
import mongoose from "mongoose";

export default function CreateCoupon() {
    const { getOneProduct, productLoading } = useProduct()
    const { getOneCategory, categLoading } = useCategories()
    const { createCoupon, couponLoading } = useCoupon()
    const [checked, setChecked] = useState(1);
    const [advanceSettings, setAdvanceSettings] = useState(false);
    const handleSectionPosition = (checked) => {
        if (checked == 1) return "translate-x-0"
        else if (checked == 2) return "-translate-x-1/3"
        else return "-translate-x-[66.66%]"
    }

    const { values, touched, errors, handleChange, handleBlur, handleReset, handleSubmit, setFieldValue, setFieldError } = useFormik({
        initialValues: {
            name: '',
            coupon_code: '',
            description: '',
            coupon_value: 0,
            coupon_config: {
                minimum_spend: null,
                maximum_spend: null,
                free_shipping: false,
                individual_use: false,
                exclude_sales: false,
                allowed_products: [''],
                exclude_products: [''],
                allowed_categories: [''],
                exclude_categories: [''],
                allowed_emails: [''],
                coupon_usage_limit: null,
                user_usage_limit: 1
            },
            expiration_date: '',
        },
        validationSchema: couponSchema,
        onSubmit: async (values, { resetForm }) => {
            let finalCouponConfig = structuredClone(values.coupon_config)
            const susArrayNames = ['allowed_products', 'exclude_products', 'allowed_categories', 'exclude_categories', 'allowed_emails']
            susArrayNames.forEach(name => {
                const susArray = eval(`values.coupon_config.${name}`)
                if (susArray.length === 1 && !susArray[0]) return finalCouponConfig = structuredClone({ ...finalCouponConfig, [name]: [] })
                else return
            })
            try {
                await createCoupon({ ...values, coupon_config: finalCouponConfig, ...(values.expiration_date && { expiration_date: values.expiration_date }) })
                resetForm()
            } catch (err) { console.log(err) }
        }
    })

    const handleRemoveArrayItem = (index, pathname) => {
        const newArray = [...eval(`values.${pathname}`)];
        newArray.splice(index, 1);
        setFieldValue(pathname, newArray);
    };

    const getCorrspondingProduct = async (e, setState) => {
        handleChange(e)
        if (!mongoose.Types.ObjectId.isValid(e.target.value)) return setFieldError(e.target.name, "Invalid product id.");
        else await getOneProduct(e.target.value, (product) => setState(product))
    }
    const getCorrspondingCategory = async (e, setState) => {
        handleChange(e)
        if (!mongoose.Types.ObjectId.isValid(e.target.value)) return setFieldError(e.target.name, "Invalid product id.");
        else await getOneCategory(e.target.value, (product) => setState(product))
    }

    return <>
        {couponLoading ? <Loader /> : null}
        <div className="mt-4 flex flex-col">
            <h2 className="font_futura text-[22px]">Create Coupon</h2>
            <div className="flex items-center mt-4 font_futura text-sm gap-x-3">
                <Link href="/">Home</Link> <i className="fa-solid fa-chevron-right" />
                <Link href="/coupons">Coupons</Link> <i className="fa-solid fa-chevron-right" />
                <span>Create Coupon</span>
            </div>
        </div>

        <form onSubmit={handleSubmit} onReset={() => { handleReset(); setAdvanceSettings(false) }}>
            <CardAdmin classes="p-10 mt-[30px]">
                <div className="flex flex-col gap-[20px]">
                    <p className="text-[22px]">Add New Coupon</p>
                    <InputText name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} error={errors.name && touched.name ? errors.name : null} h="h-[56px]" placeholder="Coupon Name" />
                    <InputText name="coupon_code" value={values.coupon_code} onChange={handleChange} onBlur={handleBlur} error={errors.coupon_code && touched.coupon_code ? errors.coupon_code : null} h="h-[56px]" placeholder="Coupon Code (Case Sensitive)" />
                    <p className="text-xs text-red-600">WARNING: After coupon creation, the Coupon Code won't be shown again and will be hashed forever for security, please proceed by saving the Coupon Code in a secure place.</p>

                    <InputTextArea
                        mt="mt-[0px]"
                        placeholder="Description (optional)"
                        h="h-[96px]"
                        width="w-[100%]"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.description && touched.description ? errors.description : null}
                    />
                </div>
            </CardAdmin>
            <CardAdmin classes={`${values.coupon_code?.length < 5 ? "-max-h-0 opacity--0" : "-max-h-screen"} p-10 mt-[30px] overflow-clip transition-all duration-700`}>
                <h1 className="text-xl">Coupon Configuration</h1>
                <div className="text-sm flex gap-[30px]">
                    <button type="button" className={checked == 1 && "gradient_txt_2"} onClick={() => setChecked(1)}>General</button>
                    <button type="button" className={checked == 2 && "gradient_txt_2"} onClick={() => setChecked(2)}>Usage Restriction</button>
                    <button type="button" className={checked == 3 && "gradient_txt_2"} onClick={() => setChecked(3)}>Usage limits</button>
                </div>

                <main className={`w-[300%] flex ${handleSectionPosition(checked)} transition-all duration-300`}>
                    <section className={`w-1/3 h-[15rem] ${checked !== 1 && "opacity-0"} grid grid-cols-2 place-content-center items-center gap-10 transition-all duration-300`}>
                        <InputText
                            label="Coupon Worth/Price (د.إ)"
                            placeholder="0"
                            type="number" name="coupon_value"
                            value={values.coupon_value}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.coupon_value && touched.coupon_value ? errors.coupon_value : null}
                        />
                        <InputText
                            label="Coupon expire date"
                            type="date"
                            placeholder="YYYY-MM-DD" name="expiration_date"
                            value={values.expiration_date}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.expiration_date && touched.expiration_date ? errors.expiration_date : null}
                        />
                        <nav className="flex gap-[10px] mt-[10px] ">
                            <input id="free_shipping" name="coupon_config.free_shipping" value={values.coupon_config?.free_shipping} checked={values.coupon_config?.free_shipping} onChange={handleChange} type="checkbox" />
                            <label htmlFor="free_shipping" className="text-sm cursor-pointer">Allow Free Shipping</label>
                        </nav>
                    </section>
                    <section className={`w-1/3 ${checked !== 2 && "opacity-0"} grid grid-cols-2 gap-10 transition-all duration-300`}>
                        <InputText
                            label="Minimum spend"
                            placeholder="No minimum"
                            type="number"
                            name="coupon_config.minimum_spend"
                            value={values.coupon_config?.minimum_spend || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors?.coupon_config?.minimum_spend && touched?.coupon_config?.minimum_spend ? errors?.coupon_config?.minimum_spend : null}
                        />
                        <InputText
                            label="Maximum spend"
                            placeholder="No maximum"
                            type="number"
                            name="coupon_config.maximum_spend"
                            value={values.coupon_config?.maximum_spend || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors?.coupon_config?.maximum_spend && touched?.coupon_config?.maximum_spend ? errors?.coupon_config?.maximum_spend : null}
                        />
                        <div>
                            <p className="flex items-center text-[14px] font-[500] gap-[30px]">Individual use only</p>
                            <div className="flex items-center gap-[10px] text-sm mt-[21px]">
                                <input id="individual_use" name="coupon_config.individual_use" value={values.coupon_config?.individual_use} checked={values.coupon_config?.individual_use} onChange={handleChange} onBlur={handleBlur} error={errors?.coupon_config?.individual_use && touched?.coupon_config?.individual_use ? errors?.coupon_config?.individual_use : null} type="checkbox" />
                                <label htmlFor="individual_use" className="cursor-pointer">Check this box if the coupon cannot be used in conjunction with other. </label>
                            </div>
                        </div>
                        <div>
                            <p className="flex items-center text-[14px] font-[500] gap-[30px] " >Exclude sale items</p>
                            <div className="flex items-center gap-[10px] text-sm mt-[21px] " >
                                <input id="exclude_sales" name="coupon_config.exclude_sales" value={values.coupon_config?.exclude_sales} checked={values.coupon_config?.exclude_sales} onChange={handleChange} onBlur={handleBlur} error={errors?.coupon_config?.exclude_sales && touched?.coupon_config?.exclude_sales ? errors?.coupon_config?.exclude_sales : null} type="checkbox" />
                                <label htmlFor="exclude_sales" className="cursor-pointer">Check this box if the coupon should not apply to items on sales. &nbsp; &nbsp; &nbsp; </label>
                            </div>
                        </div>


                        <div className="flex items-center gap-[10px] text-sm mt-[21px]">
                            <input id="advance_settings" type="checkbox" value={advanceSettings} checked={advanceSettings} onChange={(e) => setAdvanceSettings(e.target.value === "false")} />
                            <label htmlFor="advance_settings" className="cursor-pointer select-none">Advanced</label>
                        </div>

                        <section style={{ maxHeight: advanceSettings ? "250vh" : "0" }} className="col-span-full w-full transition-all duration-500 overflow-hidden space-y-4">
                            <div className="col-span-full w-full px-6 py-4 border rounded-lg">
                                <h3 className="text-2xl mb-4">Allowed Products</h3>
                                {values.coupon_config?.allowed_products?.map((p_id, index) => <CouponProductItem nameExtension="allowed_products" values={values} errors={errors} index={index} handleBlur={handleBlur} handleRemoveArrayItem={handleRemoveArrayItem} getCorrspondingProduct={getCorrspondingProduct} productLoading={productLoading} />)}
                                <button type="button" className='group text-xs text-white bg-slate-400 px-2 py-1 rounded-md my-4 transition-all duration-300' onClick={() => setFieldValue('coupon_config.allowed_products', [...values.coupon_config.allowed_products, ''])}><i className="fa-solid fa-plus text-white group-hover:rotate-90 group-hover:mr-1 transition-all duration-300" />&nbsp;add another one</button>
                            </div>
                            <div className="col-span-full w-full px-6 py-4 border rounded-lg">
                                <h3 className="text-2xl mb-4">Exclude Products</h3>
                                {values.coupon_config?.exclude_products?.map((p_id, index) => <CouponProductItem nameExtension="exclude_products" values={values} errors={errors} index={index} handleBlur={handleBlur} handleRemoveArrayItem={handleRemoveArrayItem} getCorrspondingProduct={getCorrspondingProduct} productLoading={productLoading} />)}
                                <button type="button" className='group text-xs text-white bg-slate-400 px-2 py-1 rounded-md my-4 transition-all duration-300' onClick={() => setFieldValue('coupon_config.exclude_products', [...values.coupon_config.exclude_products, ''])}><i className="fa-solid fa-plus text-white group-hover:rotate-90 group-hover:mr-1 transition-all duration-300" />&nbsp;add another one</button>
                            </div>

                            <div className="col-span-full w-full px-6 py-4 border rounded-lg">
                                <h3 className="text-2xl mb-4">Allowed Categories</h3>
                                {values.coupon_config?.allowed_categories?.map((c_id, index) => <CouponCategoryItem nameExtension="allowed_categories" values={values} errors={errors} index={index} handleBlur={handleBlur} handleRemoveArrayItem={handleRemoveArrayItem} getCorrspondingCategory={getCorrspondingCategory} categLoading={categLoading} />)}
                                <button type="button" className='group text-xs text-white bg-slate-400 px-2 py-1 rounded-md my-4 transition-all duration-300' onClick={() => setFieldValue('coupon_config.allowed_categories', [...values.coupon_config.allowed_categories, ''])}><i className="fa-solid fa-plus text-white group-hover:rotate-90 group-hover:mr-1 transition-all duration-300" />&nbsp;add another one</button>
                            </div>
                            <div className="col-span-full w-full px-6 py-4 border rounded-lg">
                                <h3 className="text-2xl mb-4">Exclude Categories</h3>
                                {values.coupon_config?.exclude_categories?.map((c_id, index) => <CouponCategoryItem nameExtension="exclude_categories" values={values} errors={errors} index={index} handleBlur={handleBlur} handleRemoveArrayItem={handleRemoveArrayItem} getCorrspondingCategory={getCorrspondingCategory} categLoading={categLoading} />)}
                                <button type="button" className='group text-xs text-white bg-slate-400 px-2 py-1 rounded-md my-4 transition-all duration-300' onClick={() => setFieldValue('coupon_config.exclude_categories', [...values.coupon_config.exclude_categories, ''])}><i className="fa-solid fa-plus text-white group-hover:rotate-90 group-hover:mr-1 transition-all duration-300" />&nbsp;add another one</button>
                            </div>

                            <div className="col-span-full w-full">
                                <h3>Allowed Emails</h3>
                                {values.coupon_config?.allowed_emails?.map((email, index) => <div className="w-full flex items-center"><InputText
                                    classes="w-3/5"
                                    placeholder="Allowed email"
                                    type="number"
                                    name="coupon_config.allowed_emails"
                                    value={values.coupon_config?.allowed_emails}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors?.coupon_config?.allowed_emails && touched?.coupon_config?.allowed_emails ? errors?.coupon_config?.allowed_emails : null}
                                />
                                    {index !== 0 && <button type="button" className="fa-solid fa-xmark mx-4" onClick={() => handleRemoveArrayItem(index, "coupon_config.allowed_emails")} />}
                                </div>)}
                                <button type="button" className='group text-xs text-white bg-slate-400 px-2 py-1 rounded-md my-4 transition-all duration-300' onClick={() => setFieldValue('coupon_config.allowed_emails', [...values.coupon_config.allowed_emails, ''])}><i className="fa-solid fa-plus text-white group-hover:rotate-90 group-hover:mr-1 transition-all duration-300" />&nbsp;add another one</button>
                            </div>
                        </section>
                    </section>

                    <section className={`w-1/3 ${checked !== 3 && "opacity-0"} grid grid-cols-2 gap-10 transition-all duration-300`}>
                        <InputText
                            label="Usage limit coupon"
                            placeholder="Unlimited usage"
                            type="number"
                            name="coupon_config.coupon_usage_limit"
                            value={values.coupon_config?.coupon_usage_limit || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors?.coupon_config?.coupon_usage_limit && touched?.coupon_config?.coupon_usage_limit ? errors?.coupon_config?.coupon_usage_limit : null}
                        />
                        <InputText
                            label="Usage limit per user"
                            placeholder="Unlimited usage"
                            type="number"
                            name="coupon_config.user_usage_limit"
                            value={values.coupon_config?.user_usage_limit || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors?.coupon_config?.user_usage_limit && touched?.coupon_config?.user_usage_limit ? errors?.coupon_config?.coupon_usage_limit : null}
                        />
                    </section>
                </main>
            </CardAdmin>
            <div className="flex justify-end gap-x-4">
                <Button type="reset" bg="bg-white" text="black" classes="border" font='font_futura'>&nbsp;&nbsp;&nbsp;&nbsp;Clear&nbsp;&nbsp;&nbsp;&nbsp;</Button>
                <Button type="submit">Generate Coupon</Button>
            </div>
        </form>
    </>
};