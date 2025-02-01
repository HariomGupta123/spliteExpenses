"use client";
import React, { useState } from "react";
import AddExpense from "./AddExpense";

import { useGetAllFriends } from "../friends/allFriends/getAllFriends";
import useUserStore from "@/stores/friendName";
import Settle from "@/app/Settle/Settle";
import { User } from "@/app/type/type";
import useToGiveAmount from "@/stores/totalGiveAmount";
import useStore from "@/stores/totalReceiveAmount";

interface MiddleInformationProps {
    titleText?: string | null
    users?: User[] | null | undefined;
    currentUser: User
}

const MiddleInformation: React.FC<MiddleInformationProps> = ({
    titleText,
    users,
    currentUser,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [openSettle, setOpenSettle] = useState(false)
    const {sumOfGiveAmount}=useToGiveAmount()
    const {sum}=useStore()
    const { allVerifiedFriends } = useGetAllFriends()
    // const FriendName = sessionStorage.getItem("FriendName")
    const { friendName } = useUserStore()
    // console.log("userName",userName)

    return (
        <>
            {/* Modal for Adding Expense */}
            <AddExpense
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                users={allVerifiedFriends}
                currentUser={currentUser}
            />
            <Settle isOpen={openSettle} onClose={() => setOpenSettle(false)} />
            <aside className="w-full text-white">
                {/* Header Section */}
                <div className="bg-slate-400 h-auto w-full flex flex-col sm:flex-row justify-between items-center px-5 py-3 space-y-2 sm:space-y-0 sm:py-1">
                    {/* Title Section */}
                    <div className="font-semibold text-lg h-4 sm:text-xl text-center sm:text-left break-words w-full sm:w-auto">
                        {titleText === "FriendName" ? friendName : titleText}
                    </div>

                    {/* Buttons Section */}
                    <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-5 w-full sm:w-auto">
                        {/* Add Expense Button */}
                        <div
                            className="
    bg-red-500 
    h-8
    w-[150px]
    sm:w-auto 
    sm:h-8 
    sm:rounded-lg
    rounded-full
    py-1 
    sm:py-1 
    px-4 
    text-center 
    cursor-pointer 
    hover:bg-red-400 
    font-light 
    text-base 
    sm:order-none 
    order-2 
    mt-auto 
    sm:relative 
    fixed 
    bottom-20 
    right-5
    sm:bottom-auto 
    sm:right-auto"
                            onClick={() => setIsOpen(true)}
                        >
                            Add Expense
                        </div>


                        {/* Settle Up Button */}
                        <div
                            className="bg-orange-600 h-10 w-full sm:w-auto sm:h-8 rounded-lg py-2 sm:py-1 px-4 text-center cursor-pointer hover:bg-orange-400 font-light text-base hidden sm:block"
                            onClick={() => setOpenSettle(true)}
                        >
                            Settle Up
                        </div>
                    </div>
                </div>



                {/* Summary Section */}
                <div className="border-t border-b bg-slate-400 py-1 px-2 sm:px-1">
                    <div className="flex flex-row flex-wrap justify-center sm:justify-between items-center gap-2 sm:gap-10 font-medium text-sm sm:text-base">
                        {/* Total Balance */}
                        <span className="text-center">
                            Total Balance - <strong>$6544.55</strong>
                        </span>

                        {/* Vertical Divider */}
                        <span className="border-r h-6" />

                        {/* You Owe */}
                        <span className="text-center">
                            You Owe <strong>${sum.toFixed(2)}</strong>
                        </span>

                        {/* Vertical Divider */}
                        <span className="border-r h-6" />

                        {/* You Are Owed */}
                        <span className="text-center">
                            You Are Owed <strong>${sumOfGiveAmount.toFixed(2)}</strong>
                        </span>
                    </div>
                </div>


            </aside>
        </>
    );
};

export default MiddleInformation;
