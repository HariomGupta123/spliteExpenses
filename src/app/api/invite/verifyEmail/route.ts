import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '../../../lib/prismadb';
import { NextResponse } from 'next/server';

export  async function POST(request:Request) {
  const currentUser=await getCurrentUser();
  if(!currentUser){
   if (!currentUser) {
            return new NextResponse("Unauthorized", { status: 401 });
    }
  }
   const body=await request.json()
  const { token } = body;

  if (!token) {
    return new NextResponse('Token is required.',{status:402});
  }

  try {
    // Find the invitation using the token
    const invitation = await prisma.invitation.findUnique({
      where: { token },
    });

    if (!invitation) {
      return new NextResponse('Invalid or expired token.',{status:404});
    }

    if (invitation.isUsed) {
      return new NextResponse('This invitation has already been used.' ,{status:400});
    }

    if (new Date(invitation.expiresAt) < new Date()) {
      return new NextResponse('This invitation has expired.',{status:400});
    }

    // Mark the token as used
    await prisma.invitation.update({
      where: { token },
      data: { isUsed: true },
    });

    return new NextResponse( 'Token is valid. Proceed with signup.' );
  } catch (error:any) {
    console.error('Error validating token:', error.message);
    return new NextResponse('Error validating token.' ,{status:500});
  }
}
