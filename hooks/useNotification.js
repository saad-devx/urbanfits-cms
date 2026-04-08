import { create } from 'zustand'
import toaster from "@/utils/toast_function";
import axios from "axios";
import useSession from "./useSession";

const useNotification = create((set, get) => ({

    adminNotifics: [],
    adminNotificLoading: false,

    getAdminNotifics: async () => {
        set(() => ({ adminNotificLoading: true }))
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/admin/notifications/get`, { withCredentials: true })
            set(() => ({ adminNotifics: data.notifications }))
        } catch (error) {
            console.log(error)
            if (error.response) toaster("error", error.response.data.msg)
            else toaster("error", "Network Error")
        } finally { set(() => ({ adminNotificLoading: false })) }
    },

    markRead: async (notifications) => {
        const { admin } = useSession.getState()
        if (!admin) return
        try {
            let updatedNotifics = structuredClone(get().adminNotifics);
            const oldNotifics = notifications.filter(n => !n.seen)
            console.log(oldNotifics)
            for (let oldNotific of oldNotifics) {
                const notificIndex = updatedNotifics.findIndex(n => n._id === oldNotific._id);
                updatedNotifics[notificIndex].seen = true;
                updatedNotifics[notificIndex].seen_by = {
                    admin_id: admin._id,
                    name: admin.username
                };
            }
            set(() => ({ adminNotifics: updatedNotifics }))

            await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/admin/notifications/mark-read`, { notifications: notifications.map(n => n._id) }, { withCredentials: true })
        } catch (error) {
            console.log(error)
            if (error.response) toaster("error", error.response.data.msg)
            else toaster("error", "Network Error")
        }
    }
}))

export default useNotification