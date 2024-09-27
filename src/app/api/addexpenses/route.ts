import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "../../lib/prismadb"
import { NextResponse } from "next/server";
export async function POST(request:Request) {
    try {
          const currentUser=await getCurrentUser();
          if( !currentUser?.email){
            return new NextResponse("unAuthorized",{status:401})
          }
          const body=await request.json();
          const {description,amount, paidBy,group,splits,isGroup,members}=body
          
           if (isGroup && (!members || members.length < 2 )) {
            return new NextResponse('Invalid data', { status: 400 })
        }
        if(isGroup){
            const newExpenses=await prisma.expense.create({
                data:{
                    isGroup,
                    description,
                   paidBy:{
                            connect:[...members.map((member:{value:string})=>{id:members.value}),currentUser.id]
                        }
                     ,
                     splits,
                     group
                },
            })
        }
    } catch (error:any) {
        
    }
    
}