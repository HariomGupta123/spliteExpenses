import React from 'react'
import LentFriend from './LentFriend'
interface DetialsProps {
    formateDate: any
    transactionDescription: any
    transactionMonth: any
    transactionamount: any
   
    userId: any
   
}
const Detials: React.FC<DetialsProps> = ({ formateDate, transactionDescription, transactionMonth, userId, transactionamount }) => {
    return (
        <div>
            <div
                className="flex items-center bg-white  p-1  text-sm font-normal sm:gap-2 sm:text-sm sm:font-thin"
            >
                <div className="flex-shrink-0 text-center w-16">
                    <div className="text-xs font-extralight text-gray-800">
                        {formateDate}
                    </div>
                    <div className="text-xs text-gray-400">{transactionMonth}</div>
                </div>
                <span className="border bg-slate-300 rounded-md w-[40px] h-[40px]"></span>
                <div className="font-normal text-gray-800 sm:text-sm sm:font-thin">{transactionDescription}</div>
                <div className="ml-4 flex-1 flex gap-10">
                  
                </div>
            </div>
        </div>
    )
}

export default Detials
