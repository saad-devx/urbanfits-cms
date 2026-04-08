import { RightArrowIcon } from '@/public/sidebaricons/RightArrowIcon'
import Button from '@/components/buttons/simple_btn'
import { Button2 } from '@/components/buttons/Button2'
import DownloadIcon from '@/public/icons/DownloadIcon'
import PrintIcon from '@/public/icons/PrintIcon'
import ShareIcon from '@/public/icons/ShareIcon'
import CardAdmin from '@/components/cards/cardadmin'
// import GenericTable2 from '@/components/GenericTables/GenericTable2'
import { invoiceTableColumns, invoiceTableData } from '@/mock/tablesdata'

export default function Invoice() {
  return <>
    <div className="flex mt-[15px] justify-between items-center ">
      <div>
        <div className="font_futura">
          <p className="not-italic text-[22px]  font-medium text-black">
            Invoice
          </p>
        </div>
        <div className=" flex items-center mt-[15px] ">
          <li className="  not-italic text-[14px] text-center font-medium text-black list-none">
            Home
          </li>
          <li className=" ml-[12px] not-italic text-[14px] text-center font-medium text-black list-none">
            <RightArrowIcon />
          </li>
          <li className=" ml-[12px] not-italic text-[14px] text-center font-medium text-black list-none">
            Transaction
          </li>
          <li className=" ml-[12px] not-italic text-[14px] text-center font-medium text-black list-none">
            <RightArrowIcon />
          </li>
          <li className=" ml-[12px] not-italic text-[14px] text-center font-medium text-black list-none">
            Invoice
          </li>

        </div>
      </div>
      {/*  */}
      <div className='flex gap-[10px]' >
        <span>
          <Button2 my="my-[0px]">
            <span className='text-[14px] font-[400]  flex items-center gap-[10px] ' >
              <DownloadIcon />  <p className='text-[white]' > Download </p>
            </span>
          </Button2>
        </span>
        <span>
          <Button2 my="my-[0px]">
            <span className='text-[14px] font-[400]  flex items-center gap-[10px] ' >
              <PrintIcon />  <p className='text-[white]' > Print </p>
            </span>
          </Button2>
        </span>
        <span>
          <Button2 my="my-[0px]">
            <span className='text-[14px] font-[400]  flex items-center gap-[10px] ' >
              <ShareIcon />  <p className='text-[white]' > Share </p>
            </span>
          </Button2>
        </span>
      </div>
      {/*  */}
    </div>

    <CardAdmin classes="mt-[20px]" >

      <div className='p-[40px]  ' >
        <p className='text-[24px] font-[500]  '> Invoice # 125 </p>
        <section className='flex justify-between' >
          <div className='flex  gap-[61px]' >
            <div>
              <p className='text-[17px] font-[500] mt-[20px] ' >From</p>
              <p className='text-[14px] font-[300] mt-[15px] ' >John Doe</p>
              <p className='text-[14px] font-[300] mt-[10px] ' >47 Elita Squre, VIP Chowk,</p>
              <p className='text-[14px]  mt-[10px] flex gap-[5px] ' >
                <p className='font-[500]'> Email: </p> <p className='font-[300]'>example@gmail.com</p> </p>
              <p className='text-[14px]  mt-[10px] flex gap-[5px] ' >
                <p className='font-[500]'> Phone: </p> <p className='font-[300]'> +91 5264 251 325</p> </p>
            </div>
            <div>
              <p className='text-[17px] font-[500] mt-[20px] ' >To</p>
              <p className='text-[14px] font-[300] mt-[15px] ' >John Doe</p>
              <p className='text-[14px] font-[300] mt-[10px] ' >47 Elita Squre, VIP Chowk,</p>
              <p className='text-[14px]  mt-[10px] flex gap-[5px] ' >
                <p className='font-[500]'> Email: </p> <p className='font-[300]'></p>example@gmail.com </p>
              <p className='text-[14px]  mt-[10px] flex gap-[5px] ' >
                <p className='font-[500]'> Phone: </p> <p className='font-[300]'> +91 5264 251 325</p> </p>


            </div>
          </div>
          <div className='flex  gap-[10px]' >
            <div>
              <p className='text-[17px] font-[500] ' >Details</p>
              <p className='text-[14px] font-[500] mt-[15px] ' >Date & Time:</p>
              <p className='text-[14px] font-[500] mt-[10px] ' >Tracking ID:</p>
              <p className='text-[14px] font-[500] mt-[10px] ' >Invoice ID:</p>
              <p className='text-[14px] font-[500] mt-[10px] ' >Order No:</p>

            </div>
            <div>
              <p className='text-[14px] font-[400] mt-[41px] ' >March 24, 3033 03:33PM (UC+)</p>
              <p className='text-[14px] font-[400] mt-[10px] ' >#20251521551210222</p>
              <p className='text-[14px] font-[400] mt-[10px] ' >#0215247514</p>
              <p className='text-[14px] font-[400] mt-[10px] ' >#21014</p>

            </div>
          </div>
        </section>



        {/* <GenericTable2 columns={invoiceTableColumns} data={invoiceTableData} /> */}

        <div className='flex gap-[71px] justify-end ' >
          <div className='flex flex-col' >
            <p className='text-[14px] font-[400] mt-[15px] ' >Subtotal</p>
            <p className='text-[14px] font-[400] mt-[20px] ' >Vat (10%)</p>
            <p className='text-[14px] font-[400] mt-[20px] ' >Total</p>

          </div>
          <div>
            <p className='text-[14px] font-[400] mt-[15px] ' >$1200.00</p>
            <p className='text-[14px] font-[400] mt-[20px] ' >$100.00</p>
            <p className='text-[14px] font-[400] mt-[20px] ' >$1300.00</p>
          </div>
        </div>
        <div className='flex justify-end mt-[20px] ' >
          <Button classes=" w-[150px]" my="my-[0px]" >Download </Button>
        </div>
      </div>
    </CardAdmin>
  </>
}