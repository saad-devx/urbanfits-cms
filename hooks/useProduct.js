import { create } from 'zustand'
import toaster from "@/utils/toast_function";
import axios from "axios";
import useSession from "./useSession";
const { admin } = useSession.getState()

const useProduct = create((set, get) => ({

    products: [],
    productInfo: null,
    productLoading: false,
    totalProducts: 0,
    selectedProducts: [],
    setSelectedProducts: (newArray) => set(() => ({ selectedProducts: newArray })),
    setProductInfo: (info) => set(() => ({ productInfo: info })),

    getProducts: async (page = 1, category_id = null) => {
        set(() => ({ productLoading: true }))
        try {
            if (category_id) {
                console.log(page, category_id)
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/products/get/bycategory?id=${category_id}&page=${page}`, { withCredentials: true })
                set(() => ({
                    products: data.products,
                    totalProducts: data.totalProducts,
                    productLoading: false
                }))
                return data.products
            }
            else {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/products/get/many?page=${page}`, { withCredentials: true })
                set(() => ({
                    products: data.products,
                    totalProducts: data.totalProducts,
                    productLoading: false
                }))
                return data.products
            }
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        return set(() => ({ productLoading: false }))
    },

    getOneProduct: async (product_id, callback) => {
        set(() => ({ productLoading: true }))
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/products/get/one?id=${product_id}`, { withCredentials: true })
            set(() => ({ productLoading: false }))
            if (callback) callback(data.product)
            return data.product
        } catch (error) {
            console.log(error)
            toaster("error", error?.response?.data?.msg)
        }
        return set(() => ({ productLoading: false }))
    },

    createProduct: async (productToCreate) => {
        if (!admin) return

        set(() => ({
            productLoading: true
        }))
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/products/create`, productToCreate, { withCredentials: true })
            set(() => ({ productLoading: false }))
            return data.product
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        return set(() => ({ productLoading: false }))
    },

    updateProduct: async (id, updatedProduct) => {
        if (!admin) return

        set(() => ({ productLoading: true }))
        try {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/products/update?id=${id}`, updatedProduct, { withCredentials: true })
            set(() => ({
                productLoading: false,
                productInfo: data.product
            }))
            toaster("success", data.msg)
            return data.product
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        return set(() => ({ productLoading: false }))
    },

    deleteProducts: async (productsToDelete) => {
        if (!admin) return

        set(() => ({ productLoading: true }))
        try {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/products/delete`, { products: productsToDelete }, { withCredentials: true })
            await get().getProducts(1)
            toaster(data.deletedCount < 1 ? "info" : "success", data.msg)
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        return set(() => ({ productLoading: false }))
    }
}))

export default useProduct