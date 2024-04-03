"use client";

import { FaRegFolderOpen } from "react-icons/fa6";
import { CiCalendarDate } from "react-icons/ci";
import { IoTrashOutline } from "react-icons/io5";
import { CustomButton } from "../custom-button";
import { useState } from "react";
import { ConfirmRemove } from "./confirm-remove";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/lib/hooks";
import { saveCourseId } from "@/lib/features/remove-course/removeCourseSlice";

function formatDate(date: Date) {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
}

function truncateString(name: string) {
    if (name.length <= 12) {
        return name;
    } else {
        return name.slice(0, 12) + "...";
    }
}

interface Course {
    id: string;
    name: string;
    tags: string[];
    description: string | null;
    userId: string;
    type: boolean;
    dateCreated: Date;
    dateModified: Date;
}

interface CourseListProps {
    courses: Course[] | null;
}

export default function CourseList({ courses }: CourseListProps) {
    const dispatch = useAppDispatch();

    return (
        <div className="w-[800px] rounded-lg">
            <h3 className="font-bold text-xl">Course List</h3>
            {!courses?.length ? (
                <p className="font-semibold text-center text-2xl">
                    No course found!
                </p>
            ) : (
                courses.map((course) => (
                    <div
                        key={course.id}
                        className="grid grid-cols-5 gap-4 m-4 border-solid"
                    >
                        <div className="flex flex-col flex-grow col-span-3">
                            <div className="flex items-center">
                                <FaRegFolderOpen />
                                <h2 className="text-base ms-2 truncate text-blue-600">
                                    {course.name}
                                </h2>
                            </div>
                            <p className="text-sm truncate">
                                {course.description}
                            </p>
                        </div>
                        <div className="flex flex-col col-span-1 items-center">
                            <h5 className="flex items-center">
                                <CiCalendarDate />
                                <span className="text-sm ms-1">
                                    {formatDate(course.dateCreated)}
                                </span>
                            </h5>
                            <p>rating</p>
                        </div>
                        <div className="flex justify-end">
                            <CustomButton
                                mode="modal"
                                asChild
                                header
                                padding
                                title={`Delete course ${truncateString(
                                    course.name
                                )}`}
                                description="Are you sure you want to delete this course?"
                                comp={
                                    <ConfirmRemove
                                        setOpen={function (
                                            open: boolean
                                        ): void {
                                            throw new Error(
                                                "Function not implemented."
                                            );
                                        }}
                                    />
                                }
                            >
                                <Button
                                    variant="destructive"
                                    className="w-[100px]"
                                    onClick={() =>
                                        dispatch(saveCourseId(course.id))
                                    }
                                >
                                    <span className="me-1">Remove</span>{" "}
                                    <IoTrashOutline />
                                </Button>
                            </CustomButton>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
