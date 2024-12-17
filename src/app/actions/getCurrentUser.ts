// //on opened profile user
// import getSession from "./getSession"
// import prisma from "../../app/lib/prismadb"
// const getCurrentUser=async ()=>{
//     try {
//         const session=await getSession();
//         if(!session?.user?.email){
//             return null
//         }
//         const currentUser=await prisma.user.findUnique({
//             where:{
//                 email:session.user.email as string
//             }
//         })
//         if(!currentUser){
//             return null;
//         }
//         return currentUser
//     } catch (error:any) {
//         return null;
        
//     }
// }
// export default getCurrentUser;
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/prismadb";

const getCurrentUser = async () => {
    const session = await getServerSession(authOptions);
    console.log("Session data in getCurrentUser:", session); // Debugging line
    if (!session?.user?.email) {
        return null;
    }
    const user = await prisma.user.findUnique({
        where: { email: session?.user?.email },
    });
    return user;
};

export default getCurrentUser;
