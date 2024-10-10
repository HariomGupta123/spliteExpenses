"use client"
import React, { useState } from 'react'
import AddExpense from './AddExpense'
import { User } from '@prisma/client'
interface MiddleInformationProps{
    users:User[] | null | undefined
}
const MiddleInformation:React.FC<MiddleInformationProps> = ({users}) => {
    const [isOpen,setIsOpen]=useState(false)
    return (
        <>
        <AddExpense  isOpen={isOpen} onClose={()=>setIsOpen(false)} users={users} />
            <aside className='w-full text-white'>
                <div className='bg-slate-400 h-14 w-full flex justify-between items-center px-5'>
                    <div className='font-bold text-2xl'>DashBoard</div>
                    <div className='flex justify-center items-center  gap-5 text-center '>
                        <div className='bg-red-500 h-10 rounded-lg  py-2  px-4 text-center cursor-pointer hover:bg-red-400 font-medium' onClick={()=>setIsOpen(true)}> Add An Expenses</div>
                        <div className='bg-orange-600 h-10 rounded-lg py-2 px-4 hover:bg-orange-400 font-medium'> Settle Up</div>
                    </div>

                </div>
                <div className=' flex-grow  border-t-[1px] border-b-[1px] h-14 bg-slate-400  '>
                    <div className='h-full py-2 flex justify-center items-center gap-10 font-medium'>
                        <span className=' text-center font-medium'>Total Balance - $6544.55</span>
                        <span className=' border-r-[1px] h-full' />
                        <span className=' text-center font-medium'> You Owe 655.44</span>
                        <span className=' border-r-[1px] h-full' />
                        <span className='font-medium'> You Are Owed 888.4</span>
                    </div>
                </div>
            </aside>
        </>
    )
}

export default MiddleInformation
