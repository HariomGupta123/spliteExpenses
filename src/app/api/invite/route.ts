import { generateToken } from '../../lib/generateToken';
import { sendEmailInvitation } from '../../lib/sendeEmailInvitation';
import prisma from '../../lib/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';

export  async function POST(request:Request) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
            return new NextResponse("Unauthorized", { status: 401 });
    }
    const body=await request.json()
    const { senderId, recipientEmail,senderName } = body;

    if ( !recipientEmail) {
        return new NextResponse( ' recipient email are required.',{status:402});
    }

    try {
        const token = generateToken();
        const inviteLink = `http://localhost:3000/inviteFriends/verifyEmail?token=${token}`;

        // Save the token and details to the database
        await prisma.invitation.create({
            data: {
                token,
                email:recipientEmail ,
                senderId:currentUser?.id,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
            },
        });
          
        // Send the invitation email
        await sendEmailInvitation(recipientEmail, inviteLink,currentUser.name || senderName);

        return new NextResponse('Invitation sent successfully.',{status:200});
    } catch (error: any) {
        console.error('Error sending invitation:', error.message);
        return new NextResponse( 'Failed to send invitation.',{status:500} );
    }
}
