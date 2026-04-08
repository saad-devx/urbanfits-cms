import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Button from "@/components/buttons/simple_btn";
import useSession from "@/hooks/useSession";
import CustomTab from "@/components/CustomTabs/CustomTab";
import uploadImage from '@/utils/uploadImage'
import Spinner from '@/components/loaders/spinner'
import { profileTabData } from "@/mock/customtabData";
import { Badge1 } from "@/components/buttons/badges/Badge1";
import CardAdmin from "@/components/cards/cardadmin";
import Loader from "@/components/loaders/loader";
const TwoFa = dynamic(() => import('@/components/modals/twoFa'));


export default function Profile({ children }) {
    const { admin, updateAdmin } = useSession();
    const [mfaModa, setMfaModa] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imgSpinner, setImgSpinner] = useState(null);
    const [pfp, setPfp] = useState(admin?.image ? admin.image : process.env.NEXT_PUBLIC_DEFAULT_PFP);

    const toggle2FA = async () => {
        setLoading(true)
        await updateAdmin({
            two_fa_enabled: !admin.two_fa_enabled
        })
        setLoading(false)
    }

    const onFileChange = async (e) => {
        const file = e.target.files[0]
        setImgSpinner(<Spinner />)
        const imgUrl = await uploadImage(file, `user-profiles/${admin._id}`)
        setPfp(imgUrl)
        await updateAdmin({ image: imgUrl })
        setImgSpinner(null)
    }

    return <>
        {loading ? <Loader /> : null}
        {admin.two_fa_activation_date ? null : <TwoFa show={mfaModa} setMfaModa={setMfaModa} />}
        <div className={` mt-[40px] flex items-center font_futura `}>
            <div className="w-36 h-36 rounded-2xl p-1 bg-gold border border-white flex justify-center items-center overflow-hidden">
                {imgSpinner}
                <Image width={150} height={150} className="w-full h-full rounded-xl object-cover" alt="avatar" src={process.env.NEXT_PUBLIC_BASE_IMG_URL + pfp + "?timestamp=123"} />
            </div>
            <div className="ml-[30px]">
                <p className=" text-[22px] mb-0">{admin?.firstname}&nbsp;{admin?.lastname}</p>

                <div className="flex items-center mt-4 ">
                    <label htmlFor="pfp" className="px-5 py-2 rounded-full bg-gold-land cursor-pointer text-white">Change Avatar</label>
                    <input onChange={onFileChange} type="file" id='pfp' name='pfp' accept="image/*" className="opacity-0 appearance-none w-0 h-0 pointer-events-none " />
                    {/* <span className="ml-[20px]">
                        <BasketIcon />
                    </span> */}
                </div>

                <p className="text-[14px] mt-[10px] ">
                    For best results use an image at least 256px by 256px in either .jpg
                    or .png format
                </p>
            </div>
        </div>

        <div className="mt-[43px]" >
            <CustomTab tabdata={profileTabData}  >
                {children}
                <CardAdmin classes=" mt-[30px]  p-[40px] rounded-[25px]" round="rouded-[25px]">
                    <div className="font_futura">
                        <p className="text-[22px] ">Two-Factor Authentication </p>
                        <p className="text-[14px] mt-[9px] max-w-[1121px]">
                            Two-factor authentication is a method for protection your web
                            account. When it is activated you need to enter not only your
                            password, but also a special code. You can receive this code by in
                            mobile app. Even if third person will find your password, then can&apos;t
                            access with that code.
                        </p>

                        <div className="mt-8 flex justify-between items-center">
                            {admin.two_fa_activation_date ?
                                <Button loading={loading} onClick={toggle2FA} my="0" classes='w-44'>{admin.two_fa_enabled ? "Disable 2FA" : "Enable 2FA"}</Button>
                                :
                                <Button onClick={() => setMfaModa(true)} my="0" classes='w-44'>Enable 2FA</Button>}
                            <div className="flex items-center">
                                <p className="text-black text-sm">CURRENT STATUS:</p>
                                <span className="ml-[10px]" >
                                    <Badge1>{admin.two_fa_enabled ? "ENABLED" : "DISABLED"}</Badge1>
                                </span>
                            </div>
                        </div>
                    </div>
                </CardAdmin>

            </CustomTab>
        </div>
    </>
}
