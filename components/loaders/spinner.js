export default function Spinner(props) {
    if (props.forBtn) return <span className={`w-3 h-3 md:h-7 md:w-7 animate-spin rounded-full border-2 md:border-4 border-solid ${props.variant ? props.variant : 'border-white'} border-r-transparent`} role="status"></span>
    return <div className="absolute w-full h-full flex justify-center items-center">
        <span className={`w-3 h-3 md:h-7 md:w-7 animate-spin rounded-full border-2 md:border-4 border-solid ${props.variant ? props.variant : 'border-white'} border-r-transparent`} role="status"></span>
    </div>
}
