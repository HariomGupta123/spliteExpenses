import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";
import bcrypt from "bcryptjs"; // For password hashing

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { id, image, email, name,password, oldPassword } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Ensure the user can only update their own account
    if (currentUser.id !== id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // Fetch current user's password from the database
    const user = await prisma.user.findUnique({
      where: { id: currentUser.id },
      select: { hashedPassword: true },
    });

    // Ensure user exists and hashedPassword is not null before comparing
    if (oldPassword && user?.hashedPassword) {
      const isMatch = await bcrypt.compare(oldPassword, user.hashedPassword);
      if (!isMatch) {
        return new NextResponse("Incorrect old password", { status: 400 });
      }
    } else if (oldPassword) {
      return new NextResponse("No password set for this account", { status: 400 });
    }

    // Prepare data to update
    let updateData: any = {};
    if (image) updateData.image = image;
    if (email) updateData.email = email;
    if(name) updateData.name=name
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10); // Hash new password
      updateData.hashedPassword = hashedPassword;
    }

    // Update user in the database
    const updatedAccount = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedAccount);
  } catch (error: any) {
    console.log(error, "ERROR_MESSAGES");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
