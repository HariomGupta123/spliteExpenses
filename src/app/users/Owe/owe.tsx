"use client"
import React, { FC, useEffect, useState } from "react";
import { AiOutlineUnorderedList, AiOutlineBarChart } from "react-icons/ai";
import YouOwe from "./youOwe";
import OwedYou from "./owedYou";
import GraphOwedYou from "./Graph/graphOwedYou";
import GraphYouOwn from "./Graph/graphYouOwe";
import { useExpenseData } from "../getExpenses/GetExpenses";
import { filterTransactions } from "@/app/filterTransactions/FilterTransactions";
import useStore from "@/stores/totalReceiveAmount";
import { User } from "@prisma/client";
import useToGiveAmount from "@/stores/totalGiveAmount";

interface OweProps {
    currentUser: User | null;
}

const Owe: React.FC<OweProps> = ({ currentUser }) => {
    const { numbers, sum, addNumbers } = useStore();
    const {addToGiveAmount,arrayNumbers,sumOfGiveAmount}=useToGiveAmount()
   
    const [oweList, setOweList] = useState("LIST");

    const { expenses, isError, isLoading } = useExpenseData();

    
       
            const giveTakeAmountss = expenses?.flatMap((expense: any) => expense.giveTakeAmount);
            const { outgoing,incoming } = filterTransactions(giveTakeAmountss, currentUser?.id);
           
            const hh = outgoing.map((item: any) => item.toGiveAmount);
            const ins=incoming.map((item:any)=>item.toGiveAmount);
            addToGiveAmount(ins);
            addNumbers(hh);
     
    

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data</div>;

    return (
        <>
            {/* Top Bar */}
            <div className="flex flex-wrap justify-between items-center mt-5 gap-2">
                <div className="text-lg font-semibold">You Owe</div>
                <div className="flex text-sm font-medium gap-0 border rounded-md overflow-hidden w-full sm:w-[250px]">
                    {/* List Icon */}
                    <div
                        className={`flex items-center gap-2 px-3  w-1/2 cursor-pointer font-normal ${oweList === "LIST" ? "bg-gray-700 text-white" : "bg-zinc-50 hover:bg-gray-100"
                            }`}
                        onClick={() => setOweList("LIST")}
                    >
                        <AiOutlineUnorderedList size={24} />
                        <span>View List</span>
                    </div>

                    {/* Graph Icon */}
                    <div
                        className={`flex items-center gap-2 px-3  w-1/2 cursor-pointer ${oweList === "GRAPH" ? "bg-gray-700 text-white" : "bg-zinc-50 hover:bg-gray-100"
                            }`}
                        onClick={() => setOweList("GRAPH")}
                    >
                        <AiOutlineBarChart size={24} />
                        <span>View Chart</span>
                    </div>
                </div>
                <div className="text-lg font-semibold">You Are Owed</div>
            </div>

            {oweList === "LIST" ? (
                <div className="flex flex-col md:flex-row items-start gap-4 mt-5">
                    <div className="flex-1 w-full md:w-auto">
                        <YouOwe outGoing={outgoing} />
                    </div>

                    <div className="hidden md:block border-l border-gray-300 h-[300px] mx-4" />

                    <div className="flex-1 w-full md:w-auto">
                        <OwedYou incoming={incoming} />
                    </div>
                </div>
            ) : (
                <div className="flex flex-col md:flex-row items-start gap-4 mt-5">
                    <div className="flex-1 w-full md:w-auto">
                        <GraphOwedYou />
                    </div>

                    <div className="hidden md:block border-l border-gray-300 h-[300px] mx-4" />

                    <div className="flex-1 w-full md:w-auto">
                        <GraphYouOwn />
                    </div>
                </div>
            )}
        </>
    );
};

export default Owe;
