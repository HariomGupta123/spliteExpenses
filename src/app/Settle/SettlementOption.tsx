import React, { useState } from 'react'
import Button from '../componets/Button/Button'
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import profile from "../../../public/cardphoto.jpeg"
import { FaArrowRight } from "react-icons/fa";

const SettlementOption = () => {
    const [isOpenPayment, setOpenPayment] = useState(false)
    const date = new Date()
    return (
        <div>
            <div className="mt-8 p-5">
                <div className='flex justify-center items-center gap-10'>
                    <div>
                        <Avatar>
                            <AvatarImage src={profile.src} alt="/profile" />
                        </Avatar>
                    </div>
                    <div>
                        <FaArrowRight size={24} color="black" />
                    </div>
                    <div>
                        <Avatar>
                            <AvatarImage src={profile.src} alt="/profile" />
                        </Avatar>
                    </div>

                </div>

            </div>
            <div className='flex justify-center items-center mt-2 gap-5'>
                <span className='text-sm font-thin  bg-gray-100 hover:bg-gray-200 rounded-xl   px-2 border-dashed border-2 border-orange-300 cursor-pointer' >you</span>
                <span>paid</span>
                <span className='text-sm font-thin  bg-gray-100 hover:bg-gray-200 rounded-xl  px-2 border-dashed border-2 border-orange-300 cursor-pointer'>hariom</span>

            </div>
            <div className="flex flex-col justify-center items-center space-y-2 mt-2 ">
                <span>$400</span>
                <hr className="border-gray-300 border-dashed w-20" />
            </div>

            <div className="flex justify-center items-center gap-5 mt-4">
                <div
                    className="text-center text-sm font-thin w-52 rounded-3xl border-orange-100 border-2 px-2 bg-gray-100 hover:bg-gray-200 cursor-pointer tracking-wide"
                >
                    {date.toLocaleDateString()}
                </div>
                <div
                    className="text-center text-sm font-thin w-52 rounded-3xl border-orange-100 border-2 px-2 bg-gray-100 hover:bg-gray-200 cursor-pointer tracking-wide"
                >
                    Add note/imags
                </div>
            </div>

        </div>
    )
}

export default SettlementOption
