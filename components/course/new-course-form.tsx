"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { NewCourse } from "@/schemas";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { DialogFooter } from "../ui/dialog";
import { newCourse } from "@/actions/new-course";
import { useCurrentUser } from "@/hooks/use-current-user";
import { toast } from "sonner";

interface NewCourseFormProps {
    setOpen: (open: boolean) => void;
}

export const NewCourseForm: React.FC<NewCourseFormProps> = ({ setOpen }) => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const user = useCurrentUser();

    const form = useForm<z.infer<typeof NewCourse>>({
        resolver: zodResolver(NewCourse),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    const onSubmit = (values: z.infer<typeof NewCourse>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            newCourse(values, user?.id as string).then((data) => {
                if (data?.error) {
                    setError(data.error);
                }

                if (data?.success) {
                    form.reset();
                    toast.success(data.success, {
                        action: {
                            label: "Close",
                            onClick: () => {},
                        },
                    });
                    setSuccess(data.success);
                    setOpen(false);
                }
            });
        });
    };

    return (
        <>
            <div className="grid gap-4 py-4">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Course Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="Length must not exceed 100 characters"
                                                type="text"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="Length must not exceed 1000 characters"
                                                type="text"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <DialogFooter>
                            <Button type="submit">Add New Course</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </div>
        </>
    );
};
