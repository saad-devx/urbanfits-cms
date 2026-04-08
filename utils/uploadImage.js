// import axios from "axios"
// import { compress } from "image-conversion"

// export default async function uploadImage(file, fileKey, quality = 75) {
//     try {
//         const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/S3/signed-url?file_key=${fileKey}.webp`, { withCredentials: true })
//         const compressedImageBlob = quality > 99 ? file : await compress(file, { quality: quality / 100, type: "image/webp" });

//         await axios.put(data.uploadUrl, compressedImageBlob, {
//             headers: {
//                 "Content-Type": "image/webp"
//             }
//         })

//         return '/' + fileKey + '.webp'
//     } catch (error) {
//         console.log(error);
//     }
// }






import { compress } from "image-conversion"

export default async function uploadImage(file, fileKey, quality = 75) {
    try {

        // get signed url
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_HOST}/api/S3/signed-url?file_key=${fileKey}.webp`,
            { credentials: "include" }
        );

        const data = await res.json();

        const compressedImageBlob =
            quality > 99
                ? file
                : await compress(file, {
                    quality: quality / 100,
                    type: "image/webp"
                });

        // upload to B2
        await fetch(data.uploadUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "image/webp"
            },
            body: compressedImageBlob
        });

        return "/" + fileKey + ".webp";

    } catch (error) {
        console.log(error);
    }
}