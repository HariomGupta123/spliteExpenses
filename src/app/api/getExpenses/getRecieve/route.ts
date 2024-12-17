import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "../../../lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Fetch expenses where the current user is involved and `giveTakeAmount` is not empty
        const expenses = await prisma.expense.findMany({
            where: {
                involvePeopleOncharch: {
                    some: { id: currentUser.id }, // Check if currentUser.id exists in the array
                },
                giveTakeAmount: {
                    some: {}, // Ensure `giveTakeAmount` is not empty
                },
            },
            select: {
                id:true,
                  amount:true,
                  description:true,
                  paidByIds:true,
                involvePeopleOncharch: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                giveTakeAmount: {
                    select: {
                        id: true,
                       receiverUser:true,
                       giverUser:true,
                        receiverId: true,
                        giverId: true,
                        toGiveAmount: true,
                        toGiveInType: true,
                        expenseId: true,
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
