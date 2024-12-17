import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "../../../lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        // Retrieve the current user
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Parse the request body
        const { userId } = await request.json();
        console.log("userId jj",userId)

        if (!userId || !currentUser.id) {
            return new NextResponse("Missing required parameters", { status: 400 });
        }

        // Fetch expenses related to both userId and currentUserId
        const expenses = await prisma.expense.findMany({
            where: {
                AND: [
                    {
                        AND: [
                         
                            { involvePeopleOncharch: { some: { id: currentUser.id } } },
                            { involvePeopleOncharch: { some: { id: userId } } },
                        ],
                    },
                    {
                        OR: [
                             { paidBy: { some: { id: currentUser.id } } },
                               { paidBy: { some: { id: userId } } },
                            
                        ],
                    },
                ],
            },
            select: {
                id: true,
                amount:true,
                description: true,
                involvePeopleOncharch: true,
                createdBy:true,
                // giveTakeAmount:true,
                giveTakeAmount: {
                    where: {
                        OR: [
                            {
                                AND: [
                                    {receiverId: userId },
                                    { giverId: currentUser.id },
                                  
                                ],
                            },
                            {
                                AND: [
                                    { receiverId: currentUser.id },
                                    { giverId: userId },
                                ],
                            },
                        ],
                    },
                    select: {
                        giverId: true,
                        giverUser: true,
                        receiverId: true,
                        receiverUser: true,
                        toGiveAmount: true,
                    },
                },
                createdAt: true,
                paidBy: true,
            },
        });

        return NextResponse.json(expenses, { status: 200 });
    } catch (error) {
        console.error("Error fetching expenses:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
