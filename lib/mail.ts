// import { Resend } from "resend";
import nodemailer from "nodemailer";

const user = process.env.EMAIL;
const pass = process.env.PASSWORD;

// const resend = new Resend(process.env.RESEND_API_KEY);
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
        user,
        pass,
    },
});

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`;

    await transporter.sendMail({
        from: "Next Auth <onboarding@resend.dev>",
        to: email,
        subject: "Confirm your email",
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm email!</p>`,
    });

    // await resend.emails.send({
    //     from: "Next Auth <onboarding@resend.dev>",
    //     to: email,
    //     subject: "Confirm your email",
    //     html: `<p>Click <a href="${confirmLink}">here</a> to confirm email!</p>`,
    // });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `${domain}/auth/new-password?token=${token}`;

    await transporter.sendMail({
        from: "Next Auth <onboarding@resend.dev>",
        to: email,
        subject: "Reset your password",
        html: `<p>Click <a href="${resetLink}">here</a> to reset password!</p>`,
    });

    // await resend.emails.send({
    //     from: "Next Auth <onboarding@resend.dev>",
    //     to: email,
    //     subject: "Reset your password",
    //     html: `<p>Click <a href="${resetLink}">here</a> to reset password!</p>`,
    // });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
    await transporter.sendMail({
        from: "Next Auth <onboarding@resend.dev>",
        to: email,
        subject: "2FA Code",
        html: `<p>Your 2FA code: ${token}</p>`,
    });

    // await resend.emails.send({
    //     from: "Next Auth <onboarding@resend.dev>",
    //     to: email,
    //     subject: "2FA Code",
    //     html: `<p>Your 2FA code: ${token}</p>`,
    // });
};
