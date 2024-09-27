import { NextApiRequest, NextApiResponse } from "next";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "../../lib/prismadb";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Pass req and res to getCurrentUser for session retrieval
    const currentUser = await getCurrentUser(req, res);
    console.log("loginuser", currentUser);

    if (!currentUser?.id || !currentUser?.email) {
      return res.status(401).json("Unauthorized credentials");
    }

    const body = await req.body;
    const { isGroup, name, members } = body;

    // Validate the group creation request
    if (isGroup && (!members || members.length < 2 || !name)) {
      return res.status(400).json("Invalid data");
    }

    if (isGroup) {
      // Ensure the `members` mapping is done correctly with the Prisma connection
      const newGroup = await prisma.group.create({
        data: {
          isGroup,
          name,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({ id: member.value })), // Fix the mapping
              { id: currentUser.id }, // Add the current user
            ],
          },
        },
        include: {
          users: true,
        },
      });

      return res.status(200).json(newGroup);
    }

    return res.status(400).json("Invalid request");

  } catch (error: any) {
    console.error("Error in POST handler:", error);
    return res.status(500).json("Internal Error");
  }
}
