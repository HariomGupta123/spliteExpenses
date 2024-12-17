import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "../../lib/prismadb";
import { NextResponse } from "next/server";
import getSession from "@/app/actions/getSession";

export async function POST(request: Request) {
  try {
    // Get the current user and session
    const currentUser = await getCurrentUser();
    const session = await getSession();

    // console.log("login user", session?.user?.email);

    // if (!session?.user?.email) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    const body = await request.json();
    const {groupName,memberEmail } = body;

    // Validate the group creation request
    if (!groupName && !memberEmail || memberEmail.length < 2 ) {
      return new NextResponse("members must be more than one", { status: 400 });
    }
     const members=await prisma.user.findMany({
      where:{
        email:{
          in:memberEmail
        }
      }
     })

     if(members.length !==memberEmail.length){
      return new NextResponse("some email is invalide",{status: 400})
     }
    // Create a new group with the mapped member IDs
  
            const newGroup = await prisma.group.create({
                data: {
                    isGroup:true,
                    name:groupName,
                    users: {
                        connect: members.map((member) => ({ id: member.id})),
                        
                    }
                },
                include: {
                    users: true
                }
            });
             return NextResponse.json(newGroup);
     
   

  } catch (error: any) {
    console.error("Error in POST handler:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
