export const InputText = (props) => {
    return <div className={`${props.classes} relative flex flex-col`} >
        <label className='font_futura text-sm flex items-center' >
            <span>{props?.label}</span>
            <span className={`font_futura_light text-[12px] leading-[17px] text-[${props.postlabelcolor || "#E4E4E4"}] ml-[5px] `} >{props?.postlabel}</span>
        </label>
        <input {...props} className={`${props?.width || "w-full"} ${props.mt || "mt-3"} ${props.className} ${props?.h || "h-11"} px-[10px] py-[13.5px] ${props?.border || "border border-gray-300 focus:border-yellow-700 hover:border-yellow-600 transition"} ${props?.rounded || "rounded-lg"} outline-none `} />
        <p className='absolute text-red-400 bottom-[-19px] left-[10px] text-[11px]' >{props?.error} </p>
    </div>
}