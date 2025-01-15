"use client"
import { useExpenseData } from '@/app/users/getExpenses/GetExpenses'
import { User } from '@prisma/client'
import React from 'react'
interface LentFriendProps {
    paidBy: User[] | User | any
    userId: string | undefined | any
    amount: number | any
    receiverId:string | any
    receiverUserName:string | any
    giverUserName: string |any
    toGiveAmount:number
}
const LentFriend: React.FC<LentFriendProps> = ({ paidBy, userId, amount,giverUserName,receiverId,toGiveAmount,receiverUserName }) => {
    // const {expenses,isError,isLoading}=useExpenseData()
    // console.log("lentFrieds",expenses)
    // const paidUser = lentFriend.filter((paid: any) => paid.id === userId)
    // console.log("lentFriend", lentFriend)
    return (
        <>
          
               <div  className='text-sm font-medium flex gap-8' >
                    {receiverId === userId ? (<>
                        <div className=''>
                            <div><span>{receiverUserName}paid</span></div>
                            <div><span className='text-red-900 font-semibold '>{amount}</span>
                            </div>

                        </div>

                        <div className=''>
                            <div><span> {receiverUserName} lent you</span></div>
                            <div><span className='text-red-900 font-semibold '>{toGiveAmount}</span></div>
                        </div></>)
                        : (<> <div className=''>
                            <div><span>You paid </span></div>
                            <div><span className='text-black font-bold '>{amount}</span></div>

                        </div>

                            <div className=''>
                                <div><span>you lent {giverUserName} </span></div>
                                <div><span className='text-green-300 font-semibold '>{toGiveAmount}</span></div>
                            </div></>)}


                </div >)
         
        </>
    )
}

export default LentFriend
