"use client";

import * as z from "zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchSchema } from "@/schemas";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export const SearchForm = () => {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof SearchSchema>>({
        resolver: zodResolver(SearchSchema),
        defaultValues: {
            data: "",
        },
    });

    const onSubmit = (values: z.infer<typeof SearchSchema>) => {
        startTransition(() => {
            console.log(values);
        });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-row justify-center mt-8"
            >
                <FormField
                    control={form.control}
                    name="data"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    {...field}
                                    disabled={isPending}
                                    placeholder="Search for documents..."
                                    className="w-[600px] h-14 rounded-3xl text-lg"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <span className="relative right-14 top-1">
                    <Button
                        disabled={isPending}
                        type="submit"
                        className="absolute px-4 rounded-full size-12"
                        variant="ghost"
                    >
                        <FaSearch size={20} />
                    </Button>
                </span>
            </form>
        </Form>
    );
};
