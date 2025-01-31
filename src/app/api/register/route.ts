import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "../../lib/prismadb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    console.log("data", email, name, password);

    // Validate input fields
    if (!email || !name || !password) {
      return new NextResponse("Missing required information", { status: 400 });
    }

    // Check if the email is already registered
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    // console.log(existingUser);

    // If the user already exists, return a conflict error
    if (existingUser) {
      return new NextResponse(
        JSON.stringify({ message: "Email already registered" }), 
        { status: 409 }
      ); // Conflict status code
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    console.error(error, "REGISTRATION_ERROR");
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
