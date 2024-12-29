"use client";

import React, { useState } from "react";
import { useExpenseByUserId } from "@/app/users/getExpenses/GetExpensesByUserId";
import { useParams } from "next/navigation";
import { useExpenseData } from "@/app/users/getExpenses/GetExpenses";
import Detials from "../Detials";
import ExpenseDetail from "../ExpenseDetial";

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

export default TransactionList;
