"use client"
import { useExpenseData } from '@/app/users/getExpenses/GetExpenses'
import { User } from '@prisma/client'
import React from 'react'
interface LentFriendProps {
    lentFriend: any,
    paidBy: User[] | User | any
    userId: string | undefined | any
    amount: number | any
}
const LentFriend: React.FC<LentFriendProps> = ({ lentFriend, paidBy, userId, amount }) => {
    // const {expenses,isError,isLoading}=useExpenseData()
    // console.log("lentFrieds",expenses)
    const paidUser = lentFriend.filter((paid: any) => paid.id === userId)
    console.log("lentFriend", lentFriend)
    return (
        <>
            {lentFriend.map((lent: any, index: number) => {
                console.log("reciverId", lent.
                    receiverId)
                return (<div key={index} className='text-sm font-medium flex gap-8' >
                    {lent.receiverId === userId ? (<> <div className=''>
                        <div><span>{lent.receiverUser.name}paid</span></div>
                        <div><span className='text-red-900 font-semibold '>{amount}</span></div>

                    </div>

                        <div className=''>
                            <div><span> {lent.receiverUser.name} lent you</span></div>
                            <div><span className='text-red-900 font-semibold '>{lent.toGiveAmount}</span></div>
                        </div></>) : (<> <div className=''>
                            <div><span>You paid </span></div>
                            <div><span className='text-black font-bold '>{amount}</span></div>

                        </div>

                            <div className=''>
                                <div><span>you lent {lent.giverUser.name} </span></div>
                                <div><span className='text-green-300 font-semibold '>{lent.toGiveAmount}</span></div>
                            </div></>)}


                </div >)
            })}
        </>
    )
}

export default LentFriend
