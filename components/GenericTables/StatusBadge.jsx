const StatusBadge = ({ status }) => {
  return (
    <div className={`flex items-center justify-center w-[90px] h-[25px]
     rounded-[25px] text-[11px] text-white font-[400] 
    ${status == "ready" ? "bg-[#FFD33C]" :
        status == "pending" ? "bg-[#B9BBC1]" :
          status == "delivered" ? "bg-[#65E4A1]" :
            status == "ontheway" ? "bg-[#ACCCF8]" :
              status == "return" ? "bg-[#FFD33C]" :
                ""}
    
    `} >
      {status == "ready" ? "Ready to Ship" :
        status == "pending" ? "Pending" :
          status == "delivered" ? "Delivered" :
            status == "ontheway" ? "On The Way" :
              status == "return" ? "Return" :
                status}
    </div>
  )
}

export default StatusBadge