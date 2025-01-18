"use client";

import React, { useState } from "react";
import { useExpenseByUserId } from "@/app/users/getExpenses/GetExpensesByUserId";
import { useParams } from "next/navigation";
import { useExpenseData } from "@/app/users/getExpenses/GetExpenses";
import Detials from "../Detials";
import ExpenseDetail from "../ExpenseDetial";
import LentFriend from "../LentFriend";
import PaidFriendAndYou from "@/app/users/allExpenses/PaidFriendAndYou";
import { User } from "@prisma/client";
import useUserStore from "@/stores/friendName";
import { useGetAllFriends } from "../../allFriends/getAllFriends";

const TransactionList = () => {
    const router = useParams();
    const userId = router.userId;
    const {  setfriendName,friendName} = useUserStore();

    const [selectedId, setSelectedId] = useState<string | null>(null); // Track selected expense ID
    const [filteredExpense, setFilteredExpense] = useState<any[]>([]);

    const { expensesByUserId, isLoading, isError } = useExpenseByUserId(userId);
    const { expenses } = useExpenseData();
    const {allVerifiedFriends}=useGetAllFriends()

    // const uu = allVerifiedFriends.filter((hh: any) => hh.id === userId)
console.log("uu",allVerifiedFriends)
    // Conditional rendering
    if (!userId) return <p>Please provide a valid user ID.</p>;
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Failed to load expenses.</p>;
    if (!expensesByUserId || !expensesByUserId.length) {
        const uu = allVerifiedFriends.filter((hh: any) => hh.id === userId)
        setfriendName(uu[0].name)
         return <p>no expanse found</p>
    }else{
        const useName = expensesByUserId[0]?.involvePeopleOncharch.filter((user: any) => user.id === userId)
         setfriendName(useName[0].name)
    }
    // const useName = expensesByUserId[0]?.involvePeopleOncharch.filter((user:any)=>user.id===userId)
    // const uu=allVerifiedFriends.filter((hh:any)=>hh.id===userId)
   
    // setfriendName(!expensesByUserId ? uu.name:useName[0].name)
    // Format date
    const formatDate = (date: any) => {
        const dat = new Date(date);
        return dat.toLocaleString("default", { month: "short", day: "numeric" });
    };

    // Handle click and filter
    const handleFilteredExpenses = (id: string) => {
        if (selectedId === id) {
            // Close the details if clicked again
            setSelectedId(null);
            setFilteredExpense([]);
        } else {
            const filtered = (expenses || []).filter((expense: any) => expense.id === id);
            setSelectedId(id);
            setFilteredExpense(filtered);
        }
    };

    return (
        <>
            {expensesByUserId.map((transaction: any) => {
                const paidUser = transaction.paidByIds?.[0]

               return <div
                    onClick={() => handleFilteredExpenses(transaction.id)}
                     
                    key={transaction.id} className="bg-gray-100 p-2 space-y-4 cursor-pointer">
                        <div 
                       className=" flex items-center bg-white shadow-md cursor-pointer rounded-lg  border text-sm font-normal sm:gap-2 sm:text-sm sm:font-thin"

                        >
                       <Detials
                           formateDate={formatDate(transaction.createdAt)}
                           transactionDescription={transaction.description}
                           transactionMonth={transaction.month}
                           transactionamount={transaction.amount}
                           userId={userId}
                       />
                       <div className="ml-4 flex-1 flex gap-10">
                           {userId === transaction.paidBy[0].id ?
                               <PaidFriendAndYou
                                   paidUserName={transaction.paidBy[0].name}
                                   amount={transaction.amount}
                                   lentAmount={transaction.giveTakeAmount[0].toGiveAmount}
                                   text={` lent you`}
                                   style={"style"}


                               /> : <PaidFriendAndYou
                                   paidUserName={"you"}
                                   amount={transaction.amount}
                                   text={"Lent"}
                                   lentAmount={transaction.giveTakeAmount[0].toGiveAmount}
                                   giverUserName={transaction.giveTakeAmount[0].giverUser.name}
                               />
                           }


                       </div>
                        </div>
                  

                    {/* Conditional rendering of ExpenseDetail */}
                    {selectedId === transaction.id && <ExpenseDetail expenseDetial={filteredExpense} />}
                </div>
})}
        </>
    );
};

export default TransactionList;
