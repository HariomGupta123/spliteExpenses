import React from 'react'
import LentFriend from './LentFriend'
interface DetialsProps {
    formateDate: any
    transactionDescription: any
    transactionMonth: any
    transactionamount: any
    transactiongiveTakeAmount: any
    userId: any
    transactionpaidBy: any
}
const Detials: React.FC<DetialsProps> = ({ formateDate, transactionDescription, transactionMonth, userId, transactionamount, transactiongiveTakeAmount, transactionpaidBy }) => {
    return (
        <div>
            <div
                className="flex items-center bg-white shadow-sm rounded-lg p-2 border text-sm font-normal gap-4"
            >
                <div className="flex-shrink-0 text-center w-16">
                    <div className="text-xs font-extralight text-gray-800">
                        {formateDate}
                    </div>
                    <div className="text-xs text-gray-400">{transactionMonth}</div>
                </div>
                <span className="border bg-slate-300 rounded-md w-[40px] h-[40px]"></span>
                <div className="font-normal text-gray-800">{transactionDescription}</div>
                <div className="ml-4 flex-1 flex gap-10">
                    <LentFriend
                        lentFriend={transactiongiveTakeAmount}
                        paidBy={transactionpaidBy}
                        userId={userId}
                        amount={transactionamount}
                    />
                </div>
            </div>
        </div>
    )
}

export default Detials
