import ActionButton from "../buttons/ActionButton";
import Image from "next/image";
import smartWatch from "@/public/smartWatch.png";

const Pagination = ({
  dataStates,
  canNextPage,
  canPreviousPage,
  gotoPage,
  pageCount,
  nextPage,
  previousPage,
  pageIndex
}) => {
  const moreData = [
    {
      product: <Image alt="product image" src={smartWatch} />,
      name: " Baby shoes Bayhdahakd",
      price: "$ 20",
      offer: "25% off",
      purchased: "16",
      stock: "1845",
      status: "Active",
      date: "2021-10-30",
      action: <ActionButton />,
  
    },
    {
      product: <Image alt="product image" src={smartWatch} />,
      name: " Baby shoes Bayhdahakd",
      price: "$ 20",
      offer: "25% off",
      purchased: "16",
      stock: "1845",
      status: "Active",
      date: "2021-10-30",
      action: <ActionButton />,
  
    },
    {
      product: <Image alt="product image" src={smartWatch} />,
      name: " Baby shoes Bayhdahakd",
      price: "$ 20",
      offer: "25% off",
      purchased: "16",
      stock: "1845",
      status: "Active",
      date: "2021-10-30",
      action: <ActionButton />,
  
    },
    {
      product: <Image alt="product image" src={smartWatch} />,
      name: " Baby shoes Bayhdahakd",
      price: "$ 20",
      offer: "25% off",
      purchased: "16",
      stock: "1845",
      status: "Active",
      date: "2021-10-30",
      action: <ActionButton />,
  
    },
    {
      product: <Image alt="product image" src={smartWatch} />,
      name: " Baby shoes Bayhdahakd",
      price: "$ 20",
      offer: "25% off",
      purchased: "16",
      stock: "1845",
      status: "Active",
      date: "2021-10-30",
      action: <ActionButton />,
  
    },
    {
      product: <Image alt="product image" src={smartWatch} />,
      name: " Baby shoes Bayhdahakd",
      price: "$ 20",
      offer: "25% off",
      purchased: "16",
      stock: "1845",
      status: "Active",
      date: "2021-10-30",
      action: <ActionButton />,
  
    },
    {
      product: <Image alt="product image" src={smartWatch} />,
      name: " Baby shoes Bayhdahakd",
      price: "$ 20",
      offer: "25% off",
      purchased: "16",
      stock: "1845",
      status: "Active",
      date: "2021-10-30",
      action: <ActionButton />,
  
    },
  ]
  const addMoreData = ()=>{
    console.log("add more data is running...")
    console.log(!canNextPage)
    if(!canNextPage) dataStates.setTableData(dataStates.tableData.push(...moreData))
    console.log(dataStates.tableData.length)
  }
  return (
    <div className="pagination p-0.5 rounded-full bg-gold-land overflow-hidden select-none">
      <button className={`${!canPreviousPage ? "text-gray-300 pointer-events-none" : "text-black"} rounded-l-full bg-white w-[87px] h-10 transition-all`}
        onClick={() => previousPage()} disabled={!canPreviousPage}>
        Previous
      </button>
      <button className="w-10 h-10 rounded bg-[#222222] text-white"
        onClick={() => previousPage()} disabled={!canPreviousPage}>
        {pageIndex+1}
      </button>
      <button className={`${!canNextPage ? "text-gray-300" : "text-black"} rounded-r-full bg-white w-[87px] h-10 transition-all`}
        onClick={() => {nextPage(); addMoreData()}}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
