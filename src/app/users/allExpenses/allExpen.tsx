"use client";

import React, { useState } from "react";

import { useExpenseData } from "@/app/users/getExpenses/GetExpenses";
import ExpenseDetail from "../friends/SingleFriendsExpenses/ExpenseDetial";
import Detials from "../friends/SingleFriendsExpenses/Detials";
import { getLoginUser } from "@/app/lib/getCurrentUser";
import { User } from "@prisma/client";
interface AllExpenProps{
    currentUser:User
}
const AllExpen:React.FC<AllExpenProps> = ({currentUser}) => {


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
            {expenses.map((transaction: any) => (
                <div
                    onClick={() => handleFilteredExpenses(transaction.id)}
                    key={transaction.id} className="bg-gray-100 p-2 space-y-4 cursor-pointer">
                    <Detials
                        formateDate={formatDate(transaction.createdAt)}
                        transactionDescription={transaction.description}
                        transactionMonth={transaction.month}
                        transactionamount={transaction.amount}
                        transactiongiveTakeAmount={transaction.giveTakeAmount}
                        userId={userId}
                        transactionpaidBy={transaction.paidBy}
                    />



                    {/* Conditional rendering of ExpenseDetail */}
                    {selectedId === transaction.id && <ExpenseDetail expenseDetial={filteredExpense} />}
                </div>
            ))}
        </>
    );
};

export default AllExpen;
