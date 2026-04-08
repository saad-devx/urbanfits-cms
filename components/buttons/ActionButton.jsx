import { DownArowSmallIcon } from "@/public/sidebaricons/DownArowSmallIcon";
import { useState } from "react";
import Link from "next/link";

export default function ActionButton(props) {
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => setMenu(prev => !prev);

  return <div className="relative w-20 h-9 p-px bg-gold flex justify-center items-center rounded-full" >
    <Link onClick={props.handleInfo} href={props.infoLink} className="w-3/5 h-full mr-px bg-white rounded-l-full flex justify-center items-center text-sm">
      info
    </Link>
    <button onClick={toggleMenu} className="w-2/5 h-full bg-white rounded-r-full flex items-center justify-center" >
      <DownArowSmallIcon color="black" />
    </button>
    <div className={`${!menu && "scale-0"} z-50 absolute top-10 right-1 max-h-[134px] flex flex-col bg-white shadow-lg rounded-lg border text-xs whitespace-nowrap origin-top-right transition-all duration-300 overflow-y-auto mini_scrollbar`} >
      {props.options?.map((option, i) => {
        if (option.link) return <Link key={i} onClick={() => { option.onClick(); toggleMenu() }} name={option.name} href={option.link} className="group p-2 hover:bg-gray-200 border-b">
          {option.name}
        </Link>
        return <button key={i} onClick={() => { option.onClick(); toggleMenu() }} name={option.name} className="group p-2 hover:bg-gray-100 border-b text-left cursor-pointer">
          {option.name}
        </button>
      })}
    </div>
  </div>
};