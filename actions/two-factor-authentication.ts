"use server";

import * as z from "zod";

import { TwoFactorAuthenticationSchema } from "@/schemas";
// import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const twoFactorAuthentication = async (
    values: z.infer<typeof TwoFactorAuthenticationSchema>,
    email: string,
    password: string,
    callbackUrl?: string | null
) => {
    const validateFields = TwoFactorAuthenticationSchema.safeParse(values);

    if (!validateFields.success) {
        return { error: "Invalid Fields!" };
    }

    const { code } = validateFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email does not exist" };
    }

    const twoFactorToken = await getTwoFactorTokenByEmail(existingUser?.email);

    if (!twoFactorToken || twoFactorToken.token !== code) {
        return { error: "Invalid code!" };
    }

    const hasExpired = new Date(twoFactorToken.expires) < new Date();

    if (hasExpired) {
        return { error: "Code expired!" };
    }

    await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
    });

    // const existingConfirmation = await getTwoFactorConfirmationByUserId(
    //     existingUser.id
    // );

    // if (existingConfirmation) {
    //     await db.twoFactorConfirmation.delete({
    //         where: { id: existingConfirmation.id },
    //     });
    // }

    // await db.twoFactorConfirmation.create({
    //     data: {
    //         userId: existingUser.id,
    //     },
    // });

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" };
                default:
                    return { error: "Something went wrong!!" };
            }
        }
        throw error;
    }
};
