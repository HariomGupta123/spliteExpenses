import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "../../lib/prismadb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Mark this route as dynamic

export async function GET() {
    try {
        // Retrieve the current user
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        // Extract current user's ID
        const currentUserId = currentUser.id;

        // Fetch expenses from Prisma
        const expenses = await prisma.expense.findMany({
            where: {
                createdById: currentUserId, // Adjust condition based on your data structure
            },
            select: {
                id: true,               // Include the unique ID
                description: true,      // Include description
                amount: true,           // Include amount
                createdAt: true,        // Include creation timestamp
                createdBy: {            // Include details of the creator
                    select: {
                        id: true,
                        name: true,
                    },
                },
                paidBy: {                // Include details of the payers
                    select: {
                        id: true,
                        name: true,
                    },
                },
                involvePeopleOncharch: { // Include involved people
                    select: {
                        id: true,
                        name: true,
                    },
                },
                group: {                 // Include group information if any
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        // Check if expenses were found
        if (!expenses.length) {
            return NextResponse.json({ message: "No expenses found" }, { status: 404 });
        }

        // Return the expenses
        return NextResponse.json(expenses, { status: 200 });
    } catch (error) {
        console.error("Error fetching expenses:", error);
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Internal Server Error" },
            { status: 500 }
        );
    }
}
