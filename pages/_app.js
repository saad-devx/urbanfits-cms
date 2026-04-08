import '@/styles/globals.css'
import { useEffect, useState } from 'react';
import SidebarLayout from '@/components/sidebar-layout';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import useSession from '@/hooks/useSession';
import LoadingBar from 'react-top-loading-bar'
import { ToastContainer } from 'react-toastify'
import { initBeamsClient } from "@/utils/pusher";

function App({ Component, pageProps }) {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const { admin, getMe, emitPresenceEvent, subscribeAdminChannel, isLoggedIn } = useSession();

  useEffect(() => {
    getMe();
  }, [])

  useEffect(() => {
    let unSubPresence = null;
    let unSubAdminChannel = null;
    if (isLoggedIn() && admin) {
      initBeamsClient()
      unSubPresence = emitPresenceEvent();
      unSubAdminChannel = subscribeAdminChannel();

    } else if (!isLoggedIn()) router.replace("/auth/login")

    return () => {
      if (unSubPresence) unSubPresence();
      if (unSubAdminChannel) unSubAdminChannel();
    }
  }, [admin])

  useEffect(() => {
    router.events.on("routeChangeStart", () => setProgress(77))
    router.events.on("routeChangeComplete", () => setProgress(100))
  }, [router.events])

  // return <main className="bg-slate-950 w-full h-screen text-white text-2xl flex justify-center items-center">Website Crashed Due To No Payment</main>

  return <>
    <LoadingBar color='linear-gradient(90deg, #FAE892 0%, #B3903E 70%)' height={4} waitingTime={0} loaderSpeed={200} shadow={true} progress={progress} onLoaderFinished={() => setProgress(0)} />
    <ToastContainer className="toast" />
    {router.pathname.includes("/auth") || router.pathname.includes("/40") ? <Component {...pageProps} /> :
      <SidebarLayout>
        <Component {...pageProps} />
      </SidebarLayout>}
  </>
}
export default dynamic(() => Promise.resolve(App), { ssr: false })