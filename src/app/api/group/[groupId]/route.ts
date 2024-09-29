import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "../../../lib/prismadb"
export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return new NextResponse("unAuthorized", { status: 400 });
        }
        console.log("login user:",currentUser.email)
        const body = await request.json();
        const { groupId, description, amount, paidById } = body
        // const group = await prisma.group.findUnique({
        //     where: {
        //         id: groupId,
        //         // users:{
        //         //     some:{
        //         //         id:paidById
        //         //     }
        //         // }
        //     },
        //     include: { users: true }
        // })
        // if (!group) {
        //     return new NextResponse("group or group member is not exist", { status: 401 })
        // }
          
        const newExpenses = await prisma.expense.create({
            data: {
                description,
                amount,
                group: { connect: { id: groupId } },  // Connect the group
                createdBy: { connect: { id: currentUser.id } },  // Connect the user who created the expense
                paidBy: { connect: { id: paidById } },  // Connect the user who paid the expense
            },
            include: {
                splits: true,
                group:true,             
                paidBy:true
            }
        })
        return NextResponse.json(newExpenses)
    } catch (error:any) {
        console.error(error);
         return new NextResponse("Internal Server Error", { status: 500 });

    }
}