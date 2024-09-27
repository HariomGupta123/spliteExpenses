import prisma from "../lib/prismadb";
import getCurrentUser from "./getCurrentUser";
import { NextApiRequest, NextApiResponse } from "next";

export async function getUsers(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Pass req and res to getCurrentUser for session retrieval
        const session = await getCurrentUser(req, res);
        
        if (!session?.email) {
            return [];
        }

        console.log("getUser:", session.email);

        // Find all users except the current session user
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: "desc",
            },
            where: {
                NOT: {
                    email: session.email,
                },
            },
        });

        return users;
        
    } catch (error: any) {
        console.error("Error in getUsers:", error);
        return [];
    }
}
