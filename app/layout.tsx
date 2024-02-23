import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import StoreProvider from "./StoreProvider";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Next Authentication",
    description:
        "Generated by bnminh3107 based on tutorials from Antonio Erdeljac",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    return (
        <SessionProvider session={session}>
            <StoreProvider>
                <html lang="en">
                    <body className={inter.className}>
                        <Toaster />
                        {children}
                    </body>
                </html>
            </StoreProvider>
        </SessionProvider>
    );
}
