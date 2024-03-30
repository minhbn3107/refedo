"use client";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { saveCourseName } from "@/lib/features/course-name/courseNameSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useEffect, useState } from "react";

function Course({ courses }: { courses: string[] | null }) {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<
        (string | undefined) | null
    >(null);

    useEffect(() => {
        if (selectedCourse) {
            dispatch(saveCourseName(selectedCourse));
        }
    }, [selectedCourse, dispatch]);

    return (
        <div className="flex items-center space-x-4">
            <p className="text-sm text-muted-foreground">Course</p>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-[150px] justify-start"
                    >
                        {selectedCourse ? (
                            <>{selectedCourse}</>
                        ) : (
                            <>+ Add to Course</>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" side="right" align="start">
                    <Command>
                        <CommandInput placeholder="Change course..." />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
                                {courses
                                    ? courses.map((course) => (
                                          <CommandItem
                                              key={course}
                                              value={course}
                                              onSelect={(value) => {
                                                  setSelectedCourse(
                                                      courses.find(
                                                          (priority) =>
                                                              priority === value
                                                      ) || null
                                                  );
                                                  setOpen(false);
                                              }}
                                          >
                                              {course}
                                          </CommandItem>
                                      ))
                                    : null}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default Course;
