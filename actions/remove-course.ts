"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const removeCourse = async (courseId: string) => {
    const user = await currentUser();

    if (!user) {
        return { error: "User not found" };
    }

    try {
        await db.$transaction([
            db.courseOnDocument.deleteMany({
                where: {
                    courseId,
                },
            }),
            db.course.delete({
                where: {
                    id: courseId,
                },
            }),
        ]);

        revalidatePath("/course");

        return { success: "Course deleted successfully" };
    } catch (error) {
        return { error: "Something went wrong" };
    }
};
