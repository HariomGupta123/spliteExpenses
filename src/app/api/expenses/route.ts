import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "../../lib/prismadb"
export async function POST(request:Request){
    try {
        const currentUser=await getCurrentUser();
        if(!currentUser?.id || !currentUser?.email){
            return new NextResponse("Unauthorized credentials",{status:401})
        }
        const body=await request.json();
        const{isGroup,userId,name,expense,members}=body
         if (isGroup && (!members || members.length < 2 || !name)) {
            return new NextResponse('Invalid data', { status: 400 })
        }
        if(isGroup){
           const newGroup=await prisma.group.create({
            data:{
                isGroup,
                name,
                users:{
                    connect:[...members.map((member:{value:string})=>{id:member.value}), {id:currentUser.id}]
                   
                }
            }
           })

        }
    } catch (error) {
        
    }
}