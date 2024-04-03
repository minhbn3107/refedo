"use server";

import { getCourseListByUserId } from "@/data/course";
import { currentUser } from "@/lib/auth";

export const courseList = async () => {
    const user = await currentUser();

    if (!user) {
        return null;
    }

    const courses = await getCourseListByUserId(user.id);

    if (!courses) {
        return null;
    }

    return courses;
};
