import { create } from 'zustand'
import toaster from "@/utils/toast_function";
import axios from "axios";
import useSession from "./useSession";
const { admin } = useSession.getState()

const useCoupon = create((set, get) => ({

    couponLoading: false,
    selectedCoupons: [],
    setSelectedCoupons: (newArray) => set(() => ({ selectedCoupons: newArray })),

    getCoupons: async (callback) => {
        if (!admin) return
        set(() => ({ couponLoading: true }))
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/coupon/get/many`, { withCredentials: true })
            callback(data.coupons)
            set(() => ({ couponLoading: false }))
            return data.coupons
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        return set(() => ({ couponLoading: false }))
    },

    getOneCoupon: async (coupon_id, callback) => {
        set(() => ({ couponLoading: true }))
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/coupon/get/one?id=${coupon_id}`, { withCredentials: true })
            set(() => ({ couponLoading: false }))
            if (callback) callback(data.product)
            return data.product
        } catch (error) {
            console.log(error)
            toaster("error", error?.response?.data?.msg)
        }
        return set(() => ({ couponLoading: false }))
    },

    createCoupon: async (couponToCreate, callback) => {
        if (!admin) return

        set(() => ({ couponLoading: true }))
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/coupon/create`, couponToCreate, { withCredentials: true })
            if (callback) callback(data)
            toaster("success", data.msg)
            set(() => ({ couponLoading: false }))
            return data
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        return set(() => ({ couponLoading: false }))
    },

    deleteCoupon: async (coupon_id, callback) => {
        set(() => ({ couponLoading: true }))
        try {
            const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_HOST}/api/coupon/delete?coupon_id=${coupon_id}`, { withCredentials: true })
            set(() => ({ couponLoading: false }))
            toaster("success", data.msg)
            get().getCoupons()
            return callback ? callback() : null
        } catch (error) {
            console.log(error)
            set(() => ({ couponLoading: false }))
            toaster("error", error?.response?.data?.msg)
        }
    }
}))

export default useCoupon