import { create } from 'zustand'
import toaster from "@/utils/toast_function";
import axios from 'axios';
import useSession from "./useSession";
const { admin } = useSession.getState()

const useUser = create((set, get) => ({
    users: [],
    totalUsers: 0,
    totalOnline: 0,
    usersLoading: false,
    selectedUsers: [],
    setSelectedUsers: (newArray) => set(() => ({ selectedUsers: newArray })),

    getUsers: async (page = 1) => {
        if (!admin) return
        set(() => ({ usersLoading: true }))
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/get/many?page=${page}`, { withCredentials: true })
            set(() => ({
                users: data.users,
                totalUsers: data.totalUsers,
            }))
            await get().getTotalOnlineUsers()
        } catch (error) {
            console.log(error)
            if (error.response) toaster("error", error.response.data.msg)
        }
        set(() => ({ usersLoading: false }))
    },

    getUser: async (user_id, router) => {
        if (!admin || !user_id) return
        set(() => ({ usersLoading: true }))
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/get/byid?user_to_get=${user_id}`, { withCredentials: true })
            return data
        } catch (error) {
            console.log(error)
            router.replace("/404")
            if (error.response) toaster("error", error.response?.data?.msg || "Network Error")
        } finally { set(() => ({ usersLoading: false })) }
    },

    getAllUsersTasks: async (page = 1, callback) => {
        if (!admin) return
        set(() => ({ usersLoading: true }))
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/tasks/get/all?page=${page}`, { withCredentials: true })
            if (callback) callback(data)
        } catch (error) {
            console.log(error)
            if (error.response) toaster("error", error.response?.data?.msg || "Network Error")
        } finally { set(() => ({ usersLoading: false })) }
    },

    getUserTasks: async (user_id, router, callback) => {
        if (!admin || !user_id) return
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/tasks/get/user-tasks-via-admin?user_id=${user_id}`, { withCredentials: true })
            if (callback) callback(data.tasks)
        } catch (error) {
            console.log(error)
            router.replace("/404")
            if (error.response) toaster("error", error.response?.data?.msg || "Network Error")
        }
    },

    approveTask: async (taskData, callback) => {
        if (!admin) return
        set(() => ({ usersLoading: true }))
        try {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/tasks/approve?`, taskData, { withCredentials: true })
            if (callback) callback(data)
            toaster("success", data.msg)
        } catch (error) {
            console.log(error)
            if (error.response) toaster("error", error.response.data.msg)
            toaster("error", "Network Error")
        }
        set(() => ({ usersLoading: false }))
    },

    getTotalOnlineUsers: async () => {
        if (!admin) return
        set(() => ({ usersLoading: true }))
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/get/online-users`, { withCredentials: true })
            set(() => ({ totalOnline: data.online_users }))
        } catch (error) { console.log(error) }
        set(() => ({ usersLoading: false }))
    },

    getUserUfBalance: async (user_id, card_number, callback) => {
        set(() => ({ usersLoading: true }))
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/uf-wallet/get-balance?user_id=${user_id}&card_number=${card_number}`, { withCredentials: true })
            set(() => ({ usersLoading: false }))
            callback(data.balance)
            return data.balance
        } catch (e) { console.log(e) }
        set(() => ({ usersLoading: false }))
    },

    addPointsToUserWallet: async (pointsData, callback) => {
        set(() => ({ usersLoading: true }))
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/user/uf-wallet/add-points`, pointsData, { withCredentials: true })
            set(() => ({ usersLoading: false }))
            callback(data)
            toaster("success", data.msg)
        } catch (e) {
            console.log(e)
            toaster("error", e?.response?.data?.msg || "Oops! Something went wrong. Please try again.")
        }
        set(() => ({ usersLoading: false }))
    },

    getUserNotifications: async (user_id) => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/notifications/get?user_id=${user_id}`, { withCredentials: true })
            return data.notification_data.notifications
        } catch (error) {
            console.log(error)
            if (error.response) toaster("error", "Error fetching notifications.")
        }
    },

    updateUser: async (user_id, valuesObj, callback) => {
        if (!admin) return
        set(() => ({ usersLoading: true }))
        try {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/user/update/via-admin?user_id=${user_id}`, valuesObj, { withCredentials: true })
            toaster("success", data.msg)
            set(() => ({ usersLoading: false }))
            if (callback) callback(data.user)
        } catch (error) {
            console.log(error)
            if (error.response) toaster("error", error.response.data.msg)
        } finally { set(() => ({ usersLoading: false })) }
    },

    resetUser2fa: async (user_id) => {
        if (!admin) return
        set(() => ({ usersLoading: true }))
        try {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/2fa/reset-user-2fa?user_id=${user_id}`, {}, { withCredentials: true })
            toaster("success", data.msg)
            set(() => ({ usersLoading: false }))
            return data.user
        } catch (error) {
            console.log(error)
            if (error.response) toaster("error", error.response.data.msg)
        }
        set(() => ({ usersLoading: false }))
    },

    deleteUsers: async (usersToDelete) => {
        if (!admin) return

        set(() => ({ usersLoading: true }))
        try {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/user/delete/via-admin`, { users: usersToDelete }, { withCredentials: true })
            toaster("success", data.msg)
        } catch (error) {
            console.log(error)
            if (error.response) toaster("error", error.response.data.msg)
        }
        return set(() => ({ usersLoading: false }))
    }
}))
export default useUser