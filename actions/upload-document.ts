"use server";

import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export const uploadDocument = async (
    name: string,
    fileUrl: string,
    userId: string,
    courseName: string,
    type?: boolean
) => {
    const existingUser = await getUserById(userId);

    if (!existingUser) {
        return { error: "User not found" };
    }

    if (!courseName) {
        return { error: "Course name is required" };
    }

    const existingCourse = await db.course.findFirst({
        where: { userId, name: courseName },
    });

    if (!existingCourse) {
        return { error: "Course not found" };
    }

    try {
        const document = await db.uploadDocument.create({
            data: {
                name: name,
                fileUrl: fileUrl,
                userId: userId,
                type: type ? type : true,
            },
        });

        await db.courseOnDocument.create({
            data: {
                uploadDocumentId: document.id,
                courseId: existingCourse.id,
            },
        });

        return {
            success: "Upload successfully",
        };
    } catch (error: any) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {
            return {
                error: `This ${name} already exists in the course`,
            };
        }
        // handle other types of errors
        return { error: error.message };
    }
};
