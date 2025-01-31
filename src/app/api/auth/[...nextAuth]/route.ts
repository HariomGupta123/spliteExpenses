import NextAuth from "next-auth";
import { authOptions } from "../../../lib/auth";

const handler = NextAuth(authOptions);

// Export only HTTP methods
export { handler as GET, handler as POST };
