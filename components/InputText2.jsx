const InputText2 = (props) => {
  return (
    <input style={{marginTop:props.mt}}
      className={`  ${props?.width}    ${
        props.className
      } h-[44px] px-[0px] py-[13.5px]
       border-b-[1px]
   outline-none `}
      placeholder={` ${props.placeholder || "placeholder"} `}
      type="text"
    />
  );
};

export default InputText2;
