const CardAdmin = (props) => <div className={`${props.classes} ${props.round ? props.round : "rounded-[25px]"} bg-white card_boxshadow flex flex-col transition-all duration-300 space-y-8`}>
  {props.children}
</div>
export default CardAdmin