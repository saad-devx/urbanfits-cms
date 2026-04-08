import React, { useState } from "react";
import CardAdmin from "@/components/cards/cardadmin";
import Image from "next/image";
import Button from "@/components/buttons/simple_btn";
import Loader from "@/components/loaders/loader";
import { InputText } from "@/components/InputText";
import { InputSelect } from "@/components/InputSelect";
import countryCodes from "@/mock/countryCodes";
import { useRouter } from "next/router";
import { useFormik } from 'formik';
import * as Yup from 'yup'
import useUser from "@/hooks/useUser";
import uploadImage from "@/utils/uploadImage";
import axios from "axios";
import mongoose from "mongoose";
import Link from "next/link";
import toaster from "@/utils/toast_function";

export default function AddUser() {
    const { updateUser } = useUser()
    const router = useRouter()
    const [pfp, setPfp] = useState(process.env.NEXT_PUBLIC_DEFAULT_PFP);
    const [otpId, setotpId] = useState(null);
    const [otp, setOtp] = useState(null);
    const [loading, setLoading] = useState(false);
    const isOtpValid = mongoose.Types.ObjectId.isValid(otpId)

    const validatedSchema = Yup.object({
        image: Yup.object().nullable(),
        username: Yup.string().min(5, 'Username must be at least 5 characters long').max(24, 'Username cannot exceed 24 characters').matches(/^[A-Za-z0-9_]+$/, 'Username must contain only letters, numbers, and underscores').notOneOf([' ', '-'], 'Username should not contain any spaces or hyphen symbols').required('Username is required'),
        email: Yup.string().email().required('Please enter your email address'),
        firstname: Yup.string().min(2),
        lastname: Yup.string().min(2),
        gender: Yup.string().min(2),
        role: Yup.string().oneOf(['administrator', 'customer'], 'Invalid role. 2 Available roles: administrator, customer').required("Please select a user role."),
        phone_prefix: Yup.string().required('Phone prefix is required to save'),
        phone_number: Yup.string().min(6, 'Phone number can be a minimum of 6 digits').max(14, 'Phone number can be a maximum of 14 digits').required('Phone number is required to save'),
        password: Yup.string().min(8).max(30).required('Please enter your password'),
        confirm_password: Yup.string().oneOf([Yup.ref("password"), null], "Password must match").required("Please enter your password."),
    })
    const { values, errors, touched, handleBlur, handleChange, handleReset, handleSubmit, setFieldValue, setValues } = useFormik({
        initialValues: {
            image: null,
            firstname: '',
            lastname: '',
            gender: 'Select gender',
            role: 'customer',
            username: '',
            email: '',
            phone_prefix: 'Select Country Code',
            phone_number: '',
            password: '',
            confirm_password: '',
        },
        validationSchema: validatedSchema,
        onSubmit: async (values) => {
            try {
                setLoading(true)
                const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/user/signup`, { ...values, accept_policies: true, image: undefined }, { withCredentials: true })
                if (data.redirect_url && data.otp_id) {
                    console.log(data)
                    toaster("success", data.msg)
                    setotpId(data.otp_id)
                }
            }
            catch (error) {
                console.log(error)
                if (error.response) toaster("error", error.response.data.msg)
            }
            setLoading(false)
        }
    })

    const onVerifyClick = async () => {
        if (!otp || !isOtpValid) return toaster("error", "Something went wrong, please try creating user again.")
        setLoading(true)
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/user/signup/callback`, {
                otp_id: otpId,
                otp
            }, { withCredentials: true })
            if (values.image) {
                const imgUrl = await uploadImage(values.image, `user-profiles/${data.user_id}`)
                await updateUser(data.user_id, { image: imgUrl })
            }
            toaster("success", "User created successfully.")
            router.push('/user/userlist')
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        setLoading(false)
    }

    return <>
        {loading ? <Loader /> : null}
        <div className="mt-[15px] ">
            <p className="font_futura not-italic text-[22px]  font-medium text-black capitalize">Add User</p>
            <div className="flex items-center mt-4 font_futura text-sm gap-x-3">
                <Link href="/">Home</Link> <i className="fa-solid fa-chevron-right" />
                <span>Users</span> <i className="fa-solid fa-chevron-right" />
                <span>Add User</span>
            </div>
        </div>

        <CardAdmin classes={`w-full p-10 mt-10 transition-all duration-500`}>
            <form className="grid grid-cols-1 gap-5" onSubmit={handleSubmit}>
                <section className="w-full mb-10 flex items-end gap-x-5">
                    <nav className="group relative w-[15%] aspect-square rounded-full cursor-pointer border-2 border-gray-300 overflow-hidden">
                        <Image className="w-full h-full object-cover" width={200} height={200} src={pfp} alt="avatar" />
                    </nav>
                    <nav className="w-3/5 flex flex-col gap-5 items-start">
                        <p>User Image</p>
                        <div className={`w-full relative flex`}>
                            <span className="w-3/4 max-w-[75%] pl-[10px] truncate py-2 rounded-lg rounded-r-none border border-r-0 border-gray-300 transition outline-none">{values?.image?.name}</span>
                            <input type="file" id='pfp' name='image' accept="image/*" onChange={(e) => {
                                const file = e.target.files[0]
                                setFieldValue("image", file)
                                const reader = new FileReader();
                                reader.onload = (e) => setPfp(e.target.result);
                                reader.readAsDataURL(file);
                            }} className="opacity-0 w-0 h-0 appearance-none" />
                            <label htmlFor="pfp" className="w-1/4 py-2 text-sm text-white cursor-pointer rounded-r-lg flex justify-center items-center bg-gold-land">Browse</label>
                            <p className='absolute text-red-400 bottom-[-19px] left-[10px] text-[11px]'></p>
                        </div>
                    </nav>
                </section>

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
                <div className="grid grid-cols-2 gap-[100px]">
                    <InputSelect defaultValue="Select country code" value={values.phone_prefix} onChange={handleChange} name="phone_prefix" label="Phone Prefix" error={errors.phone_prefix && touched.phone_prefix ? errors.phone_prefix : null}>
                        <option disabled>Select phone prefix</option>
                        {countryCodes.map((item) => {
                            if (!item.code) return <option disabled>{item.name}</option>
                            return <option value={item.code}>{item.name} {item.code}</option>
                        })}
                    </InputSelect>
                    <InputText label="Phone Number" placeholder="Phone Number" name="phone_number" value={values.phone_number} onChange={handleChange} onBlur={handleBlur} error={errors.phone_number && touched.phone_number ? errors.phone_number : null} />
                </div>

                <div className="w-full grid grid-cols-2 gap-[100px]">
                    <InputText autoComplete='off' onChange={handleChange} value={values.password} name="password" label="User Password" placeholder="User password" error={errors.password && touched.password ? errors.password : null} />
                    <InputText autoComplete='off' onChange={handleChange} value={values.confirm_password} name="confirm_password" label="Confirm User Password" placeholder="Confirm user password" error={errors.confirm_password && touched.confirm_password ? errors.confirm_password : null} />
                </div>

                <div className={`w-full ${otpId ? "max-h-[10rem]" : "h-0"} flex justify-center items-end overflow-hidden transition-all duration-700`}>
                    <div className="w-1/2 flex flex-col">
                        <label className='font_futura text-sm flex items-center' >
                            <span>Enter OTP</span>
                        </label>
                        <input type="number" onChange={(e) => setOtp(e.target.value)} className={`animate-pulse w-full mt-3 h-11 px-[10px] py-[13.5px] border-2 border-black transition-all rounded-lg outline-none`} />
                    </div>
                    <button type="submit" className="px-5 py-3 mx-3 bg-black text-white text-sm rounded-full">Resend Email</button>
                </div>

                <div className="w-full flex justify-end gap-2">
                    <Button type="reset" bg="bg-gray-100" text="black" classes="w-full md:w-1/4">Cancel</Button>
                    {isOtpValid ? <Button onClick={onVerifyClick} type="button" classes="w-full md:w-1/4">Create User</Button> :
                        <Button type="submit" classes="w-full md:w-1/4">Continue</Button>}
                </div>
            </form>
        </CardAdmin>
    </>
};