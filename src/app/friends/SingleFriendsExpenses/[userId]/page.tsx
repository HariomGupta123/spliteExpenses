"use client";

import React, { useState } from "react";
import LentFriend from "../LentFriend";
import { useExpenseByUserId } from "@/app/users/getExpenses/GetExpensesByUserId";
import { useParams } from "next/navigation";
import ExpenseDetail from "../ExpenseDetials";
import { useExpenseData } from "@/app/users/getExpenses/GetExpenses";

const TransactionList = () => {
    const router = useParams();
    const userId = router.userId;

    const [selectedId, setSelectedId] = useState<string | null>(null); // Track selected expense ID
    const [filteredExpense, setFilteredExpense] = useState<any[]>([]);

    const { expensesByUserId, isLoading, isError } = useExpenseByUserId(userId);
    const { expenses } = useExpenseData();

    // Conditional rendering
    if (!userId) return <p>Please provide a valid user ID.</p>;
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Failed to load expenses.</p>;
    if (!expensesByUserId || !expensesByUserId.length) return <p>No expenses found.</p>;

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
            {expensesByUserId.map((transaction: any) => (
                <div key={transaction.id} className="bg-gray-100 p-2 space-y-4 cursor-pointer">
                    <div
                        onClick={() => handleFilteredExpenses(transaction.id)}
                        className="flex items-center bg-white shadow-sm rounded-lg p-2 border text-sm font-normal gap-4"
                    >
                        <div className="flex-shrink-0 text-center w-16">
                            <div className="text-xs font-extralight text-gray-800">
                                {formatDate(transaction.createdAt)}
                            </div>
                            <div className="text-xs text-gray-400">{transaction.month}</div>
                        </div>
                        <span className="border bg-slate-300 rounded-md w-[40px] h-[40px]"></span>
                        <div className="font-normal text-gray-800">{transaction.description}</div>
                        <div className="ml-4 flex-1 flex gap-10">
                            <LentFriend
                                lentFriend={transaction.giveTakeAmount}
                                paidBy={transaction.paidBy}
                                userId={userId}
                                amount={transaction.amount}
                            />
                        </div>
                    </div>

                    {/* Conditional rendering of ExpenseDetail */}
                    {selectedId === transaction.id && <ExpenseDetail expenseDetial={filteredExpense} />}
                </div>
            ))}
        </>
    );
};

export default TransactionList;
