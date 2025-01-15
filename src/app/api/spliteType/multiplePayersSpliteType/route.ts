import getCurrentUser from "@/app/actions/getCurrentUser";
import multiplePayersArray from "@/app/hooks/multiplePayersArray";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { amount, description, multiplePayers,spliteType } = body;

        console.log("Received amount:", amount);

        // Safely parse amount
        const totalAmount = parseFloat(amount);
       

        // Calculate total amount paid by users
      
    // Calculate total amount paid by users
    const totalAmountPaidByUsers = multiplePayers.reduce((accumulator: any, user: any) => {
      return accumulator + parseFloat(user.PaidAmount);
    }, 0);
   console.log("totalAmount",totalAmount);
   console.log("totalAmountPaidByuser",totalAmountPaidByUsers)
    if (totalAmountPaidByUsers !== totalAmount) {
      return new NextResponse("The total amount paid by users does not match the expense amount.", {
        status: 402,
      });
    }

    const amountPerUser = totalAmount / multiplePayers.length;

    // Generate processed payers array
    const MultiplePayersArrays = multiplePayersArray(multiplePayers, amountPerUser);

    // Validate array structure
    if (!MultiplePayersArrays.every((user: any) => user.receiverId && user.giverId && user.toGiveAmount)) {
      return new NextResponse("Invalid data format for multiple payers.", { status: 400 });
    }

    // Create an expense in the database
    const spliteEqually = await prisma.expense.create({
      data: {
        amount: totalAmount,
        spliteType:spliteType,
        description,
        createdBy: { connect: { id: currentUser.id } },
        paidBy: { connect: multiplePayers.map((user: any) => ({ id: user.userId })) },
        involvePeopleOncharch: { connect: multiplePayers.map((user: any) => ({ id: user.userId })) },
        giveTakeAmount: {
          create: MultiplePayersArrays.map((user: any) => ({
            receiverId:  user?.receiverId,
            giverId: user?.giverId,
            toGiveAmount: user?.toGiveAmount,
            spliteType: spliteType,
            // receiverUser: user?.receiverUser,
            // giverUser: user?.giverUser,
          })),
        },
      },
    });

    return new NextResponse(
      JSON.stringify({ success: true, message: "Expense created successfully", data: spliteEqually }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing expense:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}