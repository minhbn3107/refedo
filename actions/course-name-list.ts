"use server";

import { getCourseNameListByUserId } from "@/data/course";
import { currentUser } from "@/lib/auth";

export const courseNameList = async () => {
    const user = await currentUser();

    if (!user) {
        return null;
    }

    const courseName = await getCourseNameListByUserId(user.id);

    if (!courseName) {
        return null;
    }

    return courseName;
};
