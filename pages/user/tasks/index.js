import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Link from "next/link";
import CardAdmin from "@/components/cards/cardadmin";
import Spinner from "@/components/loaders/spinner";
import { SearchIcon } from "@/public/sidebaricons/SearchIcon";
import useUser from "@/hooks/useUser";
import LinkBtn from "@/components/buttons/link_btn";
import { userTasksTableColumns } from "@/mock/tablesdata";

const Userlist = () => {
    const { getAllUsersTasks, usersLoading } = useUser()
    const [query, setQuery] = useState('')
    const [tasks, setTasks] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    // const [actionsTip, setActionsTip] = useState(false)

    useEffect(() => {
        getAllUsersTasks(currentPage, (data) => setTasks(data.tasks))
    }, [])

    const filteredTasks = tasks.filter((doc) => {
        if (query !== '') {
            const { _id, firstname, email } = doc.user_id;
            return (firstname && firstname.toLowerCase().includes(query.toLowerCase())) || _id.includes(query) || email.toLowerCase().includes(query.toLowerCase())
        }
        else if (doc.user_id?._id) return true
    });

    return <>
        <div className="flex mt-[15px] justify-between items-center ">
            <div>
                <h2 className="font_futura text-[22px]">User Tasks</h2>
                <div className="flex items-center mt-4 font_futura text-sm gap-x-3">
                    <Link href="/admin">Home</Link> <i className="fa-solid fa-chevron-right" />
                    <span >Users</span> <i className="fa-solid fa-chevron-right" />
                    <span>Tasks List</span>
                </div>
            </div>
            <LinkBtn href="/user/add-user" my="0">Add User</LinkBtn>
        </div>

        <CardAdmin classes="px-10 py-[42px] mt-5 ">
            <div className="flex justify-between">
                <div className="w-full flex items-center justify-between">
                    <section className="flex items-center gap-4">
                        <div className='flex flex-col'>
                            <select name="category" className="w-48 h-10 px-3 border rounded-full outline-none bg-gray-50 text-black cursor-pointer" placeholder="Category">
                                {/* {[{ _id: false, path: "All Products" }, ...categories]?.map((category) => ({ value: category._id, name: category.path }))
                                .map((obj, index) => ( */}
                                <option key={1}>All users</option>
                                {/* ))} */}
                            </select>
                        </div>
                        <div className='w-64 h-10 py-2 px-5 gap-2 flex items-center bg-gray-50 border border-gray-300 rounded-full' >
                            <SearchIcon />
                            <input
                                type="text"
                                id="search"
                                value={query}
                                onChange={(e) => { setQuery(e.target.value) }}
                                className="w-full h-4 flex items-center text-sm font_futuralt bg-transparent outline-none"
                                placeholder="Search (ID or Name)..."
                            />
                        </div>
                    </section>
                    <button title="Refresh Data" disabled={usersLoading} onClick={() => getAllUsersTasks(currentPage, (data) => setTasks(data.tasks))} className={`fa-solid fa-rotate-right text-base ${usersLoading ? "fa-spin" : null}`}></button>
                </div>
            </div>
            <DataTable
                className='scrollbar_x'
                responsive={true}
                customStyles={{
                    tableWrapper: {
                        style: {
                            width: "100%",
                            display: 'block',
                            overflowY: 'visible',
                            paddingBottom: "6rem"
                        }
                    },
                    head: { style: { fontSize: '13px' } },
                    rows: { style: { minHeight: "60px" } }
                }}
                pagination
                paginationServer
                paginationDefaultPage={1}
                // paginationTotalRows={totalUsers}
                paginationPerPage={50}
                paginationRowsPerPageOptions={[50]}
                onChangePage={(page) => { getAllUsersTasks(page, (data) => setTasks(data.tasks)); setCurrentPage(page) }}
                progressPending={usersLoading}
                progressComponent={<Spinner forBtn={true} variant="border-black" />}
                highlightOnHover
                sortIcon={<span>&uarr;&darr;</span>}
                columns={userTasksTableColumns}
                data={filteredTasks?.map(taskDoc => {
                    const user = taskDoc.user_id;
                    if (!user?._id) return
                    console.log("Here is the user: ", user)
                    return {
                        ...user,
                        tasks: taskDoc.tasks,
                        id: user?._id,
                        avatar: user?.image ? (user.image?.includes("googleuser") ? user.image : process.env.NEXT_PUBLIC_BASE_IMG_URL + user.image) : process.env.NEXT_PUBLIC_DEFAULT_PFP,
                        name: user?.firstname || user.username,
                        handleInfo: () => { },
                        infoLink: `/user/tasks/${user._id}`,
                        actions: [
                            {
                                name: "View Tasks",
                                link: `/user/tasks/${user._id}`,
                                onClick: () => { }
                            },
                            {
                                name: "View User",
                                link: `/user/${user._id}`,
                                onClick: () => { }
                            },
                            {
                                name: "Copy User ID",
                                onClick: () => navigator.clipboard.writeText(user._id)
                            },
                            {
                                name: "Copy Email",
                                onClick: () => navigator.clipboard.writeText(user.email)
                            }
                        ]
                    }
                })}
            />
        </CardAdmin >
    </>
};

export default Userlist;