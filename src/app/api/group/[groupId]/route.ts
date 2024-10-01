import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "../../../lib/prismadb";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    console.log("Logged in user:", currentUser.email);
    const body = await request.json();
    const { groupId, description, amount, paidById, EqualSplite, splits } = body;

    const group = await prisma.group.findUnique({
      where: { id: groupId },
      include: { users: true },
    });

    if (!group) {
      return new NextResponse("Group or group member does not exist", { status: 404 });
    }

    if (EqualSplite) {
      const paidUser = splits.find((user: any) => user.id !== paidById)?.userId;
      console.log("Paid User ID:", paidUser);
      const unpaidUsers = splits.filter((user: any) => user.userId !== paidById.userId);
     
      console.log("Unpaid Users:", unpaidUsers);

      if (!paidUser) {
        return new NextResponse("Paid user not found", { status: 400 });
      }

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
              takeId:paidUser,
              takeAmount: 0, // Adjust as needed
              giveAmount:  (amount / unpaidUsers.length), // Adjust as needed
            },
          });
        })
      );

      return NextResponse.json(newExpense);
    } else {
      return new NextResponse("EqualSplite is false or not provided", { status: 400 });
    }
  } catch (error: any) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
