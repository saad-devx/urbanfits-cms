import { useState } from 'react'

export default function MenuButton(props) {
    const [menu, setMenu] = useState(false)
    const toggleMenu = () => setMenu(!menu)

    return <div className='w-10 relative font_futura '>
        <button onClick={toggleMenu} className="w-6 fa-solid fa-ellipsis-vertical"></button>
        <div className={`absolute z-[999] -left-1/2 -bottom-full translate-y-[90%] flex flex-col items-start p-2 shadow-md gap-y-2 ${menu ? null : "opacity-0 pointer-events-none"} border rounded-md font_futura bg-white transition-all`} >
            {props.options?.map((option, i) => {
                return <button key={i} onClick={() => { option.onClick(); toggleMenu() }} name={option.name} className="group flex flex-col justify-between items-center cursor-pointer text-[10px]">{option.name}<i className='h-px w-0 group-hover:w-full bg-black transition-all' /></button>
            })}
        </div>
    </div>
}
