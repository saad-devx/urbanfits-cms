const CustomModal = (props) => {
  return <div className={`w-full h-full font_futura fixed inset-0 z-40 bg-gray-800/40 backdrop-blur flex justify-center items-center transition-all duration-500   ${props.show === false ? "opacity-0 pointer-events-none" : ''}`}>
    <div className={` ${props.show === false ? "translate-y-10" : ''} relative ${props?.width}   ${props.p} ${props.py} ${props.px} text-sm flex flex-col lg:flex-row bg-white rounded-2xl md:rounded-2xl overflow-hidden transition-all duration-500`}>
      <button onClick={props.toggleModal} name="modal3" className="material-symbols-rounded text-3xl absolute right-5 top-5 cursor-pointer hover:rotate-180 transition-all duration-1000">close</button>
      {props.children}
    </div>
  </div>
}
export default CustomModal