import { useState } from "react";
import { InputText } from "./InputText";
import Spinner from "./loaders/spinner";
import Image from "next/image";

export const CouponProductItem = ({ nameExtension, values, errors, index, handleBlur, handleRemoveArrayItem, getCorrspondingProduct, productLoading }) => {
    const [foundProduct, setFoundProduct] = useState(null)

    return <div key={index} className="w-full px-6 py-4 mb-2 flex items-center border rounded-md shadow-lg">
        <InputText
            classes="w-1/2 mb-3"
            label={<>{index + 1}{index > 0 && <button type="button" className="fa-solid fa-xmark mx-4" onClick={() => handleRemoveArrayItem(index, `coupon_config.${nameExtension}`)} />}</>}
            placeholder="Search for a Product"
            name={`coupon_config.${nameExtension}[${index}]`}
            value={eval(`values.coupon_config.${nameExtension}[index]`)}
            onChange={(e) => getCorrspondingProduct(e, setFoundProduct)}
            onBlur={handleBlur}
            error={eval(`errors?.coupon_config?.${nameExtension}`) && eval(`errors?.coupon_config?.${nameExtension}[index]`) ? eval(`errors?.coupon_config?.${nameExtension}`) : null}
        />
        <nav className="w-1/2 flex flex-col justify-center items-center transition-all duration-300">
            {productLoading ? <div className="relative w-1/4 aspect-square flex justify-center"><Spinner variant="border-black" /></div> :
                foundProduct ? <>
                    <div className="w-1/4 aspect-square overflow-hidden">
                        <Image width={260} height={290} src={process.env.NEXT_PUBLIC_BASE_IMG_URL + foundProduct.cover_image} alt="product image" className="w-full h-full rounded-lg md:rounded-xl object-cover object-top" />
                    </div>
                    <h3 className="font_futura my-2 text-sm">{foundProduct.name.en}</h3>
                    <p>Price: {foundProduct.price}د.إ</p>
                    {foundProduct.sale_price ? <p>Sale Price: {foundProduct.sale_price}د.إ</p> : null}
                </> : <p>No Product found</p>}
        </nav>
    </div>
}

export const CouponCategoryItem = ({ nameExtension, values, errors, index, handleBlur, handleRemoveArrayItem, getCorrspondingCategory, loading }) => {
    const [foundCategory, setFoundCategory] = useState(null)

    return <div key={index} className="w-full px-6 py-4 mb-2 flex items-center border rounded-md shadow-lg">
        <InputText
            classes="w-1/2 mb-3"
            label={<>{index + 1}{index > 0 && <button type="button" className="fa-solid fa-xmark mx-4" onClick={() => handleRemoveArrayItem(index, `coupon_config.${nameExtension}`)} />}</>}
            placeholder="Search for a Category"
            name={`coupon_config.${nameExtension}[${index}]`}
            value={eval(`values.coupon_config.${nameExtension}[index]`)}
            onChange={(e) => getCorrspondingCategory(e, setFoundCategory)}
            onBlur={handleBlur}
            error={eval(`errors?.coupon_config?.${nameExtension}`) && eval(`errors?.coupon_config?.${nameExtension}[index]`) ? eval(`errors?.coupon_config?.${nameExtension}`) : null}
        />
        <nav className="w-1/2 flex flex-col justify-center items-center transition-all duration-300">
            {loading ? <div className="relative w-1/4 aspect-square flex justify-center"><Spinner variant="border-black" /></div> :
                foundCategory ? <>
                    <h3 className="font_futura my-2">Name: {foundCategory.name}</h3>
                    <span className="text-sm">Path: {foundCategory.path}</span>
                </> : <p>No Category found</p>}
        </nav>
    </div>
}