import { create } from 'zustand';
import Link from "next/link";
import useNotification from './useNotification';
import { persist, createJSONStorage } from 'zustand/middleware'
import PusherClient from "pusher-js"
import { pusherClient } from '@/utils/pusher';
import toaster from "@/utils/toast_function";
import axios from 'axios';
import { parse } from "cookie";

const useSession = create(persist((set, get) => ({
    admin: null,
    adminLoading: false,

    isLoggedIn: () => {
        const { "is_logged_in": isLoggedIn } = parse(document.cookie);
        return isLoggedIn && isLoggedIn === "true";
    },
    setGeoSelectedByUser: (bool) => set(() => ({ geo_selected_by_user: bool })),
    setCountry: (value) => set(() => ({ country: value })),

    getMe: async () => {
        const { isLoggedIn, updateAdmin } = get();
        if (!isLoggedIn()) return;
        set(() => ({ adminLoading: true }));
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/get/me`, { withCredentials: true })
            await updateAdmin(data.user, true)
        }
        catch (error) {
            console.log(error)
            toaster("error", error.response?.data.msg || (navigator.onLine ? "Oops! somethign went wrong." : "Network Error"))
        } finally { set(() => ({ adminLoading: false })); }
    },

    signIn: async (credentials, callback, router) => {
        const { isLoggedIn, updateAdmin } = get();
        if (isLoggedIn()) return toaster("info", "You are already logged in.");
        set(() => ({ adminLoading: true }));
        try {
            const axiosData = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/auth/login`, credentials, { withCredentials: true })
            const { data } = axiosData;
            if (data.redirect_url && !data.user) router.push(data.redirect_url)
            else if (data.user) {
                await updateAdmin(data.user, true)
                router.replace("/")
                console.log("i reached here that means i redirected user to the home page")
                toaster("success", data.msg)
                if (callback) callback(data)
            }
        }
        catch (error) {
            console.log(error)
            toaster("error", error.response?.data.msg || (navigator.onLine ? "Oops! somethign went wrong." : "Network Error"))
        } finally { set(() => ({ adminLoading: false })); }
    },

    updateAdmin: async (admin, updateLocally = false) => {
        if (updateLocally) {
            try {
                if (admin.role !== "administrator") return toaster("error", "401 Admin Unauthorized. Only administrator allowed.")
                else set(() => ({ admin }))
            } catch (e) {
                console.log(e)
                toaster("error", "Error 403: Admin acces denied. Please try again.")
            }
        }
        else {
            try {
                const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/user/update`, admin, { withCredentials: true })
                if (admin.role !== "administrator") return toaster("error", "403 Forbidden. Only administrator allowed.")
                else {
                    set(() => ({ admin }))
                    toaster("success", data.msg)
                }
            } catch (error) {
                console.log(error)
                toaster("error", error.response.data.msg)
            }
        }
    },

    emitPresenceEvent: () => {
        const { admin } = get();
        const presenceInstance = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
            channelAuthorization: {
                endpoint: `${process.env.NEXT_PUBLIC_HOST}/api/pusher/auth`,
                params: {
                    user_id: admin?._id,
                    email: admin?.email
                }
            },
        });
        presenceInstance.subscribe("presence-urbanfits")
        return () => presenceInstance.unsubscribe("presence-urbanfits");
    },

    subscribeAdminChannel: () => {
        const adminChannel = pusherClient.subscribe('admin-channel')
        adminChannel.bind('new-notification', (notific_data) => {
            useNotification.setState({ adminNotifics: [notific_data, ...useNotification.getState().adminNotifics] })
            toaster(notific_data.data?.type || "info", <span>{notific_data.data.msg}{notific_data.data?.href && <Link className="underline" href={notific_data.data.href}>&nbsp;Inspect</Link>}</span>, 'bottom-left')
        })
        return () => adminChannel.unsubscribe('admin-channel');
    },

    logOut: async (router) => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/auth/logout`, {}, { withCredentials: true });
            router.replace("/auth/login");
        } catch (e) { console.log("Coouldn't log out.", e) }
        finally {
            localStorage.clear()
            sessionStorage.clear()
            set(() => ({ admin: null, adminLoading: false }))
            toaster("success", "You are signed out !")
        }
    },
    matchOtpAndUpdate: async (values) => {
        try {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/user/auth-otp-and-change-email`, values, { withCredentials: true })
            delete data.user.password
            set(() => ({ admin: data.user }))
            toaster("success", data.msg)
            window.location.href = '/auth/login'
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
    }
}),
    { name: "user-data", storage: createJSONStorage(() => sessionStorage) }
))
export default useSession