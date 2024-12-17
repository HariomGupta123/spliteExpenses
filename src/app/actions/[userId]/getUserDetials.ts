import prisma from "@/app/lib/prismadb";
import getCurrentUser from "../getCurrentUser";

const getUserDetialsById = async (userId: string) => {
    try {
        console.log(userId)
        // const currentUser = await getCurrentUser();

        // if (!currentUser?.email) {
        //     console.log("No valid session, returning null.");
        //     return null;
        // }

        console.log("Fetching details for userId:", userId);
        const conversation = await prisma.user.findFirst({
            where: { id: userId },
            select: { id: true, name: true },
        });

        console.log("Fetched user detailsss:", conversation);
        return conversation;
    } catch (error: any) {
        console.error("Error fetching user details:", error);
        return null;
    }
};

export default getUserDetialsById;
