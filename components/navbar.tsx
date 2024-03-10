"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Logo from "@/public/favicon/android-chrome-512x512.png";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LoginButton } from "@/components/auth/login-button";

export default function Navbar() {
    const user = useCurrentUser();
    const pathname = usePathname();

    return (
        <nav className="bg-white flex justify-between items-center p-4 w-full shadow-lg">
            <div className="flex gap-x-2">
                <Link href="/">
                    <Image src={Logo} width={40} height={40} alt="Logo" />
                </Link>
                <Button
                    asChild
                    variant={pathname == "/" ? "default" : "outline"}
                >
                    <Link href="/">Home</Link>
                </Button>
                <Button
                    asChild
                    variant={pathname == "/server" ? "default" : "outline"}
                >
                    <Link href="/server">Server</Link>
                </Button>
                <Button
                    asChild
                    variant={pathname == "/client" ? "default" : "outline"}
                >
                    <Link href="/client">Client</Link>
                </Button>
                <Button
                    asChild
                    variant={pathname == "/admin" ? "default" : "outline"}
                >
                    <Link href="/admin">Admin</Link>
                </Button>
                <Button
                    asChild
                    variant={pathname == "/settings" ? "default" : "outline"}
                >
                    <Link href="/settings">Settings</Link>
                </Button>
                <Button
                    asChild
                    variant={
                        pathname == "/upload-document" ? "default" : "outline"
                    }
                >
                    <Link href="/upload-document">Upload</Link>
                </Button>
            </div>
            {user ? (
                <UserButton />
            ) : (
                <div className="space-y-6 text-center">
                    <LoginButton mode="modal" asChild>
                        <Button variant="default" size="lg">
                            Sign in
                        </Button>
                    </LoginButton>
                </div>
            )}
        </nav>
    );
}
