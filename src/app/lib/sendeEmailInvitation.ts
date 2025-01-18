import { User } from '@prisma/client';
import nodemailer from 'nodemailer';

export const sendEmailInvitation = async (
 
  recipientEmail: string,
  inviteLink: string,
senderName: User,
) => {
  try {
    console.log("Recipient Email:", recipientEmail); // Debug log
  if (!recipientEmail) throw new Error("Recipient email is missing.");
    console.log("link",  inviteLink);
    console.log(" senderName: string,", senderName)
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // App password if 2FA is enabled
      },
    });

    const mailOptions = {
      from:senderName.email,
      to: recipientEmail,
      subject: `${senderName?.name} has invited you to join!`,
      html: `
        <h1>You're Invited!</h1>
        <p>${senderName} has invited you to join their expense management group.</p>
        <p>Click the link below to join:</p>
        <a href="${inviteLink}" style="color: blue;">Join Now</a>
      `,
    };

    // Send email and log response
    const response = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", response);

    return response; // Optional: return response for further use
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email invitation.");
  }
};
