import { auth } from "@/auth";
import { currentUser } from "@/lib/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
    const user = await currentUser();
    if (!user?.id) throw new Error("Unauthorized");
    return { userId: user?.id };
};

export const ourFileRouter = {
    documentUpload: f({ pdf: { maxFileSize: "16MB", maxFileCount: 5 } })
        .middleware(() => handleAuth())
        .onUploadComplete(({ metadata, file }) => ({
            uploadedBy: metadata.userId,
            file,
        })),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
