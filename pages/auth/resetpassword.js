import { useState } from 'react'
import AuthPage from '.'
import Link from 'next/link'
import Button from '@/components/buttons/simple_btn'
import Tooltip from '@/components/tooltips/tooltip'
import toaster from '@/utils/toast_function'
import useSession from '@/hooks/useSession'
import axios from 'axios'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'

export default function ForgotPassword() {
    const router = useRouter()
    const { admin, adminLoading } = useSession()
    const [otp, setOtp] = useState('')
    const [otpId, setOtpId] = useState(null)
    const [resendOption, setResendOption] = useState(
        <div className="mt-4 text-gray-400 text-xs md:text-sm text-left">
            Please enter your username or email address. You will receive an email with an OTP code, submit it here to reset password.
        </div>)

    const { values, errors, touched, handleBlur, handleChange, handleReset, handleSubmit } = useFormik({
        initialValues: { email: '', password: '', new_password: '' },
        validationSchema: Yup.object({
            email: Yup.mixed().test('valid', 'Invalid email or username', function (value) {
                const { path, createError } = this;
                if (Yup.string().required('Email or Username is required').email().isValidSync(value)) return true;
                if (Yup.string().required('Email or Username is required').min(5, 'Username must be atleast 5 characters').matches(/^[a-zA-Z0-9_]+$/, 'Invalid username').isValidSync(value)) return true;
                return createError({ path, message: 'Invalid Email or Username' });
            }),
            password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
            new_password: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Please confirm your password'),
        }),
        onSubmit: async (values) => {
            try {
                useSession.setState({ userLoading: true });
                const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/auth/otp/forgot-password`, values, { withCredentials: true })
                if (data.success && data.otp_id) {
                    setOtpId(data.otp_id)
                    setResendOption(<span className='w-full flex justify-between items-center text-xs md:text-sm text-gray-400'> Didn't get the email? <button type='submit' className="border-b border-b-yellow-700">Resend Code</button></span>)
                    toaster("success", data.msg)
                }
                else if (data) toaster("error", res.response.msg)
            }
            catch (error) {
                console.log(error)
                toaster("error", error.response?.data?.msg || "Network Error")
            } finally { useSession.setState({ userLoading: false }); }
        }
    })

    const onVerify = async () => {
        if (!otpId) return;
        useSession.setState({ userLoading: true });
        try {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/auth/otp/change-password`, {
                otp_id: otpId,
                otp
            })
            if (data.success) {
                router.replace('/auth/login')
                toaster("success", data.msg)
            }
            else toaster("error", "Something went wrong, please try again later.")
        } catch (error) {
            console.log(error)
            toaster("error", error.response?.data?.msg || "Network Error")
        } finally { useSession.setState({ userLoading: false }); }
    }

    return <>
        <AuthPage loading={adminLoading} mblNav="/auth/login" mblNavName="Sign in" >
            <form className="w-full h-full lg:h-auto bg-white p-2 lg:p-0 font_futura text-base flex flex-col justify-between md:justify-around items-center lg:justify-center" onReset={handleReset} onSubmit={handleSubmit} >
                <section className="w-full mb-6 md:mb-0">
                    <h1 className="lg:hidden text-[22px] mb-5 text-left font_futura">Forgot Password</h1>
                    <div className={`relative data_field flex items-center border-b ${touched.email && errors.email ? "border-red-500" : "focus:border-yellow-700 hover:border-yellow-600"} transition py-2 mb-4`}>
                        {touched.email && errors.email ? <Tooltip classes="form-error" content={errors.email} /> : null}
                        <input className="w-full outline-none border-none" name="email" id="email" value={values.email} onBlur={handleBlur} onChange={handleChange} placeholder='Username or Email' />
                        <button type='submit' className="font_futura_medium px-3 py-2 bg-gray-100 rounded-full text-sm whitespace-nowrap hover:text-white hover:bg-black transition-all">{otpId ? "Resend Code" : "Send Code"}</button>
                    </div>
                    <div className={`relative data_field flex items-center border-b ${touched.password && errors.password ? "border-red-500" : "focus:border-yellow-700 hover:border-yellow-600"} transition py-2 mb-4`}>
                        {touched.password && errors.password ? <Tooltip classes="form-error" content={errors.password} /> : null}
                        <input className={`w-full outline-none border-none ${values.password ? 'tracking-2' : null}`} type="password" id="password" value={values.password} onBlur={handleBlur} onChange={handleChange} placeholder='Password' />
                    </div>
                    <div className={`relative data_field flex items-center border-b ${touched.new_password && errors.new_password ? "border-red-500" : "focus:border-yellow-700 hover:border-yellow-600"} transition py-2 mb-4`}>
                        {touched.new_password && errors.new_password ? <Tooltip classes="form-error" content={errors.new_password} /> : null}
                        <input className={`w-full outline-none border-none ${values.new_password ? 'tracking-2' : null}`} type="password" id="new_password" value={values.new_password} onBlur={handleBlur} onChange={handleChange} placeholder='Confirm password' />
                    </div>
                    {otpId ? <div className="relative data_field lex items-center border-b focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                        <input className="w-full outline-none border-none" type='number' name="otp" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder='Enter OTP code' />
                    </div> : null}
                    {resendOption}
                </section>
                <section className='w-full mb-4 lg:m-0'>
                    <Button disabled={!otp || !otpId || otp.length < 5} onClick={onVerify} classes='w-full' type="button">Verfiy</Button>
                    <Link href='/auth/login' className='hidden lg:block underline text-xs md:text-sm'><h1 className='w-full text-center' >Sign in</h1></Link>
                </section>
            </form>
        </AuthPage>
    </>
}
