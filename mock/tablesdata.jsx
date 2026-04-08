import Image from "next/image";
import smartWatch from "@/public/smartWatch.png";
import MenuButton from "@/components/buttons/menuButton";
import ActionButton from "@/components/buttons/ActionButton";
import StatusBadge from "@/components/GenericTables/StatusBadge";
import Infotip from '@/components/tooltips/infotip'
import { VisaIcon } from "@/public/icons/VisaIcon";
import { AmexIcon } from "@/public/icons/AmexIcon";
import { MastercardIcon } from "@/public/icons/MastercardIcon";
import { Dots3Icon } from "@/public/icons/Dots3Icon";
import { orderStatuses } from "@/uf.config";

export const userListTableColumns = [
  {
    selector: row => row.avatar,
    name: "Avatar",
    cell: (row) => <span className='w-10 aspect-square rounded-lg overflow-hidden' >
      <Image className='w-full h-full object-cover' width={80} height={80} alt={row.name} src={row.avatar || process.env.NEXT_PUBLIC_DEFAULT_PFP} />
    </span>,
    width: '10%',
  },
  {
    selector: row => row.name,
    cell: row => <div className="w-full group relative flex justify-start">
      <span className='w-full whitespace-nowrap truncate cursor-default'>
        {row.name}
        <Infotip>{row.fullname}</Infotip>
      </span>
    </div>,
    name: "Name",
    sortable: true,
  },
  {
    selector: row => row.email,
    cell: row => <div className="w-full group relative flex justify-start">
      <span className='w-full whitespace-nowrap truncate cursor-default'>
        {row.email}
        <Infotip>{row.email}</Infotip>
      </span>
    </div>,
    name: "Email",
    sortable: true,
  },
  {
    selector: row => row.phone,
    name: "Phone no.",
    cell: row => <div className="w-full group relative flex justify-start">
      <span className='w-full whitespace-nowrap truncate cursor-default'>
        {row.phone}
        <Infotip>{row.phone}</Infotip>
      </span>
    </div>,
    sortable: true,
  },
  {
    selector: row => row.purchases,
    name: "Total Purchases",
    sortable: true,
  },
  {
    selector: row => row.status,
    name: "Status",
    cell: row => <span style={{ background: row.status ? "#22c55e" : "#f3f4f6", color: row.status ? "white" : "black" }} className="text-xs bg-gray-100 text-white px-2 py-0.5 rounded-full">{row.status ? "Online" : "Offline"}</span>,
    sortable: true,
  },
  {
    selector: row => row.joined_at,
    cell: row => <div className="w-full group relative flex justify-start">
      <span className='w-full whitespace-nowrap truncate cursor-default'>
        {row.joined_at}
      </span>
      <Infotip positions="w-auto whitespace-nowrap right-5 -bottom-full">{row.joined_at}</Infotip>
    </div>,
    name: "Joined at",
    sortable: true,
  },
  {
    selector: row => row.actions,
    name: "Action",
    cell: (row) => <ActionButton infoLink={row.infoLink} handleInfo={row.handleInfo} options={row.actions} />
  }
]

export const userTasksTableColumns = [
  {
    selector: row => row.avatar,
    name: "Avatar",
    cell: (row) => <span className='w-10 aspect-square rounded-lg overflow-hidden' >
      <Image className='w-full h-full object-cover' width={80} height={80} alt={row.name} src={row.avatar || process.env.NEXT_PUBLIC_DEFAULT_PFP} />
    </span>,
    width: '10%'
  },
  {
    selector: row => row.name,
    cell: row => <span className='w-full whitespace-nowrap truncate cursor-default'>{row.name}</span>,
    name: "Name",
    width: '20%',
    sortable: true
  },
  {
    selector: row => row.email,
    cell: row => <div className="w-full group relative flex justify-start">
      <span className='w-full whitespace-nowrap truncate cursor-default'>
        {row.email}
        <Infotip>{row.email}</Infotip>
      </span>
    </div>,
    name: "Email",
    sortable: true,
    width: '25%'
  },
  {
    selector: row => row.tasks.length,
    name: "Tasks Completed",
    cell: row => {
      const completedTasks = row.tasks.filter(task => task.completed).length
      const greenFlag = completedTasks > 8;
      return <span style={{ background: greenFlag ? "#22c55e" : "#f3f4f6", color: greenFlag ? "white" : "black" }} className="ml-3 text-xs bg-gray-100 text-white px-2 py-0.5 rounded-full">{completedTasks}</span>
    },
    sortable: true,
    width: '15%'
  },
  {
    selector: row => row.tasks.find(task => task.image_submitted && task.need_image && !task.completed),
    cell: row => {
      const unApproved = row.tasks.find(task => task.image_submitted && task.need_image && !task.completed);
      return <span style={{ background: unApproved ? "#f97316" : "#94a3b8", color: "#ffffff" }} className='ml-3 px-2 py-px text-xs rounded-2xl whitespace-nowrap truncate cursor-default'>
        {unApproved ? "need approval" : "none"}
      </span>
    },
    name: "Submission",
    sortable: true,
    width: '16%'
  },
  {
    selector: row => row.actions,
    name: "Action",
    cell: (row) => <ActionButton infoLink={row.infoLink} handleInfo={row.handleInfo} options={row.actions} />,
    width: '14%'
  }
]

export const ordersTableColumns = [
  {
    selector: row => row.item,
    name: "Item(s)",
    cell: (row) => {
      const haveGiftCard = row.gift_cards.some(item => item.is_giftcard);
      return <div className="flex items-center gap-x-2">
        <div className="w-14 h-11 my-2 rounded-lg overflow-hidden">
          {haveGiftCard ? <div style={{ width: "50px", height: "100%", background: "#FF4A60" }} className="flex justify-center items-center text-[10px] text-white">UF-Gift</div> : <Image style={{ width: "50px", height: "100%" }} className='object-cover' width={80} height={80} alt={row.name} src={process.env.NEXT_PUBLIC_BASE_IMG_URL + row.image} />}
        </div>
        {haveGiftCard ? `UF E-Giftcard (${row.gift_cards.length})` : row.name}
      </div>
    },
    width: '25%',
    sortable: true
  },
  {
    selector: row => row.email,
    cell: row => <div className="w-full group relative flex justify-start">
      <span className='w-full whitespace-nowrap truncate cursor-default'>
        {row.email}
        <Infotip>{row.email}</Infotip>
      </span>
    </div>,
    name: "Customer email",
    width: '18%',
    sortable: true,
  },
  {
    selector: row => row.price,
    name: "Total Price",
    sortable: true,
  },
  {
    selector: row => row.status,
    name: "Group",
    cell: row => {
      const { status, group } = row.status || { status: "DELIVERED", group: "delivered" };
      return <span style={{ background: orderStatuses[status || "DELIVERED"].bg, color: orderStatuses[status || "DELIVERED"].text }} className="text-[10px] px-2 py-0.5 rounded-full">{group || "delivered"}</span>
    },
    sortable: true,
  },
  {
    selector: row => row.status,
    name: "Status",
    cell: row => {
      const { status } = row.status || { status: "DELIVERED", group: "delivered" };
      return <span style={{ background: orderStatuses[status].bg, color: orderStatuses[status].text }} className="text-[10px] px-2 py-0.5 rounded-full">{status.toLowerCase()}</span>
    },
    sortable: true,
  },
  {
    selector: row => row.date,
    cell: row => {
      const date = new Date(row.date)
      return <div className="w-full group relative flex justify-start">
        <span className='w-full whitespace-nowrap truncate cursor-default'>
          {date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()}
        </span>
        <Infotip positions="w-auto whitespace-nowrap right-5 -bottom-full">{row.date}</Infotip>
      </div>
    },
    name: "Joined at",
    sortable: true,
  },
  {
    selector: row => row.actions,
    name: "Action",
    cell: (row) => <ActionButton infoLink={row.infoLink} handleInfo={row.handleInfo} options={row.actions} />
  }
];

export const orderHistoryTableColumns = [
  {
    accessor: "id",
    Header: <span className="select-none " >ID</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "customer",
    Header: <span className="select-none " >Customer</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "email",
    Header: <span className="select-none " >Email</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "item",
    Header: <span className="select-none " >Item</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "price",
    Header: <span className="select-none " >Price</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "payment",
    Header: <span className="select-none " >Payment</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "status",
    Header: <span className="select-none " >Status</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "date",
    Header: <span className="select-none " >Date</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "action",
    Header: <span className="select-none " >Action</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
];

export const orderHistoryTableData = [
  {
    id: <p className="text-[14px] "> 354 </p>,
    customer: <p className="font-[400] "> Bilawal Ashraf </p>,
    email: <p className=" ">Bilawalashraf@gmail.com</p>,
    item: <p className="text-[14px] "> 0 </p>,
    price: <p className="text-[14px] "> $845 </p>,
    payment: <p className="text-[14px] font-[400] ">PAID</p>,
    status: <StatusBadge status="delivered" />,
    date: <p className="text-[14px] "> 2021-10-30</p>,
    action: <ActionButton />,
  },
  {
    id: <p className="text-[14px] "> 354 </p>,
    customer: <p className="font-[400] "> Bilawal Ashraf </p>,
    email: <p className=" ">Bilawalashraf@gmail.com</p>,
    item: <p className="text-[14px] "> 0 </p>,
    price: <p className="text-[14px] "> $845 </p>,
    payment: <p className="text-[14px] font-[400] ">PAID</p>,
    status: <StatusBadge status="delivered" />,
    date: <p className="text-[14px] "> 2021-10-30</p>,
    action: <ActionButton />,
  },
  {
    id: <p className="text-[14px] "> 354 </p>,
    customer: <p className="font-[400] "> Bilawal Ashraf </p>,
    email: <p className=" ">Bilawalashraf@gmail.com</p>,
    item: <p className="text-[14px] "> 0 </p>,
    price: <p className="text-[14px] "> $845 </p>,
    payment: <p className="text-[14px] font-[400] ">PAID</p>,
    status: <StatusBadge status="delivered" />,
    date: <p className="text-[14px] "> 2021-10-30</p>,
    action: <ActionButton />,
  },
  {
    id: <p className="text-[14px] "> 354 </p>,
    customer: <p className="font-[400] "> Bilawal Ashraf </p>,
    email: <p className=" ">Bilawalashraf@gmail.com</p>,
    item: <p className="text-[14px] "> 0 </p>,
    price: <p className="text-[14px] "> $845 </p>,
    payment: <p className="text-[14px] font-[400] ">PAID</p>,
    status: <StatusBadge status="delivered" />,
    date: <p className="text-[14px] "> 2021-10-30</p>,
    action: <ActionButton />,
  },
  {
    id: <p className="text-[14px] "> 354 </p>,
    customer: <p className="font-[400] "> Bilawal Ashraf </p>,
    email: <p className=" ">Bilawalashraf@gmail.com</p>,
    item: <p className="text-[14px] "> 0 </p>,
    price: <p className="text-[14px] "> $845 </p>,
    payment: <p className="text-[14px] font-[400] ">PAID</p>,
    status: <StatusBadge status="delivered" />,
    date: <p className="text-[14px] "> 2021-10-30</p>,
    action: <ActionButton />,
  },
  {
    id: <p className="text-[14px] "> 354 </p>,
    customer: <p className="font-[400] "> Bilawal Ashraf </p>,
    email: <p className=" ">Bilawalashraf@gmail.com</p>,
    item: <p className="text-[14px] "> 0 </p>,
    price: <p className="text-[14px] "> $845 </p>,
    payment: <p className="text-[14px] font-[400] ">PAID</p>,
    status: <StatusBadge status="delivered" />,
    date: <p className="text-[14px] "> 2021-10-30</p>,
    action: <ActionButton />,
  },
  {
    id: <p className="text-[14px] "> 354 </p>,
    customer: <p className="font-[400] "> Bilawal Ashraf </p>,
    email: <p className=" ">Bilawalashraf@gmail.com</p>,
    item: <p className="text-[14px] "> 0 </p>,
    price: <p className="text-[14px] "> $845 </p>,
    payment: <p className="text-[14px] font-[400] ">PAID</p>,
    status: <StatusBadge status="delivered" />,
    date: <p className="text-[14px] "> 2021-10-30</p>,
    action: <ActionButton />,
  },
  {
    id: <p className="text-[14px] "> 354 </p>,
    customer: <p className="font-[400] "> Bilawal Ashraf </p>,
    email: <p className=" ">Bilawalashraf@gmail.com</p>,
    item: <p className="text-[14px] "> 0 </p>,
    price: <p className="text-[14px] "> $845 </p>,
    payment: <p className="text-[14px] font-[400] ">PAID</p>,
    status: <StatusBadge status="delivered" />,
    date: <p className="text-[14px] "> 2021-10-30</p>,
    action: <ActionButton />,
  },
  {
    id: <p className="text-[14px] "> 354 </p>,
    customer: <p className="font-[400] "> Bilawal Ashraf </p>,
    email: <p className=" ">Bilawalashraf@gmail.com</p>,
    item: <p className="text-[14px] "> 0 </p>,
    price: <p className="text-[14px] "> $845 </p>,
    payment: <p className="text-[14px] font-[400] ">PAID</p>,
    status: <StatusBadge status="delivered" />,
    date: <p className="text-[14px] "> 2021-10-30</p>,
    action: <ActionButton />,
  },
  {
    id: <p className="text-[14px] "> 354 </p>,
    customer: <p className="font-[400] "> Bilawal Ashraf </p>,
    email: <p className=" ">Bilawalashraf@gmail.com</p>,
    item: <p className="text-[14px] "> 0 </p>,
    price: <p className="text-[14px] "> $845 </p>,
    payment: <p className="text-[14px] font-[400] ">PAID</p>,
    status: <StatusBadge status="delivered" />,
    date: <p className="text-[14px] "> 2021-10-30</p>,
    action: <ActionButton />,
  },

];

export const orderProductDetailTableColumns = [
  {
    selector: row => row.image,
    name: "Image",
    cell: (row) => <div className="w-14 h-11 my-2 rounded-lg overflow-hidden">
      {row.haveGiftCard ?
        <div style={{ width: "50px", aspectRatio: "1/1", background: "#FF4A60" }} className="flex justify-center items-center rounded-lg text-[10px] text-white">UF-Gift</div>
        : <Image style={{ width: "50px", height: "100%" }} className='object-cover' width={80} height={80} alt={row.name.en} src={process.env.NEXT_PUBLIC_BASE_IMG_URL + row.image} />}
    </div>,
    width: '9%',
  },
  {
    selector: row => row.name,
    name: "Product",
    cell: (row) => <span className='flex flex-col text-xs text-gray-400'>
      <p className="text-sm text-black">{row.haveGiftCard ? `UF E-Giftcard (For ${row.buy_for})` : row.name.en}</p>
      {!row.haveGiftCard && <span> Variant: {row.variant}</span>}
    </span>,
    width: '30%',
  },
  {
    selector: row => row.sku,
    cell: (row) => <div className="w-full group relative">
      <button onClick={() => navigator.clipboard.writeText(row.sku)} className='w-full whitespace-nowrap text-left truncate'>
        <Infotip>copy</Infotip>
        {row.haveGiftCard ? "N/A" : row.sku}
      </button>
    </div>,
    name: "SKU",
    width: '17%'
  },
  {
    selector: row => row.quantity,
    name: "Quantity",
    width: '9%'
  },
  {
    selector: row => row.weight,
    cell: row => row.haveGiftCard ? "N/A" : row.weight,
    name: "Weight (grams)",
    width: '13%',
  },
  {
    selector: row => row.price,
    name: "Price/Unit",
    width: '12%',
  },
  {
    selector: row => row.price * row.quantity,
    name: "Subtotal",
    width: '10%'
  },
];

export const transactionTableColumns = [
  {
    accessor: "transid",
    Header: <span className="select-none " >Trans-ID</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "paid",
    Header: <span className="select-none " >Paid</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "method",
    Header: <span className="select-none " >Method</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "date",
    Header: <span className="select-none " >Date</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "date2",
    Header: <span className="select-none " >Date</span>,
    Cell: ({ cell: { value }, row }) => <span  > {value} </span>,
  },
]

export const transactionTableData = [
  {
    transid: "#1",
    paid: <p className="text-[14px] font-[400]"> $354.00 </p>,
    method: <p className="text-[14px] font-[400] flex items-center gap-[7px]"> <VisaIcon /> <p> Visa </p></p>,
    date: <p className="text-[14px] font-[400]"> 16.12.2018, 14:21 </p>,
    date2: <span className="w-[80px] h-[25px] rounded-[5px] border-[1px]
     flex justify-center items-center cursor-pointer " >
      <p className="text-[14px] font-[400]"> Details </p>
    </span>
  },
  {
    transid: "#2",
    paid: <p className="text-[14px] font-[400]"> $354.00 </p>,
    method: <p className="text-[14px] font-[400] flex items-center gap-[7px]"> <AmexIcon /> <p> Visa </p></p>,
    date: <p className="text-[14px] font-[400]"> 16.12.2018, 14:21 </p>,
    date2: <span className="w-[80px] h-[25px] rounded-[5px] border-[1px]
     flex justify-center items-center cursor-pointer " >
      <p className="text-[14px] font-[400]"> Details </p>
    </span>
  },
  {
    transid: "#3",
    paid: <p className="text-[14px] font-[400]"> $354.00 </p>,
    method: <p className="text-[14px] font-[400] flex items-center gap-[7px]"> <MastercardIcon /> <p> Visa </p></p>,
    date: <p className="text-[14px] font-[400]"> 16.12.2018, 14:21 </p>,
    date2: <span className="w-[80px] h-[25px] rounded-[5px] border-[1px]
     flex justify-center items-center cursor-pointer " >
      <p className="text-[14px] font-[400]"> Details </p>
    </span>
  },
  {
    transid: "#4",
    paid: <p className="text-[14px] font-[400]"> $354.00 </p>,
    method: <p className="text-[14px] font-[400] flex items-center gap-[7px]"> <VisaIcon /> <p> Visa </p></p>,
    date: <p className="text-[14px] font-[400]"> 16.12.2018, 14:21 </p>,
    date2: <span className="w-[80px] h-[25px] rounded-[5px] border-[1px]
     flex justify-center items-center cursor-pointer " >
      <p className="text-[14px] font-[400]"> Details </p>
    </span>
  },
  {
    transid: " #5",
    paid: <p className="text-[14px] font-[400]"> $354.00 </p>,
    method: <p className="text-[14px] font-[400] flex items-center gap-[7px]"> <VisaIcon /> <p> Visa </p></p>,
    date: <p className="text-[14px] font-[400]"> 16.12.2018, 14:21 </p>,
    date2: <span className="w-[80px] h-[25px] rounded-[5px] border-[1px]
     flex justify-center items-center cursor-pointer " >
      <p className="text-[14px] font-[400]"> Details </p>
    </span>
  },
  {
    transid: " #6",
    paid: <p className="text-[14px] font-[400]"> $354.00 </p>,
    method: <p className="text-[14px] font-[400] flex items-center gap-[7px]"> <VisaIcon /> <p> Visa </p></p>,
    date: <p className="text-[14px] font-[400]"> 16.12.2018, 14:21 </p>,
    date2: <span className="w-[80px] h-[25px] rounded-[5px] border-[1px]
     flex justify-center items-center cursor-pointer " >
      <p className="text-[14px] font-[400]"> Details </p>
    </span>
  },
  {
    transid: "#7",
    paid: <p className="text-[14px] font-[400]"> $354.00 </p>,
    method: <p className="text-[14px] font-[400] flex items-center gap-[7px]"> <VisaIcon /> <p> Visa </p></p>,
    date: <p className="text-[14px] font-[400]"> 16.12.2018, 14:21 </p>,
    date2: <span className="w-[80px] h-[25px] rounded-[5px] border-[1px]
     flex justify-center items-center cursor-pointer " >
      <p className="text-[14px] font-[400]"> Details </p>
    </span>
  },
  {
    transid: "#8",
    paid: <p className="text-[14px] font-[400]"> $354.00 </p>,
    method: <p className="text-[14px] font-[400] flex items-center gap-[7px]"> <VisaIcon /> <p> Visa </p></p>,
    date: <p className="text-[14px] font-[400]"> 16.12.2018, 14:21 </p>,
    date2: <span className="w-[80px] h-[25px] rounded-[5px] border-[1px]
     flex justify-center items-center cursor-pointer " >
      <p className="text-[14px] font-[400]"> Details </p>
    </span>
  },
  {
    transid: "#9",
    paid: <p className="text-[14px] font-[400]"> $354.00 </p>,
    method: <p className="text-[14px] font-[400] flex items-center gap-[7px]"> <VisaIcon /> <p> Visa </p></p>,
    date: <p className="text-[14px] font-[400]"> 16.12.2018, 14:21 </p>,
    date2: <span className="w-[80px] h-[25px] rounded-[5px] border-[1px]
     flex justify-center items-center cursor-pointer " >
      <p className="text-[14px] font-[400]"> Details </p>
    </span>
  },
  {
    transid: "#10",
    paid: <p className="text-[14px] font-[400]"> $354.00 </p>,
    method: <p className="text-[14px] font-[400] flex items-center gap-[7px]"> <VisaIcon /> <p> Visa </p></p>,
    date: <p className="text-[14px] font-[400]"> 16.12.2018, 14:21 </p>,
    date2: <span className="w-[80px] h-[25px] rounded-[5px] border-[1px]
     flex justify-center items-center cursor-pointer " >
      <p className="text-[14px] font-[400]"> Details </p>
    </span>
  },
  {
    transid: "#11",
    paid: <p className="text-[14px] font-[400]"> $354.00 </p>,
    method: <p className="text-[14px] font-[400] flex items-center gap-[7px]"> <VisaIcon /> <p> Visa </p></p>,
    date: <p className="text-[14px] font-[400]"> 16.12.2018, 14:21 </p>,
    date2: <span className="w-[80px] h-[25px] rounded-[5px] border-[1px]
     flex justify-center items-center cursor-pointer " >
      <p className="text-[14px] font-[400]"> Details </p>
    </span>
  },

]

export const invoiceTableColumns = [
  {
    accessor: "id",
    Header: <span className="select-none " >#</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "image",
    Header: <span className="select-none " >Image</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "item",
    Header: <span className="select-none " >Item</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "description",
    Header: <span className="select-none " >Description</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "quantity",
    Header: <span className="select-none " >Quantity</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "unicost",
    Header: <span className="select-none " >Uni-Const</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "total",
    Header: <span className="select-none " >Total</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
]

export const invoiceTableData = [
  {
    id: <p className="text-[14px] font-[400]"> 1 </p>,
    image: <Image alt="product image" src={smartWatch} />,
    item: <p className="text-[14px] font-[400]"> Digital Watch </p>,
    description: <p className="text-[14px] font-[400]"> Amazing Watch with 10 days replacement warranty </p>,
    quantity: <p className="text-[14px] font-[400]"> 4 </p>,
    unicost: <p className="text-[14px] font-[400]"> $50.00 </p>,
    total: <p className="text-[14px] font-[400]"> $200.00 </p>,

  },
  {
    id: <p className="text-[14px] font-[400]"> 2</p>,
    image: <Image alt="product image" src={smartWatch} />,
    item: <p className="text-[14px] font-[400]"> Digital Watch </p>,
    description: <p className="text-[14px] font-[400]"> Amazing Watch with 10 days replacement warranty </p>,
    quantity: <p className="text-[14px] font-[400]"> 4 </p>,
    unicost: <p className="text-[14px] font-[400]"> $50.00 </p>,
    total: <p className="text-[14px] font-[400]"> $200.00 </p>,

  },
  {
    id: <p className="text-[14px] font-[400]"> 3 </p>,
    image: <Image alt="product image" src={smartWatch} />,
    item: <p className="text-[14px] font-[400]"> Digital Watch </p>,
    description: <p className="text-[14px] font-[400]"> Amazing Watch with 10 days replacement warranty </p>,
    quantity: <p className="text-[14px] font-[400]"> 4 </p>,
    unicost: <p className="text-[14px] font-[400]"> $50.00 </p>,
    total: <p className="text-[14px] font-[400]"> $200.00 </p>,

  },
  {
    id: <p className="text-[14px] font-[400]"> 4 </p>,
    image: <Image alt="product image" src={smartWatch} />,
    item: <p className="text-[14px] font-[400]"> Digital Watch </p>,
    description: <p className="text-[14px] font-[400]"> Amazing Watch with 10 days replacement warranty </p>,
    quantity: <p className="text-[14px] font-[400]"> 4 </p>,
    unicost: <p className="text-[14px] font-[400]"> $50.00 </p>,
    total: <p className="text-[14px] font-[400]"> $200.00 </p>,

  },
  {
    id: <p className="text-[14px] font-[400]"> 5 </p>,
    image: <Image alt="product image" src={smartWatch} />,
    item: <p className="text-[14px] font-[400]"> Digital Watch </p>,
    description: <p className="text-[14px] font-[400]"> Amazing Watch with 10 days replacement warranty </p>,
    quantity: <p className="text-[14px] font-[400]"> 4 </p>,
    unicost: <p className="text-[14px] font-[400]"> $50.00 </p>,
    total: <p className="text-[14px] font-[400]"> $200.00 </p>,

  },

]

export const recentOrdersTableColumns = [
  {
    accessor: "orderid",
    Header: <span className="select-none " >Order Id</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "productname",
    Header: <span className="select-none " >Product Name</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "units",
    Header: <span className="select-none " >Units</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "orderdate",
    Header: <span className="select-none " >Order Date</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "ordercost",
    Header: <span className="select-none " >Order Cost</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "status",
    Header: <span className="select-none " >Status</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "action",
    Header: <span className="select-none " >Action</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
]

export const recentOrdersTableData = [

  {
    orderid: <p className="text-[14px] font-[400]"> 24541 </p>,
    productname: " Coach Swagger ",
    units: <p className="text-[14px] font-[400]"> 1 Units </p>,
    orderdate: <p className="text-[14px] font-[400]"> Oct 20, 2018 </p>,
    ordercost: <p className="text-[14px] font-[400]"> $230 </p>,
    status: <StatusBadge status="delivered" />,
    action: <p className="text-[14px] font-[400]"> <Dots3Icon /> </p>,

  },
  {
    orderid: <p className="text-[14px] font-[400]"> 24541 </p>,
    productname: " Coach Swagger ",
    units: <p className="text-[14px] font-[400]"> 1 Units </p>,
    orderdate: <p className="text-[14px] font-[400]"> Oct 20, 2018 </p>,
    ordercost: <p className="text-[14px] font-[400]"> $230 </p>,
    status: <StatusBadge status="delivered" />,
    action: <p className="text-[14px] font-[400]"> <Dots3Icon /> </p>,

  },
  {
    orderid: <p className="text-[14px] font-[400]"> 24541 </p>,
    productname: " Coach Swagger ",
    units: <p className="text-[14px] font-[400]"> 1 Units </p>,
    orderdate: <p className="text-[14px] font-[400]"> Oct 20, 2018 </p>,
    ordercost: <p className="text-[14px] font-[400]"> $230 </p>,
    status: <StatusBadge status="delivered" />,
    action: <p className="text-[14px] font-[400]"> <Dots3Icon /> </p>,

  },
  {
    orderid: <p className="text-[14px] font-[400]"> 24541 </p>,
    productname: " Coach Swagger ",
    units: <p className="text-[14px] font-[400]"> 1 Units </p>,
    orderdate: <p className="text-[14px] font-[400]"> Oct 20, 2018 </p>,
    ordercost: <p className="text-[14px] font-[400]"> $230 </p>,
    status: <StatusBadge status="delivered" />,
    action: <p className="text-[14px] font-[400]"> <Dots3Icon /> </p>,

  },
  {
    orderid: <p className="text-[14px] font-[400]"> 22 </p>,
    productname: "  kali swagger  ",
    units: <p className="text-[14px] font-[400]"> 1 Units </p>,
    orderdate: <p className="text-[14px] font-[400]"> Oct 20, 2018 </p>,
    ordercost: <p className="text-[14px] font-[400]"> $230 </p>,
    status: <StatusBadge status="delivered" />,
    action: <p className="text-[14px] font-[400]"> <Dots3Icon /> </p>,

  },
  {
    orderid: <p className="text-[14px] font-[400]"> 24541 </p>,
    productname: " Coach Swagger ",
    units: <p className="text-[14px] font-[400]"> 1 Units </p>,
    orderdate: <p className="text-[14px] font-[400]"> Oct 20, 2018 </p>,
    ordercost: <p className="text-[14px] font-[400]"> $230 </p>,
    status: <StatusBadge status="delivered" />,
    action: <p className="text-[14px] font-[400]"> <Dots3Icon /> </p>,

  },

]

export const productListTableColumns = [
  {
    selector: row => row.product,
    name: "Product",
    cell: (row) => <span className='w-11 aspect-square my-2 rounded-lg overflow-hidden' >
      <Image className='w-full h-full object-cover' width={250} height={250} alt={row.name.en} src={row.product} />
    </span>,
    sortable: true,
    width: '9%'
  },
  {
    selector: row => row.name.en,
    cell: row => <div className="w-full group relative flex flex-col items-start justify-center">
      <span className='w-full whitespace-nowrap truncate cursor-default'>
        <Infotip>{row.name.en}</Infotip>
        {row.name.en}
      </span>
      <span className="text-xs">{row.price}د.إ</span>
    </div>,
    name: "Name",
    sortable: true,
    width: '25%'
  },
  // {
  //   selector: row => row.price,
  //   name: "Price",
  //   cell: (row) => `${row.price}د.إ`,
  //   sortable: true,
  // },
  // {
  //   selector: row => row.offer,
  //   name: "Offer",
  //   cell: (row) => `${row.offer}% off`,
  //   sortable: true,
  // },
  {
    selector: row => row.purchased,
    name: "Purchased",
    sortable: true,
  },
  {
    selector: row => row.stock,
    name: "Stock",
    sortable: true,
  },
  {
    selector: row => row.status,
    name: "Status",
    sortable: true,
  },
  {
    selector: row => row.date,
    cell: row => <div className="w-full group relative flex justify-start">
      <span className='w-full whitespace-nowrap truncate cursor-default'>
        {row.date}
      </span>
      <Infotip positions="w-auto whitespace-nowrap right-5 -bottom-full">Created At: {row.date} <br /> Updated At: {row.updatedAt}</Infotip>
    </div>,
    name: "Date",
    sortable: true,
  },
  {
    selector: row => row.actions,
    name: "Action",
    cell: (row) => <ActionButton infoLink={row.infoLink} handleInfo={row.handleInfo} options={row.actions} />
  }
]

export const productCategoriesTableColumns = [
  {
    selector: row => row.id,
    name: <span className="text-[15px]" >ID</span>,
    cell: (row) => {
      const value = row.id
      return <div className="w-full group relative flex justify-start">
        <span className='w-full whitespace-nowrap truncate overflow-hidden cursor-default'>
          {value}
          <Infotip>{value}</Infotip>
        </span>
      </div>
    },
    sortable: true,
    width: "22%"
  },
  {
    selector: row => row.name.en,
    name: <span className="select-none text-[15px]">Name</span>,
    sortable: true,
    width: "16%"
  },
  {
    selector: row => row.description.en,
    name: <span className="select-none text-[15px]" >Description</span>,
    sortable: true,
    width: "31%"
  },
  {
    selector: row => row.slug,
    name: <span className="select-none text-[15px]" >Slug</span>,
    sortable: true,
    width: "18%"
  },
  {
    selector: row => row.action,
    name: <span className="select-none text-[15px]" >Action</span>,
    cell: (row) => <MenuButton options={row.actions} />,
    sortable: true,
    width: "8%"
  }
]

export const couponsTableColumns = [
  {
    selector: row => row.id,
    name: <span className="text-[15px]">ID</span>,
    cell: (row) => {
      const { id } = row
      return <div className="w-full group relative flex justify-start">
        <span className='w-full whitespace-nowrap truncate overflow-hidden cursor-default'>
          {id}
          <Infotip>{id}</Infotip>
        </span>
      </div>
    },
    sortable: true,
    width: "26%"
  },
  {
    selector: row => row.name,
    name: <span className="select-none text-[15px]">Name</span>,
    sortable: true,
    width: "18%"
  },
  {
    selector: row => row.coupon_value,
    name: <span className="select-none text-[15px]">Worth (د.إ)</span>,
    sortable: true,
    width: "14%"
  },
  {
    selector: row => row.createdAt,
    name: <span className="select-none text-[15px]" >Created at</span>,
    cell: (row) => {
      const date = new Date(row.createdAt)
      return <span className='w-full whitespace-nowrap truncate cursor-default'>
        {date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()}
      </span>
    },
    sortable: true,
    width: "13%"
  },
  {
    selector: row => row.expiration_date,
    name: <span className="select-none text-[15px]" >Expires at</span>,
    cell: (row) => {
      if (!row.expiration_date) return "N/A"
      const date = new Date(row.expiration_date)
      return <span className='w-full whitespace-nowrap truncate cursor-default'>
        {date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()}
      </span>
    },
    sortable: true,
    width: "13%"
  },
  {
    selector: row => row.actions,
    name: <span className="select-none text-[15px]" >Actions</span>,
    cell: (row) => <MenuButton options={row.actions} />,
    sortable: true,
    width: "8%"
  }
]