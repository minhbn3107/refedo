import { db } from "@/lib/db";

export const getCourseNameListByUserId = async (userId: string) => {
    try {
        const courseNameList = await db.course.findMany({
            where: { userId },
        });

        return courseNameList.map((course) => course.name);
    } catch {
        return null;
    }
};
