import { db } from "@/lib/db";
import { getUserById } from "./user";

export const getUploadDocumentByUserId = async (
    name: string,
    userId: string,
    fileUrl: string,
    type: boolean
) => {
    const existingUser = await getUserById(userId);

    if (!fileUrl) return { error: "File URL is required" };

    if (!existingUser) return { error: "User not found" };

    await db.uploadDocument.create({
        data: {
            name,
            fileUrl,
            type,
            userId,
        },
    });
};
