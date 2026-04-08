export default function Infotip(props) {
    return (
        <span className={`absolute z-40 px-2 py-1 text-xs rounded-md ${props.positions || "left-1/2 -top-full"} bg-slate-600 text-white opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto hover:pointer-events-auto hover:opacity-100 transition-all`}>
            {props.children}
        </span>
    )
}