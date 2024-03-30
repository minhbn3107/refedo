"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Input } from "@/components/ui/input";

import { TwoFactorAuthenticationSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { twoFactorAuthentication } from "@/actions/two-factor-authentication";
import { useAppSelector } from "@/lib/hooks";
import { selectDataForTwoFactorAuthentication } from "@/lib/features/two-factor-authentication/twoFactorAuthenticationSlice";

export const TwoFactorAuthenticationForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof TwoFactorAuthenticationSchema>>({
        resolver: zodResolver(TwoFactorAuthenticationSchema),
        defaultValues: {
            code: "",
        },
    });

    const { email, password, callbackUrl } = useAppSelector(
        selectDataForTwoFactorAuthentication
    );

    const onSubmit = (
        values: z.infer<typeof TwoFactorAuthenticationSchema>
    ) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            twoFactorAuthentication(values, email, password, callbackUrl);
        });
    };

    return (
        <CardWrapper
            headerLabel="Two Factor Authentication"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Two Factor Code</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="123456"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full"
                    >
                        Confirm
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
