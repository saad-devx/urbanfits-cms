export const InputSelect = (props) => {
  return (
    <div className={`${props.classes} flex flex-col`} >

      <label className='font_futura text-sm flex items-center'>
        <span> {props?.label} </span>
        <span className={`font_futura_light text-xs leading-[17px] text-[${props.postlabelcolor || "#E4E4E4"}]  ml-[5px] `} > {props?.postlabel} </span>
      </label>

      <select {...props} className={`${props.width || "w-full"} ${props.label ? "mt-3" : "mt-0"} ${props.height || "h-11"} px-2 border border-gray-300 focus:border-yellow-700 hover:border-yellow-600 transition ${props.rounded || "rounded-lg"} outline-none ${props.bg || "bg-transparent"}`}>
        {props.children}
      </select>

    </div>
  )
}
