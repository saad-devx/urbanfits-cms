import Link from 'next/link'
export const Button2 = (props) => <Link href={`${props.href ? props.href : ''}`} id={props.children} name={props.name ? props.name : ''} onClick={props.onClick ? props.onClick : null} type={props.type ? props.type : ''}
  className={`${props.classes} ${props?.width} flex justify-center items-center h-9 md:h-11 ${props.font ? props.font : 'font_futura'} ${props.bg ? props.bg : "bg_btn_gold_2"}  py-1 md:py-2 px-5 rounded-full ${props.text ? props.text : "text-white"} text-center ${props.fontSize ? props.fontSize : 'text-sm '} transition-all duration-300 hover:shadow-xl ${props.disabled === true ? "opacity-60 pointer-events-none" : ''}`} >
  {props.children}
</Link>
