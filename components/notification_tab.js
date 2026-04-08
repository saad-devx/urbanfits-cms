import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BellIcon } from "@/public/sidebaricons/BellIcon";
import useNotification from '@/hooks/useNotification';
import BounceLoader from './loaders/bounceLoader';

const NotificationItem = (props) => {
    const { _id, category, seen, seen_by, data } = props.notification;
    const [description, setDescription] = useState(false)
    const statusColors = {
        "success": { bg: "#f0fdf4", border: "#86efac" },
        "info": { bg: "#eff6ff", border: "#93c5fd" },
        "error": { bg: "#fef2f2", border: "#fca5a5" }
    }
    const date = new Date(props.notification.createdAt);
    return <div key={props.id} style={{ border: `1px solid ${statusColors[data.type].border}`, background: !seen ? statusColors[data.type].bg : '' }} className="relative w-full flex flex-col items-start mb-2 px-4 py-2 rounded-lg overflow-x-hidden">
        <span style={{ background: statusColors[data.type].border }} className="absolute top-1 right-2 px-1 py-px text-white text-[8px] rounded-xl">{category}</span>
        <span className="text-xs">{data.title}</span>

        <p className="text-[10px] text-left">{data.msg} {date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()} {date.getHours() + ":" + date.getMinutes()}&nbsp;&nbsp;&nbsp;&nbsp; {data.href ? <Link href={data.href} className="underline decoration-blue-500">View</Link> : null}</p>
        <div className={`w-full ${data.description && "mt-1"} flex justify-between`}>
            {data.description ? <button onClick={() => setDescription(prev => !prev)} className="px-2 py-px self-end border border-slate-500 rounded-xl text-[10px]"><i className="fa-solid fa-chevron-down" />&nbsp;View description</button> : <i />}
            {seen_by?.admin_id ? <span className="bg-gray-400 text-white px-2 py-px self-end rounded-xl text-[10px]">Marked read by <Link href={`/user/${seen_by.admin_id}`} className="underline decoration-blue-500">@{seen_by.name}</Link></span>
                : <button onClick={() => props.markRead([{ _id, seen }])} className="px-2 py-px self-end border border-slate-500 rounded-xl text-[10px]"><i className="fa-solid fa-check" />&nbsp;Mark as read</button>}
        </div>
        {data.description ? <div onClick={() => navigator.clipboard.writeText(data.description)} title='Copy Text' style={description ? { border: `1px solid ${statusColors[data.type].border}` } : {}} className={`w-full ${description ? "max-h-[10rem] mt-2 p-2" : "max-h-0"} text-left bg-white cursor-pointer rounded-lg hover:bg-gray-100 text-[10px] transition-all overflow-y-auto scrollbar_x`}>{data.description}</div> : null}

    </div>
}

export default function NotificationTab() {
    const { adminNotifics, getAdminNotifics, markRead, adminNotificLoading } = useNotification()
    const [tab, setTab] = useState(1)
    const unseenNotifics = adminNotifics.find(notific => !notific.seen)

    useEffect(() => {
        getAdminNotifics()
    }, [])


    return <div className="group relative ml-5" tabIndex={1}>
        {unseenNotifics && <i className='absolute -top-1 right-2.5 w-2.5 aspect-square bg-gold-land rounded-2xl' />}
        <BellIcon />
        <section className={`absolute z-50 top-10 right-5 bg-white equillibrium_shadow w-[400px] aspect-square p-6 rounded-2xl origin-top-right scale-0 cursor-auto group-focus-within:scale-100 duration-500`} >
            <h4 className="mb-3 text-base">Notifications</h4>
            {adminNotificLoading && <div className="w-full flex justify-center"><BounceLoader /></div>}
            <div className="w-full flex gap-[62px] text-[10px]">
                <button key={1} className={`w-1/2 px-4 flex flex-col justify-between items-center ${tab == 2 && "text-gray-400"}`} onClick={() => setTab(1)}>
                    ALERTS
                    <span className={`${tab == 1 ? "w-full" : 'w-0'} h-0.5 mt-1 bg-gold-land transition-all duration-300`} />
                </button>
                <button key={2} className={`w-1/2 px-4 flex flex-col justify-between items-center ${tab == 1 && "text-gray-400"}`} onClick={() => setTab(2)}>
                    NOTES
                    <span className={`${tab == 2 ? "w-full" : 'w-0'} h-0.5 mt-1 bg-gold-land transition-all duration-300`} />
                </button>
            </div >
            {tab == 1 &&
                <aside className="w-full h-full py-2 px-1 border rounded-lg overflow-auto">
                    <div className="w-full mb-2 flex justify-end gap-x-2">
                        {unseenNotifics && <button onClick={() => markRead(adminNotifics.map(notific => ({ _id: notific._id, seen: notific.seen })))} className="px-2 py-px self-end border border-slate-500 rounded-xl text-[10px]"><i className="fa-solid fa-check" />&nbsp;Mark All as read</button>}
                        <button onClick={getAdminNotifics} className="px-2 py-px self-end border border-slate-500 rounded-xl text-[10px]"><i className="fa-solid fa-rotate-right" />&nbsp;Refresh</button>
                    </div>
                    {adminNotifics.length ? adminNotifics.map((notification, index) => <NotificationItem id={index} notification={notification} markRead={markRead} />) : <div className='w-full py-20 flex justify-center items-center'>No Notifications :/</div>}
                </aside>
            }
            {
                tab == 2 &&
                <aside className="w-full h-full p-2 border rounded-lg overflow-auto">
                    <div className='w-full py-20 flex justify-center items-center'>Coming Soon</div>
                </aside>
            }
        </section >
    </div >
}
