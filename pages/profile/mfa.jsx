import { useState } from "react";
import Profile from ".";
import CardAdmin from "@/components/cards/cardadmin";
import Loader from "@/components/loaders/loader";
import { LockIcon } from "@/public/icons/LockIcon";
import { Badge1 } from "@/components/buttons/badges/Badge1";
import { CodeIcon } from "@/public/icons/CodeIcon";
import { InputText } from "@/components/InputText";
// import InputText2 from "@/components/InputText2";
import { Button2 } from "@/components/buttons/Button2";
import useSession from "@/hooks/useSession";
import CustomModal from "@/components/modals/CustomModal";
import dynamic from "next/dynamic";
const TwoFa = dynamic(() => import('@/components/modals/twoFa'));
import Image from "next/image";
import QrCode from "@/public/QrCode.png";

export default function Authentication() {
    const { admin, updateAdmin } = useSession()
    const [mfaModal, setMfaModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [sms, setSms] = useState(false);
    const [authmodal, setAuthmodal] = useState(false);

    const toggle2FA = async () => {
        setLoading(true)
        await updateAdmin({ two_fa_enabled: !admin.two_fa_enabled })
        setLoading(false)
    }

    const togglenable = () => {
        setSms(!sms);
    };

    return (
        <Profile>
            {loading ? <Loader /> : null}
            {admin.two_fa_activation_date ? null : <TwoFa show={mfaModal} setMfaModa={setMfaModal} />}
            <div className="grid grid-cols-2 items gap-[20px] ">
                <CardAdmin classes="px-[30px] py-[40px] ">
                    <div className=" flex items-center gap-[10px] text-[22px]  ">
                        <LockIcon /> <p> Two-factor authentication </p>
                    </div>
                    <p className="text-sm  ">
                        Two-factor Authentication adds an extra layer of security to your
                        account by asking for a verification code when you sign in
                    </p>

                    <div className="flex gap-[20px]">
                        <div className="w-full border-[#E2CA75] border-[1px] rounded-[10px] p-[10px] relative">
                            <h2 className="text-sm">Google Authenticator</h2>
                            <span className="absolute top-2 right-0  ">
                                <Badge1
                                    width="w-[74px]"
                                    px="px-[5px]"
                                    py="py-[3px]"
                                    text="text-[10px]"
                                    rounded="rounded-[0px]">
                                    Recommended
                                </Badge1>
                            </span>

                            <p className="text-[12px] font-light mt-[10px] mb-[60px] ">
                                Use an app to generate time-sensitive authentication codes on
                                your phone
                            </p>

                            <div className="w-[100%] h-[40px] p-[10px] bg-[#F4F4F4] absolute bottom-0 left-[0px] rounded-b-[10px] ">
                                <label className="switch w-[40px] h-[22.25px]  ">
                                    <input
                                        type="checkbox"
                                        checked={admin.two_fa_enabled || false}
                                        value={admin.two_fa_enabled || false}
                                        onChange={() => {
                                            if (!admin.two_fa_activation_date) return setMfaModal(true)
                                            else return toggle2FA()
                                        }}
                                    />

                                    <span className="slider"></span>
                                </label>
                            </div>
                        </div>


                        <CustomModal px="px-[50px]" py="py-[40px]" width="w-[686.4px]" show={authmodal} toggleModal={() => setAuthmodal(!authmodal)}>
                            <div className="grid grid-cols-1 gap-[20px] ">
                                <p className="text-[22px]">Enable 2FA Authentication</p>
                                <p className="text-[14px] font-[400]  ">
                                    Step 1: install this app from
                                    <span className="gradient_txt_2"> Google Play </span>or
                                    <span className="gradient_txt_2"> App Store </span>
                                </p>

                                <p className="text-[14px] font-[400] ">
                                    Step 2: Scan the QR Code by your Google Authenticator app,
                                    or you can add account manually.
                                </p>

                                <div className="flex items-center gap-[17px] " >
                                    <Image width="150px" height="150px" alt="qr code" src={QrCode} />

                                    <div className="grid grid-cols-1 gap-[15px]" >
                                        <p className="text-[14px] font-[500] " >Enter Google Authenticator Code</p>
                                        <InputText mt="mt-[0px]" placeholder="Enter the code to verify" width="w-[409.4px]" />
                                        <Button2 width="w-[170px]" >
                                            Confirm 2FA
                                        </Button2>
                                    </div>

                                </div>
                            </div>
                        </CustomModal>


                        {/*  second box */}
                        {/* <div className="w-[210px] border-[#F4F4F4] border-[1px] rounded-[10px] p-[10px] relative  ">
                            <p className="w-[80px] text-[14px] font-medium ">
                                Text message (SMS)
                            </p>

                            <p className="text-[12px] font-light mt-[10px] mb-[60px] ">
                                Receive time-sensitive authentication codes messaged to your
                                phone
                            </p>

                            <div className="w-[100%] h-[40px] p-[10px] bg-[#F4F4F4] absolute bottom-0 left-[0px] rounded-b-[5px] ">
                                <label className="switch w-[40px] h-[22.25px]  ">
                                    <input
                                        type="checkbox"
                                        checked={sms}
                                        onChange={togglenable}
                                    />

                                    <span className="slider"></span>
                                </label>
                            </div>
                        </div> */}
                    </div>
                </CardAdmin>
                {/* {!sms ? (<div></div>
                ) : (
                    <CardAdmin classes="px-[30px] py-[40px] ">
                        <div className=" flex items-center gap-[10px] text-[22px]  ">
                            <LockIcon /> <p> Enable Text message (SMS) </p>
                        </div>
                        <p className="text-[14px]  ">
                            Enter phone number for receiving confirmation code
                        </p>

                        <InputText2
                            width="w-[350px]"
                            placeholder="Phone number *"
                            mt="35px"
                        />

                        <div className="flex items-center">
                            <span>
                                <Button2 width="w-[100px]">Proceed</Button2>
                            </span>
                            <p
                                className="text-[12px] font-[500] ml-[37.5px] cursor-pointer "
                                onClick={togglenable}
                            >
                                Cancel
                            </p>
                        </div>
                    </CardAdmin>
                )} */}
                <CardAdmin classes="p-[40px] h-[280px]   ">
                    <div className="text-[22px] font-[400] flex items-center gap-[10px] ">
                        <CodeIcon /> <p>Anti Phishing</p>
                    </div>

                    <p className=" text-[14px] font-[300] ">
                        This is an identification code that users set to prevent damage
                        caused by phishing emails by manually setting an anti-phishing code
                        to distinguish official emails from phishing emails
                    </p>

                    <p
                        className={`px-[14px] py-[10px] text-[12px] w-[100px]   border-[#E2CA75] border-[1px] 
          ${!sms ? "rounded-[5px]" : "rounded-[25px]"}   `}
                    >
                        Create Code
                    </p>
                </CardAdmin>
            </div >
        </Profile >
    );
};