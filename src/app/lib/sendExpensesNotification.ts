import nodemailer from 'nodemailer';

// Define interfaces for TypeScript
interface Expense {
  description: string;
  amount: number;
  shareAmout: number | null;
}

interface GroupMember {
  email: string;
  name: string;
}

// Create the transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Make sure this is set correctly in the environment
    pass: process.env.EMAIL_PASS, // Make sure this is set correctly in the environment
  },
});

export const sendExpenseNotifications = async (expense: Expense, groupMembers: GroupMember[]) => {
  for (const member of groupMembers) {
    const { email, name } = member;

    // Handle null shareAmout properly, default to 0 if null
    const shareAmount = expense.shareAmout === null ? 'TBD' : expense.shareAmout;

    const mailOptions = {
      from: process.env.EMAIL_USER, // Ensure the "from" email is the same as the one in your auth
      to: email,
      subject: `Expense Notification: ${expense.description}`,
      html: `
        <p>Hello ${name},</p>
        <p>A new expense has been added to your group:</p>
        <ul>
          <li><strong>Description:</strong> ${expense.description}</li>
          <li><strong>Total Amount:</strong> $${expense.amount}</li>
          <li><strong>Your Share:</strong> $${shareAmount}</li>
        </ul>
        <p>Thank you for using our Expense App!</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Email sent successfully to ${email}`);
    } catch (error) {
      console.error(`Error sending email to ${email}:`, error);
    }
  }
};
