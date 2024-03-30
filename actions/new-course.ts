"use server";

import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { NewCourse } from "@/schemas";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const newCourse = async (
    values: z.infer<typeof NewCourse>,
    userId: string,
    type?: boolean
) => {
    const { name, description } = values;

    const existingUser = await getUserById(userId);

    if (!existingUser) {
        return { error: "User not found" };
    }

    const existingCourse = await db.course.findFirst({
        where: { userId, name },
    });

    if (existingCourse) {
        return { error: "Course already exists" };
    }

    await db.course.create({
        data: {
            name,
            description,
            userId,
            type: type ? type : true,
        },
    });

    revalidatePath("/upload-document");

    return {
        success: "New course created",
    };
};
