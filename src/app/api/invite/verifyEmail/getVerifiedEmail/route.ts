import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "../../../../lib/prismadb";
export const dynamic = "force-dynamic"; // Prevent static rendering

export async function GET(request: Request) {
    try {
        const currentUser = await getCurrentUser();

        // If the current user is not found, return unauthorized error
        if (!currentUser) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // 1. Retrieve `userId` where currentUser is the senderId and email exists in the user table
        const invitationsAsSender = await prisma.invitation.findMany({
            where: {
                senderId: currentUser.id,
                isUsed: true,
            },
            select: {
                email: true,
            },
        });

        // Extract emails from invitations where currentUser is the sender
        const emailsFromInvitations = invitationsAsSender.map((inv) => inv.email);

        // Find `userId` for users whose email matches the invitation emails
        const usersByEmail = await prisma.user.findMany({
            where: {
                email: {
                    in: emailsFromInvitations,
                },
            },
        });

        // 2. Retrieve `senderId` details where currentUser.email matches invitation email
        const invitationsForCurrentUser = await prisma.invitation.findMany({
            where: {
                email: currentUser.email,
                isUsed: true,
            },
            select: {
                senderId: true,
            },
        });

        // Fetch sender details for the invitations
        const senders = await prisma.user.findMany({
            where: {
                id: {
                    in: invitationsForCurrentUser.map((inv) => inv.senderId),
                },
            },           
        });

        // Combine `usersByEmail` and `senders` into a single array
        const combinedResults = [
            ...usersByEmail,
            ...senders,
        ];

        // Remove duplicates based on unique `id`
        const uniqueResults = Array.from(
            new Map(combinedResults.map(user => [user.id, user])).values()
        );
       console.log("allFriend",uniqueResults)
        // Return the unique combined result
        return new NextResponse(JSON.stringify(uniqueResults), { status: 200 });
    } catch (error: any) {
        console.error("Error fetching data:", error);

        // Return appropriate error message if an exception occurs
        if (error instanceof Error) {
            return new NextResponse(error.message, { status: 500 });
        }
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

