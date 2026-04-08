import { create } from 'zustand'
import toaster from "@/utils/toast_function";
import axios from "axios";
import useSession from "./useSession";
const { admin } = useSession.getState()

const useOrder = create((set, get) => ({

    orders: [],
    orderInfo: null,
    orderLoading: false,
    totalOrders: 0,
    selectedOrders: [],
    setSelectedOrders: (newArray) => set(() => ({ selectedOrders: newArray })),
    setOrderInfo: (info) => set(() => ({ orderInfo: info })),

    getOrders: async (page = 1, statusQuery = null, limit = 50) => {
        set(() => ({ orderLoading: true }))
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/orders/get-many?page=${page}&limit=${limit}${statusQuery ? `&status=${statusQuery}` : ''}`, { withCredentials: true })
            set(() => ({
                orders: data.orders,
                totalOrders: data.totalOrders || data.orders?.length,
                orderLoading: false
            }))
            console.log(data)
            return data.orders
        } catch (error) {
            console.log(error)
            if (error.response) toaster("error", error.response.data.msg)
        }
        return set(() => ({ orderLoading: false }))
    },

    getOneOrder: async (order_id, callback) => {
        set(() => ({ orderLoading: true }))
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/orders/get-one?order_id=${order_id}`, { withCredentials: true })
            set(() => ({ orderLoading: false }))
            if (callback) callback(data.order);
            return data.order
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        return set(() => ({ orderLoading: false }))
    },

    changeOrderStatus: async (order_id, order_status, callback) => {
        set(() => ({ orderLoading: true }))
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/orders/change-status?order_id=${order_id}&order_status=${order_status}`, { withCredentials: true })
            set(() => ({ orderLoading: false }))
            if (callback) callback(data.order);
            return data.order
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        return set(() => ({ orderLoading: false }))
    },

    createOrder: async (orderToCreate) => {
        if (!admin) return

        set(() => ({ orderLoading: true }))
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/orders/create`, orderToCreate, { withCredentials: true })
            set(() => ({ orderLoading: false }))
            return data.order
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        return set(() => ({ orderLoading: false }))
    },

    updateOrder: async (id, updatedorder) => {
        if (!admin) return
        set(() => ({ orderLoading: true }))
        try {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/orders/update?id=${id}`, updatedorder, { withCredentials: true })
            set(() => ({
                orderLoading: false,
                orderInfo: data.order
            }))
            toaster("success", data.msg)
            return data.order
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        return set(() => ({ orderLoading: false }))
    },

    deleteOrders: async (orderIds) => {
        if (!admin) return

        set(() => ({ orderLoading: true }))
        try {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/user/orders/delete`, { orders: orderIds }, { withCredentials: true })
            await get().getOrders(1)
            toaster(data.deletedCount < 1 ? "info" : "success", data.msg)
        } catch (error) {
            console.log(error)
            if (error.response && error.response.data) toaster("error", error.response.data.msg)
        }
        return set(() => ({ orderLoading: false }))
    }

}))

export default useOrder