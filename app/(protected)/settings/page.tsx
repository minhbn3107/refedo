"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
// import { logout } from "@/actions/logout";
import { signOut } from "next-auth/react";

function SettingsPage() {
    const user = useCurrentUser();

    const onClick = () => {
        signOut();
        // logout();
    };
    return (
        <div className="bg-white p-10 rounded-xl">
            <button type="submit" onClick={onClick}>
                Sign out
            </button>
        </div>
    );
}

export default SettingsPage;
