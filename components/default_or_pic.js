import Image from 'next/image'

export default function DefaultOrPic({ src, mega }) {
    const imgSrc = (() => {
        if (typeof src == "string" && (src.includes("/product-images") || src.includes("/carousel-images"))) return `${process.env.NEXT_PUBLIC_BASE_IMG_URL}${src}`;
        else if (typeof src === "object") return URL.createObjectURL(src);
        else return null
    })()

    if (imgSrc) return <Image src={imgSrc} className={mega ? "h-full object-contain" : "w-full h-full object-cover"} width={mega ? 640 : 1200} height={mega ? 1145 : 1265} alt='Product Image' />
    else return (
        <div className={`w-full bg-gray-100 h-full flex ${mega ? "flex-col items-center" : "items-end"} justify-center`} >
            <h1 className={`${mega ? null : "hidden"} font_futura text-2xl mb-3`}>Product Cover Image</h1>
            <h2 className={mega ? `text-2xl lg:text-[30px] font_futura_bold text-center` : "text-xs text-center mb-4"}>{mega ? "640 X 1145" : "1200 X 1265"}</h2>
            <p className={`${mega ? null : "hidden"} mt-4 lg:mt-7 font_furura text-center text-lg lg:text-xl`}>Drop Image here.<br /> .webp format image is highly recommended</p>
        </div>
    )
}
