import Link from 'next/link'
import Spinner from '../loaders/spinner'
export default function LinkBtn(props) {
  return <Link disabled={props.disabled || props.loading} href={props.href || "#"} {...props} className={`${props.classes} flex justify-center items-center h-9 md:h-10 xl:h-11 ${props.font ? props.font : 'font_futura'} ${props.bg ? props.bg : "bg_btn_gold"} ${props.my ? props.my : "my-6"} py-1 md:py-2 px-5 rounded-full ${props.text ? props.text : "text-white"} text-center ${props.fontSize ? props.fontSize : 'text-sm md:text-base'} transition-all duration-300 hover:shadow-xl ${props.disabled === true ? "opacity-60 pointer-events-none" : ''}`} >
    {props.loading ? <Spinner /> : props.children}
  </Link>
}