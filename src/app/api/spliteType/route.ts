import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "../../lib/prismadb";
import { NextResponse } from "next/server";
import getSession from "@/app/actions/getSession";
import { sendExpenseNotifications } from "@/app/lib/sendExpensesNotification";

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();
        console.log("current user", currentUser)
        const session = await getSession();
        console.log("Logged-in user:", session?.user?.email);
        if (!currentUser) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        console.log("Logged in user:", currentUser.email);
        const body = await request.json();
        const {
            description,
            amount,
            paidBy,
            involvePeopleOncharch,
            EqualSplite,
            getBackAmount,
            spliteType,
            createdBy,
            toGiveInType
        } = body;

        // Validate required fields
        console.log("amount", amount)
        console.log("involvePeople", description,
            amount,
            paidBy,
            involvePeopleOncharch,
            EqualSplite,
            "getBack",
            getBackAmount,
            spliteType,
            createdBy,
            toGiveInType)
        // console.log("getBack amount", getBackAmount)
        if (!description || !amount || !spliteType) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        // Handle Equal Split
        if (EqualSplite) {

            const spliteEqually = await prisma.expense.create({
                data: {
                    amount,
                    description,
                    spliteType,
                    getBackAmount: parseFloat(getBackAmount),
                    createdBy: {
                        connect: { id: createdBy },
                    },
                    paidBy: {
                        connect: paidBy.map((userId: string) => ({ id: userId })),
                    },
                    involvePeopleOncharch: {
                        connect: involvePeopleOncharch.map((user: any) => ({ id: user.id })),
                    },
                    giveTakeAmount: {
                        create: involvePeopleOncharch
                            .filter((user: any) => user.id !== paidBy[0])
                            .map((user: any) => ({
                                receiverId: paidBy[0], // Single string, not an array
                                giverId: [user.id], // Array is valid as `giverId` is `String[]`
                                toGiveAmount: user.kharchOnUserInAmount,

                            })),
                    },
                },
            });
            //for notification
            const people = await prisma.user.findMany({
                where: {
                    id: {
                        in: involvePeopleOncharch.map((user: any) => ({ id: user.id })),
                    },
                },
            });

            const groupMembers = people.map((user: any) => ({ email: user.email, name: user?.name }))
            console.log("groupMember", groupMembers)
            const expense = {
                description: spliteEqually?.description,
                amount: spliteEqually.amount,
                shareAmout: spliteEqually.getBackAmount
            }
            const lll = sendExpenseNotifications(expense, groupMembers)
            console.log("lll", lll)

            return new NextResponse(JSON.stringify(spliteEqually), { status: 201 });
        } else {

            // Handle Unequal Split
            const spliteUnequally = await prisma.expense.create({
                data: {
                    amount,
                    description,
                    spliteType,
                    getBackAmount: parseFloat(getBackAmount),
                    createdBy: {
                        connect: { id: createdBy },
                    },
                    paidBy: {
                        connect: paidBy.map((userId: string) => ({ id: userId })),
                    },
                    involvePeopleOncharch: {
                        connect: involvePeopleOncharch.map((user: any) => ({ id: user.id })),
                    },
                    giveTakeAmount: {
                        create: involvePeopleOncharch
                            // .filter((user: any) => user.id !== paidBy[0])
                            .map((user: any) => ({
                                receiverId: paidBy[0], // Single string, not an array
                                giverId: user.id, // Array is valid as `giverId` is `String[]`
                                spliteType: spliteType,
                                toGiveInType: toGiveInType,//like percentage or share
                                toGiveAmount: user.kharchOnUserInAmount,
                            })),
                    },
                    // giveTakeAmount: {
                    //     create: involvePeopleOncharch.map((user: any) => ({
                    //         receiverId: paidBy,
                    //         giverId: user.id,

                    //         toGiveAmount: user.kharchOnUserInAmount,
                    //     })),
                    // },
                },
            });
            //for notification
            const people = await prisma.user.findMany({
                where: {
                    id: {
                        in: involvePeopleOncharch.map((user: any) => user.id), // Extract the `id` values as an array of strings
                    },
                },
            });


            const groupMembers = people.map((user: any) => ({ email: user.email, name: user?.name }))
            // console.log("groupMember", groupMembers)
            const expense = {
                description: spliteUnequally?.description,
                amount: spliteUnequally.amount,
                shareAmout: spliteUnequally.getBackAmount
            }
            const lll = sendExpenseNotifications(expense, groupMembers)
            // console.log("lll", lll)

            return new NextResponse(JSON.stringify(spliteUnequally), { status: 201 });
        }
    } catch (error) {
        console.error("Error occurred:", error);
        if (error instanceof Error) {
            return new NextResponse(error.message, { status: 500 });
        }
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
