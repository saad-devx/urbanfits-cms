
import CryptoJS from "crypto-js";

export const EncrytOrDecryptData = (data, encrypt = true) => {
    if (typeof data !== "string") throw new Error("Encryption error: The data must be of type string.")
    if (encrypt) return CryptoJS.AES.encrypt(data, process.env.NEXT_PUBLIC_SECRET_KEY).toString()
    else {
        const bytes = CryptoJS.AES.decrypt(data, process.env.NEXT_PUBLIC_SECRET_KEY)
        return bytes.toString(CryptoJS.enc.Utf8)
    }
}
export const HashValue = (value) => {
    const hashed = CryptoJS.SHA256(value).toString(CryptoJS.enc.Hex)
    return hashed
}