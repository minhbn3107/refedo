import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Course from "@/components/upload-document/course-name";

import DropZone from "@/components/upload-document/drop-zone";
import { getCourseNameListByUserId } from "@/data/course-name-list";
import { auth } from "@/auth";

export default async function UploadDocumentPage() {
    const session = await auth();

    const courses: string[] | null = await getCourseNameListByUserId(
        session?.user?.id as string
    );

    return (
        <Card className="flex flex-col w-full ">
            <CardHeader>
                <h1 className="font-bold text-2xl">Upload files</h1>
                <Course courses={courses} />
            </CardHeader>
            <CardContent className="min-h-screen">
                <DropZone />
            </CardContent>
        </Card>
    );
}
