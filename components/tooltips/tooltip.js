export default function Tooltip(props) {
    return <span className={`${props.classes} absolute z-20 left-0 top-full translate-y-[-2px] w-full pointer-events-none text-[8px] lg:text-10px text-red-500 font_urbanist`}>
        {props.content}
    </span>
}