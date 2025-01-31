
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
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
