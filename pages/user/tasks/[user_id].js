import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";
import LinkBtn from '@/components/buttons/link_btn';
import Image from "next/image";
import useUser from '@/hooks/useUser';
import Spinner from '@/components/loaders/spinner';

const TaskItem = ({ task, userId, setUserTasks }) => {
    const { approveTask } = useUser()
    const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const status = {
        bg: task.completed ? "#22c55e" : (task.image_submitted && !task.completed ? "#f97316" : "#94a3b8"),
        text: task.completed ? "completed" : (task.image_submitted && !task.completed ? "need approval" : "pending")
    }
    return <div key={task.name} style={{ opacity: task.completed ? 0.6 : 1, pointerEvents: loading ? "none" : "auto" }} className='w-full px-4 py-2 border rounded-lg flex flex-col'>
        <div className="mb-2 flex justify-between">
            <h3 className="text-base font-semibold">{task.title.en}</h3>
            <span style={{ background: status.bg }} className="px-3 py-0.5 rounded-xl text-xs leading-normal text-white">{status.text}</span>
        </div>
        <p className="text-sm">{task.description.en}</p>
        <div className="flex justify-between text-sm">
            <span className="font-semibold">Reward:</span>
            {task.reward || "System Generated"}
        </div>
        {task.image_submitted && !task.completed ? <div className="relative mt-2 flex justify-between text-sm">
            <div className={`fixed z-50 inset-0 bg-black/50 ${!image && "opacity-0 pointer-events-none"} w-full h-full py-6 flex justify-center items-center transition-all duration-500`}>
                <button onClick={() => setImage(false)} className="absolute top-5 right-8 text-white text-3xl fa-solid fa-xmark"></button>
                <div className={`w-3/5 ${!image && "scale-0"} transition-all duration-500`}>
                    <Image width={680} height={750} className='w-full object-contain rounded-xl' src={process.env.NEXT_PUBLIC_BASE_IMG_URL + task.image} alt={task.name} />
                </div>
            </div>
            <button onClick={() => setImage(true)} className="px-3 py-1 border rounded-3xl text-slate-700"><i className="fa-solid fa-play" />&nbsp; View Image</button>
            <button type='button' onClick={() => {
                setLoading(true);
                approveTask({ task_name: task.name, user_id: userId }, (data) => {
                    setLoading(true);
                    setUserTasks(data.tasks)
                })
            }} className={`bg-gold-land px-3 py-1 text-white rounded-3xl ${loading ? "animate-pulse" : ''}`}>
                {loading ? "Approving..." : <><i className="fa-solid fa-user-check" /> &nbsp; Approve</>}
            </button>
        </div> : null}
    </div>
}

export default function UserUfTasks() {
    const router = useRouter();
    const { getUserTasks } = useUser();
    const [userTasks, setUserTasks] = useState(null)

    useEffect(() => {
        const { user_id } = router.query;
        console.log("the user id: ", user_id);
        if (router.query && user_id?.length > 18) {
            getUserTasks(user_id, router, (tasksDocs) => setUserTasks(tasksDocs))
        }
    }, [router.query])

    if (!userTasks) return <main className="w-full h-[80vh] flex justify-center items-center text-sm"><Spinner forBtn variant="border-black" /></main>
    else return <>
        <div className="w-full mt-[15px] flex justify-between items-center">
            <nav>
                <p className="font_futura not-italic text-[22px]  font-medium text-black">{userTasks?.user_id?.firstname || userTasks?.user_id?.username}'s Tasks</p>
                <section className="flex justify-between items-center">
                    <div className="flex items-center mt-4 font_futura text-sm gap-x-3">
                        <Link href="/">Home</Link> <i className="fa-solid fa-chevron-right" />
                        <span>Users</span> <i className="fa-solid fa-chevron-right" />
                        <Link href="/user/tasks">Users Tasks</Link> <i className="fa-solid fa-chevron-right" />
                        <span>{userTasks.user_id.firstname || userTasks.user_id.username}'s Tasks</span>
                    </div>
                </section>
            </nav>
            <LinkBtn href={`/user/${userTasks.user_id._id}`}>View {userTasks.user_id.username}'s Profile</LinkBtn>
        </div>

        <section className="bg-white equillibrium_shadow mt-5 px-5 py-8 rounded-3xl grid grid-cols-2 gap-6">
            {userTasks.tasks.map(task => <TaskItem task={task} userId={userTasks.user_id._id} setUserTasks={setUserTasks} />)}
        </section>
    </>
}