"use client";

import { removeCourse } from "@/actions/remove-course";
import { Button } from "../ui/button";
import { useAppSelector } from "@/lib/hooks";
import { selectCourseId } from "@/lib/features/remove-course/removeCourseSlice";
import { toast } from "sonner";

interface ConfirmRemoveProps {
    setOpen: (open: boolean) => void;
}

export const ConfirmRemove: React.FC<ConfirmRemoveProps> = ({ setOpen }) => {
    const courseId = useAppSelector(selectCourseId);

    const handleConfirmRemove = () => {
        setOpen(false);
        removeCourse(courseId).then((data: any) => {
            if (data.error) {
                toast.error(data.error, {
                    action: {
                        label: "Close",
                        onClick: () => {},
                    },
                });
            }

            if (data.success) {
                toast.success(data.success, {
                    action: {
                        label: "Close",
                        onClick: () => {},
                    },
                });
            }
        });
    };

    return (
        <div className="flex justify-end gap-2">
            <Button variant="default" onClick={() => setOpen(false)}>
                Cancel
            </Button>
            <Button variant="destructive" onClick={() => handleConfirmRemove()}>
                Confirm
            </Button>
        </div>
    );
};
