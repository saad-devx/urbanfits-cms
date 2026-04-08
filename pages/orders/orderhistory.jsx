import CardAdmin from "@/components/cards/cardadmin";
import { RightArrowIcon } from "@/public/sidebaricons/RightArrowIcon";
import Button from "@/components/buttons/simple_btn";
import GenericTable1 from "@/components/GenericTables/GenericTable1";

import { orderHistoryTableColumns, orderHistoryTableData } from '@/mock/tablesdata';

const orderhistory = () => {
  return <>
    <div className="flex mt-[15px] justify-between items-center ">
      <div>
        <div className="font_futura">
          <p className="not-italic text-[22px]  font-medium text-black">
            Order List
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
            Order
          </li>
          <li className=" ml-[12px] not-italic text-[14px] text-center font-medium text-black list-none">
            <RightArrowIcon />
          </li>
        </div>
      </div>
      {/*  */}
      <div>
        <span>
          <Button my="my-[0px]"> Add Oder</Button>
        </span>
      </div>
      {/*  */}
    </div>

    <CardAdmin classes="px-[40px] py-[42px] mt-[20px] ">
      <div className="grid grid-cols-1">
        {/* <div className="flex flex-col  "> */}
        {/* <GenericTable1
          border={true}
            columns={orderHistoryTableColumns}
            data={orderHistoryTableData}
          /> */}
      </div>
      {/* </div> */}
    </CardAdmin>
  </>
}

export default orderhistory