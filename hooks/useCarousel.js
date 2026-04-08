import { create } from 'zustand'
import toaster from "@/utils/toast_function";
import axios from "axios";
import useSession from "./useSession";

const useCarousel = create((set, get) => ({
    carouselLoading: false,

    getHomeCarousel: async (callback) => {
        const { admin } = useSession.getState();
        if (!admin?._id) return console.log("no admin data")

        set(() => ({ carouselLoading: true }))
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/carousels/home/get`, { withCredentials: true })
            callback(data.carousel);
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        return set(() => ({ carouselLoading: false }))
    },

    updateHomeCarousel: async (slides, callback) => {
        const { admin } = useSession.getState();
        if (!admin?._id) return console.log("no admin data")

        set(() => ({ carouselLoading: true }))
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/carousels/home/update`, { slides }, { withCredentials: true });
            toaster("success", data?.msg)
            callback(data.carousel);
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        return set(() => ({ carouselLoading: false }))
    },

    getCatalogueCarousel: async (callback) => {
        const { admin } = useSession.getState();
        if (!admin?._id) return console.log("no admin data")
        try {
            set(() => ({ carouselLoading: true }))
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/carousels/catalogue/get`, { withCredentials: true })
            callback(data.carousel);
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        } finally { return set(() => ({ carouselLoading: false })) }
    },

    updateCatalogueCarousel: async (slides, callback) => {
        const { admin } = useSession.getState();
        if (!admin?._id) return console.log("no admin data")

        set(() => ({ carouselLoading: true }))
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/carousels/catalogue/update`, { slides }, { withCredentials: true });
            toaster("success", data?.msg)
            callback(data.carousel);
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        return set(() => ({ carouselLoading: false }))
    }
}))

export default useCarousel