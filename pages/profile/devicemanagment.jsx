import Profile from '.'
import CardAdmin from '@/components/cards/cardadmin'
import DeviceIcon from '@/public/icons/DeviceIcon'
import { CrossIcon } from '@/public/icons/CrossIcon'

const devicemanagment = () => {
  return (
    <Profile>
        <CardAdmin classes="p-[40px]"  >
            <div className="text-[22px] font-[400] flex items-center gap-[10px] " > <DeviceIcon/>  <p className='mt-[3px]'>Device Management</p>  </div>
            
            <div className='flex justify-between bg-[#F4F4F4] px-[20px] py-[13px] items-center rounded-[5px] gap-y-[30px]  ' >
                <p>Chrome 108.0.0 (Windows 10)</p>
                <p>94.204.87.83</p>
                <p>Dubai, United Arab Emirates</p>
                <p>09:58 12.01.23</p>
                <CrossIcon/>
            </div>
            <div className='flex justify-between bg-[#F4F4F4] px-[20px] py-[13px] items-center rounded-[5px] gap-y-[30px]  ' >
                <p>Chrome 108.0.0 (Windows 10)</p>
                <p>94.204.87.83</p>
                <p>Dubai, United Arab Emirates</p>
                <p>09:58 12.01.23</p>
                <CrossIcon/>
            </div>
            <div className='flex justify-between bg-[#F4F4F4] px-[20px] py-[13px] items-center rounded-[5px] gap-y-[30px]  ' >
                <p>Chrome 108.0.0 (Windows 10)</p>
                <p>94.204.87.83</p>
                <p>Dubai, United Arab Emirates</p>
                <p>09:58 12.01.23</p>
                <CrossIcon/>
            </div>
     
        </CardAdmin>
    </Profile>
  )
}

export default devicemanagment