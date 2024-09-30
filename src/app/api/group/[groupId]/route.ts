import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "../../../lib/prismadb"
export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return new NextResponse("unAuthorized", { status: 400 });
        }
        console.log("login user:", currentUser.email)
        const body = await request.json();
        const { groupId, description, amount, paidById,EqualSplite,splits,equalSplite } = body
        const group = await prisma.group.findUnique({
            where: {
                id: groupId,
                // users:{
                //     some:{
                //         id:paidById
                //     }
                // }
            },
            include: { users: true }
        })
        if (!group) {
            return new NextResponse("group or group member is not exist", { status: 401 })
        }
        if(EqualSplite){
           const paiduser=splits.find((user:any)=>user.id ==paidById );
           const unPaidUser=splits.filter((user:any)=>user.id !==paidById)
        const newExpenses = await prisma.expense.create({
            data: {
                description,
                amount,
                groupId,
                createdById:currentUser.id ,  // The user who created the expense
                paidByIds: [paidById],  // The user who paid the expense
                splits: {
                    create: unPaidUser.map((split: any) => ({
                        userId: split.userId,
                        user:{create:{amountHerfer:{create:{paidmount:amount,takeamount:amount/4,userId:split.userId,giveamount:amount-amount/4 }}}},
                        amount: split.amount,
                        equalSplite: split.equalSplite || false,
                        unEqualSplite: split.unEqualSplite || false,
                        returnBackAmout: split.returnBackAmout || 0,
                    })),
                },
            },
        });
     return NextResponse.json(newExpenses)
    }
       
    } catch (error: any) {
        console.error(error);
        return new NextResponse("Internal Server Error", { status: 500 });

    }
}