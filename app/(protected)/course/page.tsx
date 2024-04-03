import { Card, CardContent, CardHeader } from "@/components/ui/card";

import CreateCourse from "@/components/course/create-course";
import CourseList from "@/components/course/course-list";
import { courseList } from "@/actions/course-list";

export default async function CoursePage() {
    const courses = await courseList();

    return (
        <Card className="flex flex-col w-full ">
            <CardHeader>
                <h1 className="font-bold text-2xl">Courses</h1>
                <CreateCourse />
            </CardHeader>
            <CardContent className="min-h-screen">
                <CourseList courses={courses} />
            </CardContent>
        </Card>
    );
}
