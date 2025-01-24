"use client";
import "./globals.css";
import ContextsToaster from "./contexts/ContextsToaster";
import QueryClientProviderWrapper from "./contexts/QueryClientContext";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <ContextsToaster />
          <QueryClientProviderWrapper>
            {children}
          </QueryClientProviderWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}
