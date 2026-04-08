import { useState } from "react";
import jwt from 'jsonwebtoken'
import axios from "axios";
import toaster from "@/utils/toast_function";
import useSession from "./useSession";
const { admin } = useSession.getState()

export default function useAddress() {

    const getAddressFromLS = () => {
        const address = jwt.decode(localStorage.getItem('addressToken'))
        if (address && address._doc) return address._doc
        else return null
    }
    const [address, setAddress] = useState(getAddressFromLS)
    const getAddress = async () => {
        if (!admin) return
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/addresses/get?user_id=${admin._id}`)
            const { addresses } = res.data
            localStorage.setItem("addressToken", addresses)
            const { _doc } = jwt.decode(addresses)
            if (!_doc) return null
            setAddress(_doc)
            return _doc
        } catch (err) {
            console.log(err.response.data.msg)
            return null
        }
    }

    const updateAddress = async (values) => {
        try {
            let { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/user/addresses/update?user_id=${admin._id}`, values)
            if (!data.addresses) return toaster("error", "Some error occurred")
            const address = jwt.decode(data.addresses)
            setAddress(address)
            localStorage.setItem("addressToken", data.addresses)
            toaster("success", data.msg)
        }
        catch (e) {
            console.log(e)
            return toaster("error", e.response.data.msg)
        }
    }

    return { address, updateAddress, getAddress }
}