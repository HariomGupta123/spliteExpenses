import { getServerSession } from "next-auth";
import prisma from "../lib/prismadb";
import { authOptions } from "../../app/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getCurrentUser(req: NextApiRequest, res: NextApiResponse) {
    try {
        const session = await getServerSession(req, res, authOptions);
        if (!session?.user?.email) {
            return null;
        }
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string,
            },
        });
        if (!currentUser) {
            return null;
        }
        console.log("login user", currentUser);
        return currentUser;
    } catch (error: any) {
        console.error("Error in getCurrentUser:", error);
        return null;
    }
}
