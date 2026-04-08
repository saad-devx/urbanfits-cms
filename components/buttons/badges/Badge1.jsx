export const Badge1 = (props) => {
  return (
    <div className={` ${props?.bg || "bg_btn_gold_2"} font_futura  ${props.px || "px-[10px]"}  ${props.py || "py-[5px]"}   text-[white]
     ${props.text || "text-[12px]"} text-center
                     ${props.rounded || "rounded-[5px]"}   ${props?.width} ${props?.height}
    `} >
      {props.children}
    </div>
  )
}
