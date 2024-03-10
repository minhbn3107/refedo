"use server";

import { getUserById } from "@/data/user";
import { db } from "@/lib/db";

export const uploadDocument = async (
    name: string,
    fileUrl: string,
    userId: string,
    type?: boolean
) => {
    const existingUser = await getUserById(userId);

    if (!existingUser) {
        return { error: "User not found" };
    }

    await db.uploadDocument.create({
        data: {
            name,
            fileUrl,
            userId,
            type: type ? type : false,
        },
    });

    return {
        success: "Upload successfully",
    };
};
