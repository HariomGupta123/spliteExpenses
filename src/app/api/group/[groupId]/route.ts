import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "../../../lib/prismadb";
import useRecieverIds from "@/app/hooks/useRecieverIds";
import { GroupedTransaction } from "@/app/hooks/useRecieverIds"
interface User {
    userId: string;
    toRecieveAmount: number;
    toGiveAmount: number;
    paidAmount: number;
    givers?: { giverId: string; amount: number }[];
}
export async function POST(request: Request) {
    try {
        const newUser = request.body

        const currentUser = await getCurrentUser();
        // if (!currentUser) {
        //     return new NextResponse("Unauthorized", { status: 401 });
        // }

        // console.log("Logged in user:", currentUser.email);
        const body = await request.json();
        const { groupId, description, amount, paidById, EqualSplite, splits, paidAmount } = body;

        const group = await prisma.group.findUnique({
            where: { id: groupId },
            include: { users: true },
        });

        if (!group) {
            return new NextResponse("Group or group member does not exist", { status: 404 });
        }

        if (EqualSplite) {
            const paidUser = splits.find((user: any) => user.paidAmount > 0 ? user : "paid user is not found");
            console.log("Paid User ID:", paidUser);

            const unpaidUsers = splits.filter((user: any) => user.paidAmount == 0 ? user : "unpaid users are not found");

            console.log("Unpaid Users:", unpaidUsers);

            if (!paidUser) {
                return new NextResponse("Paid user not found", { status: 400 });
            };

            const totalamountPaidbyUsers = splits.reduce((accumulator: any, user: any) => {
                return accumulator + user.userPaidAmount
            }, 0);

            if (totalamountPaidbyUsers !== amount) {
                return new NextResponse("users paidAmount and spent amount not matche", { status: 400 })
            };
            const newExpense = await prisma.expense.create({
                data: {
                    description,
                    amount,
                    groupId,
                    createdById: currentUser.id,
                    paidByIds: [paidUser],
                    splits: {
                        create: unpaidUsers.map((split: any) => ({
                            userId: split.userId, // Use the userId directly here

                            amount: amount / unpaidUsers.length, // Split the amount evenly among unpaid users
                        })),
                    },
                },
            });

            // Create GiveTakeAmount entries for each unpaid user
            await Promise.all(
                unpaidUsers.map((split: any) => {
                    return prisma.giveTakeAmount.create({
                        data: {
                            userId: split.userId,
                            paidAmount: 0, // Each user's portion
                            giverId: paidUser,
                            toGiveAmount: 0, // Adjust as needed
                            toRecieveAmount: (amount / unpaidUsers.length), // Adjust as needed
                        },
                    });
                })
            );

            return NextResponse.json(newExpense);
        } else {

            // for unequal expenses
            const totalamountPaidbyUsers = splits.reduce((accumulator: any, user: any) => {
                return accumulator + user.userPaidAmount
            }, 0)
            const paidUsers = splits.filter((user: any) => user.paidAmount > 0 ? user : 0)
            console.log(totalamountPaidbyUsers)
            if (totalamountPaidbyUsers !== amount) {
                return new NextResponse("users paidAmount and spent amount not matche", { status: 400 })
            }


            const perPersonAmount = totalamountPaidbyUsers / splits.length
            console.log("perperson:", perPersonAmount)
            const newUsers: User[] = splits.map((user: any) => {
                return {
                    userId: user.userId,
                    toRecieveAmount: user.userPaidAmount > perPersonAmount ? user.userPaidAmount - perPersonAmount : 0,
                    toGiveAmount: perPersonAmount > user.userPaidAmount ? perPersonAmount - user.userPaidAmount : 0,
                    paidAmount: user.userPaidAmount
                }
            })
            console.log("NewUsers landen", newUsers)
            //transactions
            const groupedTransact = useRecieverIds(newUsers);
            console.log("New Users:", JSON.stringify(newUsers, null, 2));
            console.log(JSON.stringify(groupedTransact, null, 2));





            // Map newUsers to include givers from groupedTransact
            const combinedArray = newUsers.map((user: User) => {
                const transaction = groupedTransact[user.userId]; // Access transaction by userId

                // Calculate toRecieveAmount based on total paid by givers
                const toRecieveAmount = transaction
                    ? transaction.givers.reduce((sum, giver) => sum + giver.amount, 0) // Sum of giver amounts
                    : user.toRecieveAmount; // Keep original if no transaction

                const toGiveAmount = user.paidAmount < perPersonAmount ? perPersonAmount - user.paidAmount : 0; // Or any other logic you want to apply

                return {
                    ...user, // Spread original properties
                    givers: transaction ? transaction.givers : [], // Set givers based on transaction
                    toRecieveAmount, // Update this based on your logic
                    toGiveAmount, // Or your logic here
                };
            });



            console.log(JSON.stringify(combinedArray, null, 2));

            
            const newExpense = await prisma.expense.create({
                data: {
                    description,
                    amount,
                    groupId,
                    createdById: currentUser.id,
                    //    paidByIds:[paidUsers.userId],
                    splits: {
                        create: combinedArray.map((split: any) => ({
                            userId: split.userId, // Use the userId directly here

                            amount: split.paidAmount, // Split the amount evenly among unpaid users
                        })),
                    },
                },
            });

            // Create GiveTakeAmount entries for each unpaid user
            await Promise.all(
                combinedArray.map((split: any) => {
                   
                    if (split.givers.length === 0) {
                        return Promise.resolve(); // If no givers, resolve and skip this split
                    }

                    return Promise.all(
                        split.givers.map((giver: any) => {
                            return prisma.giveTakeAmount.create({
                                data: {
                                    userId: split.userId,
                                    paidAmount: split.paidAmount, // Each user's portion
                                    giverId: [giver.giverId],
                                    toGiveAmount:giver.amount,
                                    toRecieveAmount: split.toRecieveAmount || 0, // Adjust as needed
                                    // Adjust as needed
                                },
                            })
                        })
                    ) || []
                })
            );

            return NextResponse.json(newExpense);
            //   return new NextResponse("EqualSplite is false or not provided", { status: 400 });
        }
    } catch (error: any) {
        console.error(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
