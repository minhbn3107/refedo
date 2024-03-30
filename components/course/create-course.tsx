"use client";

import { CustomButton } from "@/components/custom-button";
import { Button } from "@/components/ui/button";
import { NewCourseForm } from "./new-course-form";

export default function CreateCourse() {
    return (
        <div>
            <CustomButton
                mode="modal"
                asChild
                header
                padding
                title="Create New Course"
                description="Create your new course and then add some document for it!"
                comp={<NewCourseForm />}
            >
                <Button variant="outline">+ Create New Course</Button>
            </CustomButton>
        </div>
    );
}
