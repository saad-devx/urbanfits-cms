const InputTextArea = (props) => {
  return <div>
    <textarea {...props} className={`${props?.width} ${props.mt || "mt-[12px]"} ${props.className} ${props?.h || "h-[44px]"} px-[10px] py-[13.5px] ${props?.border || "border"} ${props?.rounded || "rounded-lg"} outline-none`} />
  </div>
};
export default InputTextArea;