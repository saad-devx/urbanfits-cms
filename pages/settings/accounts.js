import Button from '@/components/buttons/simple_btn'
import CardAdmin from '@/components/cards/cardadmin'
import { RightArrowIcon } from '@/public/sidebaricons/RightArrowIcon'


const accountsetting = () => {
    return <>
        <div className='font_futura' >
            <p className='not-italic text-[22px] mt-[15px] font-medium text-black'>Account Setting</p>
        </div>
        <div className=' flex items-center mt-[15px] '>
            <li className='  not-italic text-[14px] text-center font-medium text-black list-none'>Home </li>
            <li className=' ml-[12px] not-italic text-[14px] text-center font-medium text-black list-none'> <RightArrowIcon /> </li>
            <li className=' ml-[12px] not-italic text-[14px] text-center font-medium text-black list-none'>Account</li>
            <li className=' ml-[12px] not-italic text-[14px] text-center font-medium text-black list-none'> <RightArrowIcon /> </li>
            <li className=' ml-[12px] not-italic text-[14px] text-center font-medium text-black list-none'>Account & Privacy</li>
        </div>
        <CardAdmin classes="p-[40px] font_futura mt-[20px]" round="rounded-[25px]" >

            <p className='not-italic text-[16px] font-semibold text-black'> Guest Checkout</p>
            <div className='flex flex-col' style={{ marginTop: "15px" }} >
                <div className='  flex   '>
                    <input id="default-checkbox" type="checkbox" />
                    <label className=' ml-[15px] not-italic text-[14px] text-center font-medium text-black' for="default-checkbox">Allow customers to place an order without an account.</label>
                </div>
                <div className='mt-[20px] flex   '>
                    <input id="default-checkbox" type="checkbox" />
                    <label className=' ml-[15px] not-italic text-[14px] text-center font-medium text-black' for="default-checkbox">Allow customers to login into an existing account during checkout.</label>
                </div>
            </div>
            <p className='not-italic mt-[40px]  text-[16px] font-semibold text-black' >Account Creation</p>
            <div className='flex flex-col' style={{ marginTop: "15px" }}  >
                <div className=' flex    '>
                    <input id="default-checkbox" type="checkbox" />
                    <label className='ml-[15px] not-italic text-[14px] text-center font-medium text-black' for="default-checkbox">Allow customers to create an account during checkout. </label>
                </div>
                <div className='mt-[20px] flex   '>
                    <input id="default-checkbox" type="checkbox" />
                    <label className=' ml-[15px] not-italic text-[14px] text-center font-medium text-black' for="default-checkbox">Allow customers to create an account on the “My Account Page”.</label>
                </div>
                <div className='mt-[20px] flex   '>
                    <input id="default-checkbox" type="checkbox" />
                    <label className=' ml-[15px] not-italic text-[14px] text-center font-medium text-black' for="default-checkbox">When creating an account, automatically generate an account username for the customer based on their name or email.</label>
                </div>
                <div className='mt-[20px] flex   '>
                    <input id="default-checkbox" type="checkbox" />
                    <label className=' ml-[15px] not-italic text-[14px] text-center font-medium text-black' for="default-checkbox">When creating an account, send the new user a link to set their password.</label>
                </div>
            </div>
            <p className='not-italic   text-[16px] font-semibold text-black' style={{ marginTop: "40px" }}  >Privacy policy</p>
            <div style={{ marginTop: "15px" }} >
                <p className=' not-italic text-[14px] font-medium text-black' >This section controls the display of website privacy policy. The privacy notices below will not show up unless a privacy page is set.</p>
            </div>
            <p className='not-italic mt-[40px]  text-[14px] font-semibold text-black'  >Registration privacy Policy</p>
            <div className='container  items-start h-[100px] rounded-[15px] border-2' style={{ marginTop: "15px" }} >
                <p className='mt-[15px] ml-[30px] w-[900px] not-italic text-[14px] font-medium text-black'> Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other
                    purposes described in our [privacy_policy].</p>
            </div>
            <p className='not-italic   text-[14px] font-semibold text-black' style={{ marginTop: "40px" }}  >Checkout privacy Policy</p>
            <div className='container  items-start h-[100px] rounded-[15px] border-2' style={{ marginTop: "15px" }} >
                <p className='mt-[15px] ml-[30px] not-italic text-[14px] font-medium text-black ' >Your personal data will be used to process this order, support your experience throughout this website, and for other purposes described in our [privacy_policy]
                </p>
            </div>

        </CardAdmin>


        <div className='float-right'>
            <Button className="mt-0 mb-0 " > Save Changes </Button>
        </div>
    </>
}

export default accountsetting