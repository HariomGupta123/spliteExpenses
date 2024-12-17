import React from "react";
import { useQuery } from "@tanstack/react-query";

// Hook to fetch expenses for a specific userId
export const useExpenseByUserId = (userId:any) => {
    console.log("userId",userId)
    const fetchExpenses = async () => {
        const response = await fetch("/api/getExpenses/getFriendExpenseById", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
        });        if (!response.ok) {
            throw new Error("Failed to fetch expenses");
        }
        return response.json();
    };

    const { data: expensesByUserId, isLoading, isError } = useQuery({
        queryKey: ["expensesByUserId", userId],
        queryFn: fetchExpenses,
        enabled: !!userId,
    });

    // Extract `involvePeopleOncharch` for export
  
    console.log("userId Expenses", expensesByUserId);
    return { expensesByUserId, isLoading, isError };

};