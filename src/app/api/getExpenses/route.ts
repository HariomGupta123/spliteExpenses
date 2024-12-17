
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "../../lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      
         const currentUser = await getCurrentUser();
        if (!currentUser) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
       const currentUserEmail=currentUser.id
        const expenses = await prisma.expense.findMany({
            select: {
                id: true,               // Include the unique ID
                description: true,      // Include description
                amount: true,           // Include amount
                createdAt: true,        // Include creation timestamp
                createdBy: {            // Include details of the creator
                    select: {
                        id: true,
                        name: true,     // Example field
                    },
                },
                paidBy: {                // Include details of the payers
                    select: {
                        id: true,
                        name: true,     // Example field
                    },
                },
                involvePeopleOncharch: { // Include involved people
                    select: {
                        id: true,
                        name: true,     // Example field
                    },
                },
                group: {                 // Include group information if any
                    select: {
                        id: true,
                        name: true,     // Example field
                    },
                },
            },
        });





        if (!expenses.length) {
            return new NextResponse("No expenses found", { status: 404 });
        }



        // Return the expenses in the response
        return new NextResponse(JSON.stringify(expenses), { status: 200 });
    } catch (error) {
        console.error("Error fetching expenses:", error);
        if (error instanceof Error) {
            return new NextResponse(error.message, { status: 500 });
        }
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
