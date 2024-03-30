"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter } from "next/navigation";

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
import { useAppDispatch } from "@/lib/hooks";
import { DialogFooter } from "../ui/dialog";
import { newCourse } from "@/actions/new-course";
import { useSession } from "next-auth/react";

export const NewCourseForm = () => {
    const searchParams = useSearchParams();
    const urlError =
        searchParams.get("error") === "OAuthAccountNotLinked"
            ? "Email already in use with different provider!"
            : "";
    const router = useRouter();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const session = useSession();

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
            newCourse(values, session.data?.user.id as string).then((data) => {
                if (data?.error) {
                    setError(data.error);
                }

                if (data?.success) {
                    form.reset();
                    setSuccess(data.success);
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
                        <FormError message={error || urlError} />
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
