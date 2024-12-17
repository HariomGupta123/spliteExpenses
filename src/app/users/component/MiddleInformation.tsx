"use client";
import React, { useState } from "react";
import AddExpense from "./AddExpense";
import { User } from "@prisma/client";

interface MiddleInformationProps {
    users: User[] | null | undefined;
    currentUser: User | null;
}

const MiddleInformation: React.FC<MiddleInformationProps> = ({
    users,
    currentUser,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Modal for Adding Expense */}
            <AddExpense
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                users={users}
                currentUser={currentUser}
            />
            <aside className="w-full text-white">
                {/* Header Section */}
                <div className="bg-slate-400 h-14 w-full flex flex-col sm:flex-row justify-between items-center px-5 py-2 sm:py-0">
                    <div className="font-bold text-2xl text-center sm:text-left">
                        DashBoard
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-5 mt-2 sm:mt-0">
                        <div
                            className="bg-red-500 h-10 rounded-lg py-2 px-4 text-center cursor-pointer hover:bg-red-400 font-medium"
                            onClick={() => setIsOpen(true)}
                        >
                            Add An Expense
                        </div>
                        <div className="bg-orange-600 h-10 rounded-lg py-2 px-4 text-center cursor-pointer hover:bg-orange-400 font-medium">
                            Settle Up
                        </div>
                    </div>
                </div>

                {/* Summary Section */}
                <div className="flex-grow border-t border-b bg-slate-400 py-4 px-5">
                    <div className="flex flex-wrap justify-center sm:justify-between items-center gap-4 sm:gap-10 font-medium text-sm sm:text-base">
                        <span className="text-center">
                            Total Balance - <strong>$6544.55</strong>
                        </span>
                        <span className="hidden sm:block border-r h-full" />
                        <span className="text-center">
                            You Owe <strong>$655.44</strong>
                        </span>
                        <span className="hidden sm:block border-r h-full" />
                        <span className="text-center">
                            You Are Owed <strong>$888.40</strong>
                        </span>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default MiddleInformation;
