import CardAdmin from "@/components/cards/cardadmin";
import Button from "@/components/buttons/simple_btn";
import { RedirectIcon } from '@/public/icons/RedirectIcon';

export default function Transaction() {
    const [selectedrowindex, setSelectedrowindex] = React.useState();
    const handlerowclick = (rowindex) => {
        setSelectedrowindex(rowindex);
        setrow();
    }
    const [selectedrow, setSelectedrow] = React.useState();

    const setrow = () => {
        transactionTableData.forEach(element => {
            if (element.transid == selectedrowindex) {
                setSelectedrow(element)
            }
        });
    }

    return <>
        <p className='text-[22px] font-[500] mt-[20px] ' >
            Transaction
        </p>
        <CardAdmin >
            <div className='grid grid-cols-4' >
                <div className='p-[40px] col-span-3 ' >
                    {/* <GenericTable1  columns={transactionTableColumns}  data={transactionTableData} 
                        handlerowclick={handlerowclick}
                        isrowclick={true}
                    /> */}
                </div>

                <div className='col-span-1 px-[20px] py-[40px] 
                bg-[#FCFCFC] rounded-r-[25px]  flex flex-col ' >
                    <p className='text-[18px] font-[500] ' >Transaction Detail</p>
                    <hr className='mt-[20px] ' />

                    <div className='flex flex-col gap-[8px] mt-[30px] ' >
                        <p className='text-[16px] font-[500] ' >Supplier: </p>
                        <p className='text-[12px] font-[400] ' > Template Mount </p>
                    </div>
                    <div className='flex flex-col gap-[8px] mt-[29px] ' >
                        <p className='text-[16px] font-[500] ' >Date: </p>
                        <p className='text-[12px] font-[400] ' > Dec 19th, 2022 </p>
                    </div >
                    <div className='flex flex-col gap-[8px] mt-[29px] ' >
                        <p className='text-[16px] font-[500] ' >Billing Address </p>
                        <p className='text-[12px] font-[400] ' > 1901 Thornridge Cir.Shiloh, </p>
                        <p className='text-[12px] font-[400] ' > Hawaii 18064 </p>
                    </div >
                    <div className='flex flex-col gap-[8px] mt-[29px] ' >
                        <p className='text-[16px] font-[500] ' >VAT ID : </p>
                        <p className='text-[12px] font-[400] ' > {selectedrow?.transid} </p>
                    </div >
                    <div className='flex flex-col gap-[8px] mt-[29px] ' >
                        <p className='text-[16px] font-[500] ' >Email : </p>
                        <p className='text-[12px] font-[400] ' > Example@gmail.com </p>
                    </div >
                    <div className='flex flex-col gap-[8px] mt-[29px] ' >
                        <p className='text-[16px] font-[500] ' >Item Purchased : </p>
                        <p className='text-[12px] font-[400] flex items-center gap-[10px] ' > <p>  Adidas Air Jordan</p> <RedirectIcon /> </p>
                        <p className='text-[12px] font-[400] flex items-center gap-[10px]' > <p> Great Product</p> <RedirectIcon /> </p>
                        <p className='text-[12px] font-[400] flex items-center gap-[10px]' > <p> Great Product</p> <RedirectIcon /> </p>
                    </div >
                    <div className='flex flex-col gap-[8px] mt-[29px] ' >
                        <p className='text-[16px] font-[500] ' >Payment : Paypal </p>
                        <p className='text-[12px] font-[400] ' > {selectedrow?.paid} </p>
                    </div >
                    <Button my="my-[0px]" classes="mt-[38px]" > Download Receipet </Button>
                </div>
            </div>

        </CardAdmin>
    </>
}