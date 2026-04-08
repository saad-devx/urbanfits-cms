import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Link from "next/link";
import CardAdmin from "@/components/cards/cardadmin";
import Spinner from "@/components/loaders/spinner";
import Button from "@/components/buttons/simple_btn";
import DeleteAction from "@/components/modals/deleteAction";
import { SearchIcon } from "@/public/sidebaricons/SearchIcon";
import useUser from "@/hooks/useUser";
import { userListTableColumns } from "@/mock/tablesdata";
import { CSVLink } from "react-csv";
import toaster from "@/utils/toast_function";
import LinkBtn from "@/components/buttons/link_btn";

const Userlist = () => {
    const { users, getUsers, selectedUsers, setSelectedUsers, totalUsers, totalOnline, deleteUsers, usersLoading } = useUser()
    const [query, setQuery] = useState('')
    const [selectable, setSelectable] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [actionsTip, setActionsTip] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false);

    const CsvHeaders = [
        { label: 'Username', key: 'username' },
        { label: 'Name', key: 'fullname' },
        { label: 'Email', key: 'email' },
        { label: 'Phone no.', key: 'phone' },
        { label: 'Gender', key: 'gender' },
        { label: 'Role', key: 'role' },
        { label: '2FA Status', key: 'two_fa_enabled' },
        { label: 'Date Joined', key: 'createdAt' }
    ];

    useEffect(() => {
        if (!users.length) getUsers()
    }, [])

    const filteredUsers = users.filter((user) => {
        if (query !== '') {
            const { _id, firstname, email } = user
            return (firstname && firstname.toLowerCase().includes(query.toLowerCase())) || _id.includes(query) || email.toLowerCase().includes(query.toLowerCase())
        }
        else return true
    });

    return <>
        <DeleteAction
            show={deleteModal}
            heading="Delete Selected Accounts"
            msg={`This is an irreversible action, the selected users' accounts along with their all information of orders history, UF points balance and history etc will be deleted permanently. There will be no backup available.`}
            setDeleteModal={setDeleteModal}
            onTakeAction={async () => { await deleteUsers(selectedUsers.map(user => user.id)); await getUsers(currentPage); }}
        />
        <div className="flex mt-[15px] justify-between items-center ">
            <div>
                <h2 className="font_futura text-[22px]">User List</h2>
                <div className="flex items-center mt-4 font_futura text-sm gap-x-3">
                    <Link href="/admin">Home</Link> <i className="fa-solid fa-chevron-right" />
                    <span >Users</span> <i className="fa-solid fa-chevron-right" />
                    <span>Product List</span>
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
                        <div className="h-10 p-[0.8px] text-sm bg-gold-land flex justify-center items-center rounded-full">
                            <span className="w-full h-full px-5 flex justify-center items-center text-xs bg-white rounded-full">
                                Total Online:&nbsp;{totalOnline}
                            </span>
                        </div>
                        <span className={`${selectable ? "right-8" : "-right-full"} fixed z-40 bottom-10 px-20 py-3 rounded-full bg-black/40 backdrop-blur-[2px] flex items-center text-base text-white transition-all duration-700`}>Selected: {selectedUsers?.length}</span>
                    </section>
                    <section className="flex items-center gap-4">
                        <div className="relative z-40 h-10 p-px text-sm bg-gold-land flex justify-center items-center rounded-lg">
                            <button onClick={() => setActionsTip(!actionsTip)} className="w-full h-full px-5 flex justify-center items-center text-xs bg-white rounded-[7px]">
                                Actions&nbsp;&nbsp;
                                <svg className={actionsTip && "rotate-180"} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M0.718574 1.26652C0.471471 0.976974 0.475731 0.51076 0.729225 0.226124C0.852776 0.0862599 1.01361 0.0163273 1.1755 0.0163274C1.34166 0.0163274 1.50675 0.0899399 1.63136 0.238392L4.99708 4.20367L8.44587 0.231032C8.6951 -0.0536042 9.09984 -0.054831 9.35014 0.232259C9.59831 0.520576 9.59831 0.985564 9.34907 1.27388L5.44336 5.77162C5.323 5.90903 5.1611 5.98633 4.99175 5.98633L4.98749 5.98633C4.81708 5.9851 4.65305 5.90535 4.53483 5.76426L0.718574 1.26652Z" fill="#C4C4C4" />
                                </svg>
                            </button>
                            <span className={`${actionsTip ? null : "opacity-0"} absolute left-1/2 -translate-x-1/2 top-[120%] min-w-full group-hover:max-h-52 px-3 bg-white equillibrium_shadow rounded-lg transition-all duration-500 overflow-hidden`}>
                                <button onClick={() => setActionsTip(!actionsTip)} className={`${!selectedUsers.length && "pointer-events-none opacity-60"} w-full py-2 text-xs text-left border-b border-transparent hover:border-black whitespace-nowrap transition-all`}>
                                    <CSVLink className={!selectedUsers.length && "pointer-events-none opacity-60"} data={selectedUsers} headers={CsvHeaders} filename="urbanfits-users_data.csv">
                                        Export Selected in CSV
                                    </CSVLink>
                                </button>
                                <button onClick={() => { setDeleteModal(true); setActionsTip(!actionsTip) }} className={`${!selectedUsers.length && "pointer-events-none opacity-60"} w-full py-2 mb-1 hover:border-b hover:border-black text-xs text-left transition-all`}>Delete Users</button>
                            </span>
                        </div>
                        <Button my="my-0" fontSize="text-sm"
                            onClick={() => {
                                setSelectable(!selectable)
                                setSelectedUsers([])
                            }}
                            classes={selectable ? "shadow-lg shadow-[#c3992c]" : null}
                        >Select Users</Button>
                        <button title="Refresh Data" disabled={usersLoading} onClick={() => getUsers(currentPage)} className={`fa-solid fa-arrows-rotate text-sm ${usersLoading ? "fa-spin" : null}`}></button>
                    </section>
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
                paginationTotalRows={totalUsers}
                paginationPerPage={50}
                paginationRowsPerPageOptions={[50]}
                selectableRows={selectable}
                clearSelectedRows={selectable}
                onSelectedRowsChange={(state) => setSelectedUsers(state.selectedRows)}
                onChangePage={(page) => { getUsers(page); setCurrentPage(page) }}
                progressPending={usersLoading}
                progressComponent={<Spinner forBtn={true} variant="border-black" />}
                highlightOnHover
                sortIcon={<span>&uarr;&darr;</span>}
                columns={userListTableColumns}
                data={filteredUsers?.map(user => {
                    return {
                        ...user,
                        id: user._id,
                        avatar: user.image.includes("googleuser") ? user.image : process.env.NEXT_PUBLIC_BASE_IMG_URL + user.image,
                        name: user.firstname || user.username,
                        fullname: user.firstname && user.lastname ? user.firstname + ' ' + user.lastname : user.username,
                        phone: user.phone_prefix ? user.phone_prefix + ' ' + user.phone_number : 'N/A',
                        purchases: user.purchases || 0,
                        status: user.is_active,
                        joined_at: user.createdAt,
                        handleInfo: () => { },
                        infoLink: `/user/${user._id}`,
                        actions: [
                            {
                                name: "View Profile",
                                link: `/user/${user._id}`,
                                onClick: () => { }
                            },
                            {
                                name: "View Tasks",
                                link: `/user/tasks/${user._id}`,
                                onClick: () => { }
                            },
                            {
                                name: "Copy User ID",
                                onClick: () => navigator.clipboard.writeText(user._id)
                            },
                            {
                                name: "Copy Email",
                                onClick: () => navigator.clipboard.writeText(user.email)
                            },
                            {
                                name: "Copy Phone",
                                onClick: () => {
                                    if (!user.phone_prefix) return toaster("info", "This user did not provide a phone number.")
                                    navigator.clipboard.writeText(user.phone_prefix + ' ' + user.phone_number)
                                }
                            },
                        ]
                    }
                })}
            />
        </CardAdmin >
    </>
};

export default Userlist;