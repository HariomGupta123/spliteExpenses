import getCurrentUser from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server";
import prisma from "../../../../lib/prismadb"
export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json()
        const { expenseId,EqualSplite } = body // expenseId is groupId
        if (!currentUser) {
            return new NextResponse("unAuthorized ", { status: 400 })
        }
        const expense = await prisma.expense.findUnique({
            where: {
                id: expenseId
            },
           include:{
            group:{
                include:{users:true}
            }
           }
        })
        if(!expense){
            return new NextResponse("expense not find",{status:404})
        }
        const expensea = await prisma.expense.findUnique({
            where: {
                id: expenseId
            },
           include:{
            splits:{
                include:{user:true}
            }
           }
        })
        console.log("all user of a group",expensea?.splits)
        const sss=expensea?.splits.map((user)=>{console.log(user.amount)})
       
       const totalAmout=expense.amount
       const numberOfUser=expense.group.users.length
       const splitsAmout=totalAmout/numberOfUser

       const expenseSlite=await Promise.all(
        expense.group.users.map(async (user)=>{
            return await prisma.expenseSplit.create({
                data:{
                    userId:user.id,
                    amount:splitsAmout, 
                    expenseId:expense.id,
                  returnBackAmout:splitsAmout && ((splitsAmout>0) ? splitsAmout:0 )
                }
            })
        })
       )
      
      return NextResponse.json({expense,expenseSlite})
    } catch (error: any) {
        console.log(error)
      return new NextResponse("internal error",{status:500})
    }
}