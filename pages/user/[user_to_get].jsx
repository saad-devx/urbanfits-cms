import { useState, useEffect } from "react";
import CardAdmin from "@/components/cards/cardadmin";
import DeleteAction from "@/components/modals/deleteAction";
import Image from "next/image";
import Button from "@/components/buttons/simple_btn";
import Loader from "@/components/loaders/loader";
import Spinner from "@/components/loaders/spinner";
import { AvatarSIcon } from "@/public/icons/AvatarSIcon";
import { CartLIcon } from "@/public/sidebaricons/CartLIcon";
import { DiamondLIcon } from "@/public/icons/DiamondLIcon";
import { InputText } from "@/components/InputText";
import { InputSelect } from "@/components/InputSelect";
import countryCodes from "@/mock/countryCodes";
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useRouter } from "next/router";
import useUser from "@/hooks/useUser";
import timeAgo from "@/utils/timestamp_duration";
import uploadImage from "@/utils/uploadImage";
import axios from "axios";
import Link from "next/link";
import toaster from "@/utils/toast_function";

export default function UserProfile() {
    const { getUser, updateUser, getUserUfBalance, addPointsToUserWallet, resetUser2fa, usersLoading, deleteUsers } = useUser()
    const router = useRouter()
    const [userData, setUserData] = useState(null);
    const [history, setHistory] = useState(null)
    const [checked, setChecked] = useState(1);
    const [loading, setLoading] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const userPfp = userData?.image?.includes("googleuser") ? userData.image : process.env.NEXT_PUBLIC_BASE_IMG_URL + userData?.image

    const validatedSchema = Yup.object({
        image: Yup.object().nullable(0),
        username: Yup.string().min(5, 'Username must be at least 5 characters long').max(24, 'Username cannot exceed 24 characters').matches(/^[A-Za-z0-9_]+$/, 'Username must contain only letters, numbers, and underscores').notOneOf([' ', '-'], 'Username should not contain any spaces or hyphen symbols').required('Username is required'),
        email: Yup.string().email().required('Please enter your email address'),
        firstname: Yup.string().min(2),
        lastname: Yup.string().min(2),
        gender: Yup.string().min(2),
        role: Yup.string().oneOf(['administrator', 'customer'], 'Invalid role. 2 Available roles: administrator, customer').required("Please select a user role."),
        phone_prefix: Yup.string(),
        phone_number: Yup.string().min(6, 'Phone number can be a minimum of 6 digits').max(14, 'Phone number can be a maximum of 14 digits')
    })
    const pointsSchema = Yup.object({
        user_id: Yup.string().required(),
        card_number: Yup.string().required(),
        source: Yup.string(),
        secret_key: Yup.string(),
        points: Yup.number(),
        duducted: Yup.number(),
        expiration_date: Yup.date().nullable(),
        notific_params: Yup.object({
            category: Yup.string().required("Notification Category is required."),
            heading: Yup.string().required("Notification Heading is required."),
            type: Yup.string().required(),
            mini_msg: Yup.string(),
            message: Yup.string().required("Notification message is required."),
        })
    })
    const { values, errors, touched, handleBlur, handleChange, handleReset, handleSubmit, setFieldValue, setValues } = useFormik({
        initialValues: {
            image: userData?.image || '',
            firstname: userData?.firstname || '',
            lastname: userData?.lastname || '',
            gender: userData?.gender || '',
            role: userData?.role || 'customer',
            username: userData?.username || '',
            email: userData?.email || '',
            phone_prefix: userData?.phone_prefix || 'Select Country Code',
            phone_number: userData?.phone_number || ''
        },
        validationSchema: validatedSchema,
        onSubmit: async (values) => {
            setLoading(true)
            let imgUrl = null;
            if (values.image && values.image.name) {
                console.log(values.image)
                imgUrl = await uploadImage(values.image, `user-profiles${userData._id}`)
            } else delete values.image
            updateUser(userData._id, { ...values, ...(imgUrl && { image: imgUrl }) }, (updatedUser) => setUserData(updatedUser))
            setLoading(false)
        }
    })

    const { values: passValues, errors: passErrors, touched: passTouched, handleChange: passHandleChange, handleReset: passHandleReset, handleSubmit: passHandleSubmit } = useFormik({
        initialValues: {
            admin_password: '',
            new_password: '',
            confirm_password: ''
        },
        validationSchema: Yup.object({
            admin_password: Yup.string().min(8).max(30).required('Please enter your password'),
            new_password: Yup.string().min(8).max(30).required('Please enter your password'),
            confirm_password: Yup.string().oneOf([Yup.ref("new_password"), null], "password must match").required("Please enter your password."),
        }),
        onSubmit: async (values) => {
            setLoading(true)
            try {
                const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/user/update/password-via-admin`, {
                    ...values,
                    user_id: userData._id
                }, { withCredentials: true })
                toaster("success", data.msg)
                passHandleReset()
            } catch (error) {
                console.log(error)
                toaster('error', error.response.data.msg)
            }
            setLoading(false)
        }
    })

    const { values: ptsValues, errors: ptsErrors, touched: ptsTouched, handleChange: ptsHandleChange, setValues: setPtsValues, setFieldValue: setPtsFieldValue, handleReset: ptsHandleReset, handleSubmit: ptsHandleSubmit } = useFormik({
        initialValues: {
            user_id: userData?._id,
            card_number: userData?.uf_wallet?.card_number,
            source: "additional_reward",
            points: 0,
            duducted: 0,
            expiration_date: '',
            notific_params: {
                category: "reward",
                heading: "",
                type: "additional_reward",
                mini_msg: '',
                message: ""
            }
        },
        validationSchema: pointsSchema,
        onSubmit: async (values) => {
            await addPointsToUserWallet(values, () => getUserUfBalance(
                userData._id,
                userData.uf_wallet.card_number,
                (uf_balance) => setUserData((prevState) => ({ ...prevState, uf_balance }))
            ))
            ptsHandleReset()
        }
    })

    const notificIcons = {
        account: <AvatarSIcon />,
        order: <CartLIcon />,
        reward: <DiamondLIcon />
    }
    const handleSectionPosition = (checked) => {
        if (checked == 1) return "translate-x-0"
        if (checked == 2) return "-translate-x-[25%]"
        if (checked == 3) return "-translate-x-[50%]"
        if (checked == 4) return "-translate-x-[75%]"
    }
    const groupHistoryByYearAndMonth = (history) => {
        if (!history) return null
        const groupedHistory = {};

        history.forEach((record) => {
            const { year, month } = record;
            const key = `${year}-${month}`;

            if (!groupedHistory[key]) {
                groupedHistory[key] = {
                    year,
                    month,
                    records: [],
                };
            }
            groupedHistory[key].records.push(record);
        });

        const groupedRecords = Object.values(groupedHistory);
        return groupedRecords;
    };
    const UfPointsNames = { daily_checkin: "Daily Checkin", prize_wheel: "Prize Wheel", signup: "Sign Up", place_order: "Place Order", uf_task: "UF Task", additional_reward: "Other", deduction: "Deduction" };
    const groupedRecords = history ? groupHistoryByYearAndMonth(history) : [];

    useEffect(() => {
        if (router.query.user_to_get) (async () => {
            const fetchedUser = await getUser(router.query.user_to_get, router);
            if (!fetchedUser) return
            const { user, points_history } = fetchedUser;
            setUserData(user)
            setValues(user)
            setHistory(points_history)
            setPtsValues({ ...ptsValues, user_id: user._id, card_number: user.uf_wallet.card_number })
        })()
    }, [router.isReady])

    if (!userData) return <main className="w-full h-[80vh] flex justify-center items-center text-sm"><Spinner forBtn variant="border-black" /></main>
    else return <>
        {loading || usersLoading ? <Loader /> : null}
        <DeleteAction
            show={deleteModal}
            heading={`Delete ${userData.firstname || userData.username}'s Account`}
            msg={`This is an irreversible action, the specified user ${userData.firstname || userData.username}'s account along with there all information of orders history, UF points balance and history etc will be deleted permanently. There will be no backup available.`}
            setDeleteModal={setDeleteModal}
            onTakeAction={() => { deleteUsers([userData._id]); router.push('/user/userlist') }}
        />
        <div className="mt-[15px]">
            <p className="font_futura not-italic text-[22px]  font-medium text-black">{userData.firstname || userData.username}'s Profile</p>
            <section className="flex justify-between items-center">
                <div className="flex items-center mt-4 font_futura text-sm gap-x-3">
                    <Link href="/">Home</Link> <i className="fa-solid fa-chevron-right" />
                    <span>Users</span> <i className="fa-solid fa-chevron-right" />
                    <Link href="/user/userlist">Users List</Link> <i className="fa-solid fa-chevron-right" />
                    <span>User Profile</span>
                </div>
            </section>
        </div>

        <CardAdmin classes=" grid grid-cols-6 mt-5">
            <section className="col-span-2 border-r border-r-slate-200 p-[40px] flex flex-col">
                <div className="flex flex-col items-center">
                    <span className="w-16 aspect-square rounded-xl overflow-hidden ">
                        <Image width={2000} height={2000} className="w-full h-full object-cover object-center" alt="user avatar" src={(userPfp || process.env.NEXT_PUBLIC_DEFAULT_PFP) + "?timestamp=123"} />
                    </span>
                    <p className="text-sm mt-[20px] ">{userData.firstname || null}&nbsp;{userData.lastname || userData.username}</p>
                    <p className="text-sm">{userData.email}</p>
                    <Link className="mx-auto mt-2 px-6 py-1 border border-black rounded-2xl text-sm" href={`/user/tasks/${userData._id}`}>View User Tasks</Link>
                </div>

                <p className="text-base mt-[60px] ">Contact Information</p>
                <p className="text-sm mt-[30px] ">Email Address</p>
                <p className="text-xs mt-[5px]  ">{userData.email}</p>

                <p className="text-sm mt-[30px] ">Phone Number</p>
                <p className="text-xs mt-[5px] ">{userData.phone_prefix || null}&nbsp;{userData.phone_number || "N/A"}</p>

                <p className="text-sm mt-[30px] ">Gender</p>
                <p className="text-xs mt-[5px] ">{userData.gender || "N/A"}</p>

                <p className="text-sm mt-[30px] ">User ID</p>
                <button onClick={() => navigator.clipboard.writeText(userData._id)} className="group relative text-xs mt-[5px] text-left">
                    {userData._id.slice(0, 14)}••••••••••&nbsp;&nbsp;<i className="fa-regular fa-copy" />
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 translate-y-7 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 px-2 py-0.5 rounded-lg text-[10px] bg-gray-700 text-white transition-all duration-300">Copy</span>
                </button>
                <p className="text-sm mt-[30px] ">UF-Wallet Card number</p>
                <button onClick={() => navigator.clipboard.writeText(userData.uf_wallet.card_number)} className="group relative text-xs mt-[5px] text-left">
                    {userData.uf_wallet?.card_number?.slice(0, 12)}••••••••••&nbsp;&nbsp;<i className="fa-regular fa-copy" />
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 translate-y-7 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 px-2 py-0.5 rounded-lg text-[10px] bg-gray-700 text-white transition-all duration-300">Copy</span>
                </button>
                <div className="w-full p-4 mt-10 border border-red-600 rounded-xl">
                    <h5 className="mb-4 text-sm">User Deletion</h5>
                    <p className="mb-3 text-xs text-red-500"><span className="text-xs text-black">Note:</span> All {userData.firstname || userData.username}'s account data along with their Orders and UF balance and history will be deleted permanently.</p>
                    <button onClick={() => setDeleteModal(true)} className="w-full py-3 flex justify-center bg-red-600 text-white text-xs rounded-lg">Delete This User</button>
                </div>
            </section>
            <section className="col-span-4 p-10 !pt-0 overflow-hidden">
                <div className="w-full flex justify-between text-base ">
                    <button className={`w-20 px-4 flex flex-col justify-between items-center`} onClick={() => setChecked(1)}>
                        Profile
                        <span className={`${checked == 1 ? "w-full" : 'w-0'} h-1 mt-3 bg-gold-land transition-all duration-300`} />
                    </button>
                    <button className={`w-20 px-4 flex flex-col justify-between items-center`} onClick={() => setChecked(2)}>
                        Setting
                        <span className={`${checked == 2 ? "w-full" : 'w-0'} h-1 mt-3 bg-gold-land transition-all duration-300`} />
                    </button>
                    <button className={`w-40 px-4 flex flex-col justify-between items-center`} onClick={() => setChecked(3)}>
                        Add UF-Points
                        <span className={`${checked == 3 ? "w-full" : 'w-0'} h-1 mt-3 bg-gold-land transition-all duration-300`} />
                    </button>
                    <button className={`w-40 px-4 flex flex-col justify-between items-center`} onClick={() => setChecked(4)}>
                        Points History
                        <span className={`${checked == 4 ? "w-full" : 'w-0'} h-1 mt-3 bg-gold-land transition-all duration-300`} />
                    </button>
                </div>
                <hr className="h-px border-none bg-gray-200 translate-y-[-1px]" />

                <div className={`w-[400%] flex justify-between transition-all duration-700 ${handleSectionPosition(checked)}`}>
                    <section className={`w-1/4 ${checked !== 1 && "opacity-0"} transition-all duration-500`}>
                        <div className="mt-10 grid grid-cols-3 gap-10">
                            <CardAdmin classes="px-5 py-[25px] ">
                                <div className="flex gap-5">
                                    <div className="w-[50px] h-[50px] flex justify-center items-center bg-gold rounded-[10px]">
                                        <AvatarSIcon />
                                    </div>
                                    <div className="flex flex-col justify-between">
                                        <p className="text-[22px]">{userData?.uf_balance || "00"}</p>
                                        <p className="text-sm">UF-points</p>
                                    </div>
                                </div>
                            </CardAdmin>
                            <CardAdmin classes="px-5 py-[25px] ">
                                <div className="flex gap-5">
                                    <div className="w-[50px] h-[50px] flex justify-center items-center bg-gold rounded-[10px]">
                                        <CartLIcon />
                                    </div>
                                    <div className="flex flex-col justify-between">
                                        <p className="text-[22px]">{userData.purchases}</p>
                                        <p className="text-sm">Bought</p>
                                    </div>
                                </div>
                            </CardAdmin>
                            <CardAdmin classes="px-5 py-[25px] ">
                                <div className="flex gap-5">
                                    <div className="w-[50px] h-[50px] flex justify-center items-center bg-gold rounded-[10px]">
                                        <DiamondLIcon />
                                    </div>
                                    <div className="flex flex-col  justify-between">
                                        <p className="text-[22px]">{0}</p>
                                        <p className="text-sm">Vouchers</p>
                                    </div>
                                </div>
                            </CardAdmin>
                        </div>

                        <CardAdmin classes="p-[30px] mt-[40px]">
                            <h3 className="text-[22px]">Latest Notifications</h3>
                            <hr className="mt-10" />
                            <div className={`${checked !== 1 && "max-h-40"} flex flex-col gap-y-7 mt-10 transition-all duration-300 overflow-clip`}>
                                {!userData?.notifications ? <div className="w-full text-center h-40">No notifications to show :/</div> :
                                    userData.notifications.notifications?.map((notific, i) => (
                                        <div key={i} className="w-full flex gap-x-4 items-center">
                                            <div className="w-[50px] h-[50px] flex justify-center items-center bg-gold rounded-[10px] ">
                                                {notificIcons[notific.category]}
                                            </div>

                                            <div className="flex-1 flex flex-col">
                                                <div className="mb-2 flex justify-between">
                                                    <h3 className="text-base">{notific.heading}</h3>
                                                    <div className="text-[10px] flex items-center gap-1">
                                                        <i className="fa-regular fa-clock" /> <p>{timeAgo(notific.timestamp)}</p>
                                                    </div>
                                                </div>
                                                <p className="text-sm">{notific.message}</p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </CardAdmin>
                    </section>
                    <CardAdmin classes={`w-1/4 p-[30px] mt-10 ${checked !== 2 && "opacity-0 max-h-40"} transition-all duration-500 overflow-hidden`}>
                        <form className="space-y-5" onSubmit={handleSubmit} onReset={handleReset}>
                            <div className="w-full flex gap-5 items-center">
                                <p>User Image</p>
                                <div className={`w-4/5 relative flex`}>
                                    <span className="w-3/4 max-w-[75%] pl-[10px] truncate py-2 rounded-lg rounded-r-none border border-r-0 border-gray-300 transition outline-none">{values?.image?.name || userData.image}</span>
                                    <input type="file" id='pfp' name='image' accept="image/*" onChange={(e) => setFieldValue("image", e.target.files[0])} className="opacity-0 w-0 h-0 appearance-none" />
                                    <label htmlFor="pfp" className="w-1/4 py-2 text-sm text-white cursor-pointer rounded-r-lg flex justify-center items-center bg-gold-land">Browse</label>
                                    <p className='absolute text-red-400 bottom-[-19px] left-[10px] text-[11px]'></p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-[100px]">
                                <InputText label="First Name" placeholder="First Name" name="firstname" value={values.firstname} onChange={handleChange} onBlur={handleBlur} error={errors.firstname && touched.firstname ? (errors.firstname) : null} />
                                <InputText label="Last Name" placeholder="Last Name" name="lastname" value={values.lastname} onChange={handleChange} onBlur={handleBlur} error={errors.lastname && touched.lastname ? (errors.lastname) : null} />
                            </div>

                            <div className="grid grid-cols-2 gap-[100px]">
                                <InputSelect defaultValue="Select gender" value={values.gender} onChange={handleChange} name="gender" label="Gender" error={errors.gender && touched.gender ? errors.gender : null}>
                                    <option disabled>Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </InputSelect>
                                <InputSelect defaultValue="customer" value={values.role} onChange={handleChange} name="role" label="User Role" error={errors.role && touched.role ? errors.role : null}>
                                    <option disabled>Select role</option>
                                    <option value="administrator">Administrator</option>
                                    <option value="customer">Customer</option>
                                </InputSelect>
                            </div>

                            <div className="grid grid-cols-1">
                                <InputText label="User Name" placeholder="Last Name" name="username" value={values.username} onChange={handleChange} onBlur={handleBlur} error={errors.username && touched.username ? (errors.username) : null} />
                                <p className="mt-2 font_futura_light text-sm">Username must be unique with no spaces.</p>
                            </div>
                            <InputText label="Email" placeholder="example@domain.com" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} error={errors.email && touched.email ? errors.email : null} />
                            <div className="grid grid-cols-2 gap-[100px]  ">
                                <InputSelect defaultValue="Select country code" value={values.phone_prefix} onChange={handleChange} name="phone_prefix" label="Phone Prefix" error={errors.phone_prefix && touched.phone_prefix ? errors.phone_prefix : null}>
                                    <option disabled>Select phone prefix</option>
                                    {countryCodes.map((item) => {
                                        if (!item.code) return <option disabled>{item.name}</option>
                                        return <option value={item.code}>{item.name} {item.code}</option>
                                    })}
                                </InputSelect>
                                <InputText label="Phone Number" placeholder="Phone Number" name="phone_number" value={values.phone_number} onChange={handleChange} onBlur={handleBlur} error={errors.phone_number && touched.phone_number ? errors.phone_number : null} />
                            </div><div className="w-full flex justify-end gap-2">
                                <Button type="reset" bg="bg-gray-100" text="black" classes="w-full md:w-1/4" font='font_urbanist_medium'>Cancel</Button>
                                <Button type="submit" classes="w-full md:w-1/4" font='font_urbanist_medium'>Save</Button>
                            </div>
                        </form>

                        <div className="w-full mt-4 flex justify-between items-center font_urbanist text-sm">
                            <span className="w-2/5 h-px bg-gray-400"></span>
                            Security
                            <span className="w-2/5 h-px bg-gray-400"></span>
                        </div>
                        {userData.two_fa_activation_date ? <div className="w-full min-h-[80px] p-4 border rounded-xl">
                            <div className="w-full flex items-center">
                                Enable / Disable 2FA<label className="switch w-[45px] mx-4 md:w-11 h-6"><input type="checkbox" name='active_by_phone' checked={userData.two_fa_enabled || false} value={userData.two_fa_enabled} onChange={() => {
                                    updateUser(userData._id, { two_fa_enabled: !userData.two_fa_enabled }, (updatedUser) => setUserData(updatedUser))
                                }} /><span className="slider"></span></label>
                            </div>
                            <div className="w-full mt-7 flex items-center gap-x-4">
                                <button onClick={async () => {
                                    const newUserData = await resetUser2fa(userData._id)
                                    setUserData(newUserData)
                                }} className="px-5 py-2 border border-red-600 rounded-full">Reset User's 2FA</button>
                                <p className="flex-1 text-xs">Note: By resetting, user's 2FA key will be removed and user will have to register again to secure their account.</p>
                            </div>
                        </div> : <div className="w-full min-h-[80px] p-4 flex justify-center items-center text-sm border rounded-xl">This user haven't registered for 2FA.</div>}

                        <div className="w-full mt-4 flex justify-between items-center font_urbanist text-sm">
                            <span className="w-1/3 h-px bg-gray-400"></span>
                            Change Password
                            <span className="w-1/3 h-px bg-gray-400"></span>
                        </div>
                        {userData.register_provider === "urbanfits" ? <form className="grid grid-cols-1 gap-5" onSubmit={passHandleSubmit} onReset={passHandleReset}>
                            <InputText autoComplete='off' onChange={passHandleChange} value={passValues.admin_password} name="admin_password" label="Admin (Your) Password" placeholder="Enter your password" error={passErrors.admin_password && passTouched.admin_password ? passErrors.admin_password : null} />
                            <InputText autoComplete='off' onChange={passHandleChange} value={passValues.new_password} name="new_password" label="New User Password" placeholder="New user password" error={passErrors.new_password && passTouched.new_password ? passErrors.new_password : null} />
                            <InputText autoComplete='off' onChange={passHandleChange} value={passValues.confirm_password} name="confirm_password" label="Confirm User Password" placeholder="Confirm user password" error={passErrors.confirm_password && passTouched.confirm_password ? passErrors.confirm_password : null} />
                            <Button type="submit" font='font_urbanist_medium'>Update User Password</Button>
                        </form> : <span className="text-sm text-gray-500">This user's account is associated with Google registration provider, you cannot change the password of such users who signed up with google as they don't need password to login.</span>}
                    </CardAdmin>
                    <CardAdmin classes={`w-1/4 p-[30px] mt-10 ${checked !== 3 && "opacity-0 h-0"} transition-all duration-500 overflow-clip`}>
                        <form onSubmit={ptsHandleSubmit} className="w-full space-y-5">
                            <div className="mb-5 grid grid-cols-2 gap-5">
                                <InputSelect defaultValue="Select source" value={ptsValues.source} onChange={(e) => { ptsHandleChange(e); setPtsFieldValue("notific_params.type", e.target.value) }} name="source" label="Source of points" error={ptsErrors.source && ptsTouched.source ? ptsErrors.source : null}>
                                    <option disabled>Select points source</option>
                                    {["daily_checkin", "prize_wheel", "signup", "place_order", "additional_reward"].map((s, index) => <option key={index} value={s}>{s}</option>)}
                                </InputSelect>
                                <InputSelect defaultValue="Select Expiry date" onChange={(e) => { const expiryDate = new Date(new Date().setDate(new Date().getDate() + parseFloat(e.target.value))); setPtsFieldValue("expiration_date", expiryDate) }} name="expiration_date" label="Expiry Date" error={ptsErrors.expiration_date && ptsTouched.expiration_date ? ptsErrors.expiration_date : null}>
                                    <option disabled>Select Expiry date</option>
                                    <option key={undefined} value={null}>None</option>
                                    <option key={1} value={3}>After 3 Days</option>
                                    <option key={2} value={7}>After 7 Days</option>
                                    <option key={3} value={15}>After 15 Days</option>
                                    <option key={4} value={30}>After 30 Days</option>
                                </InputSelect>
                            </div>
                            <InputText label="Points to add" placeholder="00" name="points" value={ptsValues.points} onChange={ptsHandleChange} error={ptsErrors.points && touched.points ? (ptsErrors.points) : null} />
                            <h2 className="mt-8 text-base">Notification Configuration</h2>
                            <div className="grid grid-cols-2 gap-5">
                                <InputSelect label="Notification Category" defaultValue="Select notification category" name="notific_params.category" value={ptsValues?.notific_params?.category} onChange={ptsHandleChange} error={ptsErrors?.notific_params && ptsErrors.notific_params.category ? (ptsErrors.notific_params.category) : null} >
                                    {["account", "primary", "reward", "order"].map((category, index) => <option key={index} value={category}>{category}</option>)}
                                </InputSelect>
                                <InputText label="Notification Heading" placeholder="Notification heading" name="notific_params.heading" value={ptsValues?.notific_params?.heading} onChange={ptsHandleChange} error={ptsErrors?.notific_params && ptsErrors.notific_params.heading ? ptsErrors.notific_params.heading : null} />
                            </div>
                            <InputText label="Mini Display message (optional)" placeholder="Displayed on the notification toaster at screen corner." name="notific_params.mini_msg" value={ptsValues?.notific_params?.mini_msg} onChange={ptsHandleChange} error={ptsErrors?.notific_params && ptsErrors.notific_params.mini_msg ? (ptsErrors.notific_params.mini_msg) : null} />

                            <div className="w-full flex flex-col justify-end">
                                <h2>Detailed Message</h2>
                                <div className="relative w-full data_field flex items-center border rounded-md border-gray-300 focus:border-yellow-700 hover:border-yellow-600 transition p-2 mt-4">
                                    <textarea rows={5} className="w-full bg-transparent outline-none border-none" type="text" value={ptsValues.notific_params.message} name="notific_params.message" id="notific_params.message" maxLength={500} onChange={ptsHandleChange} placeholder="eg. Congratulations! You won 100 uf-points..." />
                                </div>
                                {ptsErrors?.notific_params?.message ? <p className="mt-0.5 text-xs text-red-400">{ptsErrors?.notific_params?.message}</p> : null}
                                {/* <small className='self-end text-gray-500 my-3' >1000 characters max</small> */}
                            </div>

                            <Button classes="w-full" type="submit">Submit</Button>
                        </form>
                    </CardAdmin>
                    <CardAdmin classes={`w-1/4 p-[30px] mt-10 ${checked !== 4 && "opacity-0 h-0"} transition-all duration-500 overflow-clip`}>
                        <h3 className="mb-4 text-[22px]">Points Transations</h3>
                        <section className="w-full gap-y-4">
                            <div className="w-full mb-4 text-sm grid grid-cols-5 place-content-center place-items-center font_urbanist_bold">
                                <span className="place-self-start">Source</span>
                                <span>Earned</span>
                                <span>Spent</span>
                                <span>Expires At</span>
                                <span>Total Balance</span>
                            </div>
                            {groupedRecords ? groupedRecords.map((recordObj, index) => <section key={index} className="group outline-none accordion-section mb-7" tabIndex={1} >
                                <nav className="group flex justify-between py-3 items-center border-b border-b-gray-300 transition ease duration-500 cursor-pointer pr-10 relative">
                                    <h2 className="group-focus:text-black text-sm font_urbanist_medium capitalize transition ease duration-500">{recordObj.month}&nbsp;{recordObj.year}</h2>
                                    <i className={`group-focus:-rotate-180 absolute top-1/2 -translate-y-1/2 right-0 mb-auto ml-auto mt-2 mr-2 transform transition ease duration-500`}>
                                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M0.718574 1.26652C0.471471 0.976974 0.475731 0.51076 0.729225 0.226124C0.852776 0.0862599 1.01361 0.0163273 1.1755 0.0163274C1.34166 0.0163274 1.50675 0.0899399 1.63136 0.238392L4.99708 4.20367L8.44587 0.231032C8.6951 -0.0536042 9.09984 -0.054831 9.35014 0.232259C9.59831 0.520576 9.59831 0.985564 9.34907 1.27388L5.44336 5.77162C5.323 5.90903 5.1611 5.98633 4.99175 5.98633L4.98749 5.98633C4.81708 5.9851 4.65305 5.90535 4.53483 5.76426L0.718574 1.26652Z" fill="#C4C4C4" />
                                        </svg>
                                    </i>
                                </nav>
                                <nav className="group-focus:max-h-[50vh] max-h-0 rounded overflow-x-hidden overflow-y-auto duration-500">
                                    {recordObj.records.map((record, i) => {
                                        const createdDate = new Date(record.createdAt);
                                        const expiryDate = record.expiration_date ? new Date(record.expiration_date) : null;
                                        const expiryText = (expiryDate) => {
                                            if (expiryDate) {
                                                if (new Date().getTime() < expiryDate.getTime()) return <span className="px-2 py-px bg-green-100 text-green-600 text-[10px] rounded-3xl">{expiryDate.getDate() + "/" + (expiryDate.getMonth() + 1) + "/" + expiryDate.getFullYear()}</span>;
                                                else return <span className="px-2 py-px rounded-3xl bg-gray-200 text-gotham-black text-[10px]">expired</span>;
                                            } else return <i className="fa-solid fa-infinity text-xs text-gotham-black" />
                                        }
                                        return <section key={i} className=" bg-white border-b border-b-gray-300 grid grid-cols-5 text-xs">
                                            <div className="w-full flex items-center">
                                                <span className="mr-8 py-4 flex flex-col text-[10px]">
                                                    <h6 className="font_copper text-xs capitalize">{UfPointsNames[record.source]}</h6>
                                                    {createdDate.getDate() + "/" + (createdDate.getMonth() + 1) + "/" + createdDate.getFullYear()}
                                                </span>
                                            </div>
                                            <span className="w-full flex justify-center items-center text-green-400">+{record.points}</span>
                                            <span className="w-full flex justify-center items-center text-red-400">-{record.spent}</span>
                                            <span className="w-full flex justify-center items-center">{expiryText(expiryDate)}</span>
                                            <span className="w-full flex justify-center items-center">{record.total_balance}</span>
                                        </section>
                                    })}
                                </nav>
                            </section>
                            ) : null}
                        </section>
                    </CardAdmin>
                </div>
            </section>
        </CardAdmin>
    </>
};