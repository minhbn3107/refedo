import { courseNameList } from "@/actions/course-name-list";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Course from "@/components/upload-document/course-name";

import DropZone from "@/components/upload-document/drop-zone";

export default async function UploadDocumentPage() {
    const courses: string[] | null = await courseNameList();

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
