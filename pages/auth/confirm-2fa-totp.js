import { useState } from 'react'
import AuthPage from '.'
import Button from '@/components/buttons/simple_btn'
import Head from 'next/head'
import useSession from '@/hooks/useSession'
import toaster from '@/utils/toast_function'
import AlertPage from '@/components/alertPage'
import axios from 'axios'
import { useRouter } from 'next/router'
import Error404 from '../404'

export default function Login() {
    const { isLoggedIn, adminLoading } = useSession()
    const router = useRouter()
    const [totp, setTotp] = useState('')

    const onVerifyClick = async (user_id) => {
        if (!isLoggedIn()) return toaster("info", "You are already singned in")
        if (!user_id || user_id.length < 18) return toaster("error", "Something went wrong, please try login again.")
        useSession.setState({ adminLoading: true });
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/2fa/verify-totp?user_id=${user_id}&totp_code=${totp}`)
            await updateUser(data.payload, true)
            useSession.setState({ guestUser: null });
            router.replace('/')
            toaster("success", data.msg)
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        } finally { useSession.setState({ adminLoading: false }) }
    }

    if (!router.query.user_id || router.query.user_id.length < 18) return <Error404 />
    if (isLoggedIn()) return <AlertPage type="success" heading="You are already signed in !" />
    else return <>
        <Head><title>Urban Fits - Confirm 2FA TOTP code</title></Head>
        <AuthPage loading={adminLoading} mblNav="/auth/signup" mblNavName="Register">
            <main className="w-full h-full lg:h-auto bg-white p-2 lg:p-0 font_futura text-base flex flex-col justify-between md:justify-around lg:block" >
                <section className="w-full mb-6 md:mb-0">
                    <h1 className="lg:hidden text-[22px] mb-5 text-left font_futura">Confirm 2FA code</h1>
                    <div className="relative data_field lex items-center border-b focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                        <input className="w-full outline-none border-none" type='number' name="totp" id="totp" value={totp} onChange={(e) => setTotp(e.target.value)} placeholder='Enter TOTP code' />
                    </div>
                    <div className="my-3 text-gray-400 text-xs md:text-sm text-left">
                        Please open your Google Authenticator app in mobile and enter the Urban Fits - 2FA key code.
                    </div>
                </section>
                <Button disabled={!totp || totp.length < 5 || totp.length > 10} onClick={() => onVerifyClick(router.query.user_id)} loading={adminLoading} my="my-4" classes='w-full'>Verify</Button>
            </main>
        </AuthPage>
    </>
}