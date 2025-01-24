"use client";
import "./globals.css";
import ContextsToaster from "./contexts/ContextsToaster";
import QueryClientProviderWrapper from "./contexts/QueryClientContext";
import AuthContext from "./contexts/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthContext>
          <ContextsToaster />
          <QueryClientProviderWrapper>
            {children}
          </QueryClientProviderWrapper>
        </AuthContext>
      </body>
    </html>
  );
}
