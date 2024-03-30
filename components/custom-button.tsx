"use client";

import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
    DialogHeader,
    DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";

interface CustomButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect";
    asChild?: boolean;
    padding?: boolean;
    route?: string;
    comp?: JSX.Element;
    header?: boolean;
    title?: string;
    description?: string;
}

export const CustomButton = ({
    children,
    mode = "redirect",
    asChild,
    padding = false,
    route,
    comp,
    header,
    title,
    description,
}: CustomButtonProps) => {
    const router = useRouter();

    const onClick = () => {
        if (mode === "redirect") router.push(route as string);
    };

    const [open, setOpen] = useState(false);

    if (mode === "modal") {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
                <DialogContent
                    className={`${
                        padding ? "p-4" : "p-0"
                    } w-auto border-none rounded-xl border bg-card text-card-foreground shadow-md`}
                >
                    {header && (
                        <DialogHeader>
                            <DialogTitle>{title}</DialogTitle>
                            <DialogDescription>{description}</DialogDescription>
                        </DialogHeader>
                    )}
                    {comp}
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    );
};
