import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logout from "./modals/logout";
import CardAdmin from "@/components/cards/cardadmin";
import useSession from "@/hooks/useSession";
import { useRouter } from "next/router";
import logo_outlined from "@/public/icons/logo_outlined.svg";
import { sidebarItems, SearchQueryData } from "@/mock/navData";
import { RightArrowIcon } from "@/public/sidebaricons/RightArrowIcon";
import { DownArowSmallIcon } from "@/public/sidebaricons/DownArowSmallIcon";
import NotificationTab from "./notification_tab";
import { SearchIcon } from "@/public/sidebaricons/SearchIcon";
import { LocationIcon } from "@/public/sidebaricons/LocationIcon";
import { CallIcon } from "@/public/sidebaricons/CallIcon";
import { SettingIcon } from "@/public/sidebaricons/SettingIcon";

const SideBarItem = ({ item, sidebaropen }, props) => {
    const [expand, setExpand] = useState(false)
    return <div {...props}>
        <div onClick={() => setExpand(!expand)} style={{ margin: sidebarItems.length == props.key + 1 ? "36px 0" : "36px 0 0 0" }} className="flex cursor-pointer justify-between items-center select-none" >
            <Link href={item.navlink || "#"}>
                <div className="flex gap-[10px] items-center font_futura uppercase text-black text-[12px]">
                    <span>{item.icon}</span>
                    {sidebaropen ? item.label : null}
                </div>
            </Link>
            <div className={` cursor-pointer ${item.subrows ? "visible" : "hidden"}  ${sidebaropen ? "visible" : "hidden"}`} >
                <RightArrowIcon className={`${expand ? 'rotate-90' : null} transition-all duration-300`} />
            </div>
        </div>
        {item.subrows && sidebaropen ? item.subrows.map((subitem, index) => (
            <div key={index} className={`items-center gap-2  ${expand ? "max-h-[30vh] flex mt-6 pl-6" : "max-h-0"} select-none transition-all duration-300 overflow-hidden`} >
                <Link key={index} href={subitem.navlink || '#'} className={` font_futura uppercase text-black cursor-pointer text-[12px] font-[500] font-[Futura LT Pro]  ${expand ? "visible" : "hidden"} `}>
                    {subitem.label}
                </Link>
            </div>
        )) : null}
    </div>
}

export default function SidebarLayout({ children }) {
    const router = useRouter();
    const { admin, isLoggedIn } = useSession();
    const [logoutModal, setLogoutModal] = useState(false);
    const [sidebaropen, setSidebaropen] = useState(true);
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])

    const onSearch = (e) => {
        const term = e.target.value.toLowerCase()
        setQuery(term)
        const filteredResults = SearchQueryData.filter((link) => {
            const { label, navlink } = link
            return label.toLowerCase().includes(term) || navlink.toLowerCase().includes(term)
        })
        setResults(filteredResults)
    }

    if (router.asPath.includes("/auth")) return
    else if (!isLoggedIn()) router.replace("/auth/login")
    else return <div className="flex-col bg-[#F4F4F4] overflow-x-hidden overflow-y-scroll font_futura ">
        <Logout show={logoutModal} setLogout={setLogoutModal} />
        <div className={`fixed ${sidebaropen ? "w-[250px]" : "w-[80px]"} duration-300 ${sidebaropen && "rounded-r-[25px]"} bg-white h-screen`} >
            <div className="flex-col justify-between h-full">
                <div className={`h-[12%] bg-gold ${sidebaropen && "rounded-tr-[25px]"} flex justify-center items-center`} >
                    <Image width={37.05} height={37.05} className="" alt="Urban Fits" src={logo_outlined} />
                    <p className={`font_futura text-white ${!sidebaropen && "hidden"} size text-[22px] ml-[12px] whitespace-nowrap`}>URBAN FITS</p>
                </div>

                <div className={`overflow-x-hidden overflow-y-scroll ${sidebaropen ? "h-3/5" : "h-full"} px-[30px] pb-4`} >
                    {sidebarItems.map((item, index) => <SideBarItem key={index} item={item} sidebaropen={sidebaropen} />)}
                </div>

                <div className="w-full h-[27%] pl-[30px] flex flex-col justify-center hide_scrollbar border-t border-gray-300">
                    <span className="font_futura text-[12px] font-[400] text-black ">Language: English</span>
                    <span className="font_futura text-[12px] font-[400] text-black mt-[10px]">Shipping to: United Arab Emirates</span>
                    <div className="flex items-center mt-[10px]">
                        &nbsp;<LocationIcon />
                        <span className="font_futura text-[12px] font-[400] text-black  ml-[15.88px]">Urban Fits (UAE)</span>
                    </div>
                    <div className="flex items-center mt-[10px]">
                        &nbsp;<CallIcon />
                        <span className="font_futura text-[12px] font-[400] text-black  ml-[15.88px] ">+971 52 700 1997</span>
                    </div>
                </div>
            </div>
        </div>

        <div className={`min-h-[100vh] px-[30px] py-[44px] bg-[#F4F4F4] overflow-y-scroll ${sidebaropen ? "ml-[250px]" : "ml-[80px]"}  duration-300 `} >
            <div className={`flex justify-between items-center`}>
                <div className='flex items-center'>
                    <div className="w-1/2 md:w-1/4 flex justify-between">
                        <label className="switch w-[45px] md:w-11 h-6 "><input type="checkbox" name='toggle_sidebar' defaultChecked={true} onChange={() => setSidebaropen(!sidebaropen)} /><span className="slider"></span></label>
                    </div>
                    <div className='relative w-80 h-10 bg-white flex items-center px-3 border border-gray-300 rounded-full gap-x-3 transition-all duration'>
                        <SearchIcon />
                        <input
                            autoComplete="off"
                            aria-autocomplete="none"
                            type="text"
                            name="search_box"
                            id="search"
                            value={query}
                            onChange={onSearch}
                            className="w-[139px] h-[17px] flex items-center text-[14px] font-[400] font_futuralt bg-transparent outline-none  "
                            placeholder="Search (Keyword, etc)"
                        />
                        {query !== '' ? <button onClick={() => setQuery('')} className='fa-regular fa-circle-xmark mr-2 text-sm absolute right-0 top-1/2 -translate-y-1/2' /> : null}
                    </div>
                </div>

                <div className='flex items-center'>

                    <div className="group relative px-2 py-1 bg-white border border-gray-300 rounded-full flex items-center cursor-pointer" tabIndex={3}>
                        {admin?.image ? <span className="inline-block w-9 aspect-square mr-3 border border-gray-400 rounded-full overflow-hidden">
                            <Image src={admin?.image?.includes("googleuser") ? admin.image : process.env.NEXT_PUBLIC_BASE_IMG_URL + admin?.image || process.env.NEXT_PUBLIC_DEFAULT_PFP} className="w-full h-full object-cover" alt="user avatar" width={80} height={80} />
                        </span> : null}
                        <span className="text-sm mr-2">{admin?.firstname || admin?.username}</span>
                        <DownArowSmallIcon />
                        <CardAdmin classes="w-[150px] p-5 origin-top-right scale-0 group-focus-within:scale-100 duration-300 absolute -bottom-1 translate-y-full translate-x-[-25%]" round="rounded-[15px]" >
                            <div className="flex flex-col gap-3 text-sm" >
                                <Link href="/profile/myprofile">My Profile</Link>
                                <Link href="/profile/authentication">Settings</Link>
                                <button onClick={() => setLogoutModal(true)} className="text-left">Log out</button>
                            </div>
                        </CardAdmin>
                    </div>
                    <NotificationTab />
                    <button className="group relative">
                        <SettingIcon />
                        <CardAdmin classes="absolute w-[150px] p-[20px] origin-top-right scale-0 group-focus-within:scale-100 duration-300 absolute -bottom-2 right-1 translate-y-full" round="rounded-[15px]" >
                            <div className="flex flex-col items-start gap-y-3 text-sm" >
                                <Link href='/settings/general'>General Settings</Link>
                                <Link href='/settings/accounts'>Accounts Settings</Link>
                                <Link href='/settings/inventory'>Inventory Settings</Link>
                            </div>
                        </CardAdmin>
                    </button>
                </div>
            </div>
            <hr className="mt-5" />
            {/* ////////////////////////////Children START //////////////////////////////////////////////////////// */}
            {query == '' ? children :
                <div className="w-full mt-10 p-5 flex flex-col gap-y-4">
                    {results.map((result, index) => {
                        return <Link key={index} onClick={() => setQuery('')} href={result.navlink || ''} className="group font_futura flex justify-between items-center bg-white p-3 rounded-xl hover:rounded-md shadow-lg transition-all duration-500 overflow-hidden">
                            <div className="h-full">
                                <h2 className="text-lg mb-2 group-hover:translate-y-1/2 group-hover:text-xl transition-all duration-500">{result.label}</h2>
                                <p className="text-sm group-hover:translate-y-20 transition-all duration-500">{result.navlink}</p>
                            </div>
                            <i className="fa-solid fa-chevron-right mr-10 group-hover:translate-x-3 transition-all duration-500" />
                        </Link>
                    })}
                </div>
            }
            {/* ///////////////////////////////Children END///////////////////////////////////////////////////// */}
        </div>
        <div className={`text-center text-xs mb-10 flex justify-center 
      ${sidebaropen ? "w-[120%]" : "w-[105%]"}`} >
            <p>Urban Fits L.L.C., Company Reg. Number - 2447 LLC 2023, Registered Office Address - 500 4th St NW Suite 102 PMB 1958 Albuquerque, NM 87102<br />Urban Fits L.L.C. © 2023-2024 All rights reserved.</p>
        </div>
    </div>
}