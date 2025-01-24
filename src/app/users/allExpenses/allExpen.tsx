"use client";

import React, { useState } from "react";

import { useExpenseData } from "@/app/users/getExpenses/GetExpenses";
import ExpenseDetail from "../friends/SingleFriendsExpenses/ExpenseDetial";
import Detials from "../friends/SingleFriendsExpenses/Detials";
import PaidFriendAndYou from "./PaidFriendAndYou";
import MiddleInformation from "../component/MiddleInformation";
import { User } from "@/app/type/type";
interface AllExpenProps {
    currentUser: User
    // users?: User[] | null | undefined;
    
}
const AllExpen: React.FC<AllExpenProps> = ({ currentUser}) => {


    const [selectedId, setSelectedId] = useState<string | null>(null); // Track selected expense ID
    const [filteredExpense, setFilteredExpense] = useState<any[]>([]);

    const { expenses, isError, isLoading } = useExpenseData();

    // Conditional rendering
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Failed to load expenses.</p>;
    if (!expenses || !expenses.length) return <p>No expenses found.</p>;

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
    const userId = currentUser.id
    console.log("current", userId)


    return (
        <>
        <MiddleInformation titleText="AllExpenses"  currentUser={currentUser} />
            {expenses.map((transaction: any) => {
                const paidUser = transaction.paidByIds?.[0]
                const hhh = transaction.giveTakeAmount.filter((hh: any) => hh.giverId === currentUser.id)
                console.log("hhh", hhh)
                const involvePeopleLenght = transaction.involvePeopleOncharch.length
                console.log("lenght",involvePeopleLenght)
                return <div
                    onClick={() => handleFilteredExpenses(transaction.id)}
                    key={transaction.id}
                >
                    <div
                        className=" flex items-center bg-white shadow-md cursor-pointer rounded-lg  border text-sm font-normal sm:gap-2"
 
                    >
                        <Detials
                            formateDate={formatDate(transaction.createdAt)}
                            transactionDescription={transaction.description}
                            transactionMonth={transaction.month}
                            transactionamount={transaction.amount}
                            userId={userId}
                        />
                        {
                           ( paidUser === currentUser.id ) ? (
                                <PaidFriendAndYou

                                    paidUserName={"you"}
                                    amount={transaction.amount}
                                    lentAmount={transaction.getBackAmount}
                                    text={"Lent"}
                                /> 

                              
                            ) :
                                hhh && <PaidFriendAndYou
                                    paidUserName={hhh[0].receiverUser?.name}
                                    text={"Lent"}
                                    amount={transaction.amount}
                                    lentAmount={hhh[0].
                                        toGiveAmount
                                   }
                                    style={"text"}

                                    lentYou={"You"}

                                />

                        }
                    </div>
                   

                    {/* Conditional rendering of ExpenseDetail */}
                    {selectedId === transaction.id && (
                        <ExpenseDetail expenseDetial={filteredExpense} />
                    )}
                </div>
            })}
        </>
    );
};

export default AllExpen;
