import { Card, CardContent, CardHeader } from "@/components/ui/card";

import DropZone from "@/components/upload-document/drop-zone";
import { getCourseNameListByUserId } from "@/data/course-name-list";
import { auth } from "@/auth";
import CreateCourse from "@/components/course/create-course";
import CourseList from "@/components/course/course-list";

export default async function CoursePage() {
    const session = await auth();

    const courses: string[] | null = await getCourseNameListByUserId(
        session?.user?.id as string
    );

    return (
        <Card className="flex flex-col w-full ">
            <CardHeader>
                <h1 className="font-bold text-2xl">Courses</h1>
                <CreateCourse />
            </CardHeader>
            <CardContent className="min-h-screen">
                <CourseList />
            </CardContent>
        </Card>
    );
}
