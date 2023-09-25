import { signIn } from "next-auth/react";

export const loginUser = async ({ email, password }) => {
    const res = await signIn("credentials", {
        redirect: false,
        email,
        password
    });

    return res;
};
export const loginUser2 = async ({ emailAdmin, password }) => {
    const res = await signIn("credentials", {
        redirect: false,
        emailAdmin,
        password
    });

    return res;
};