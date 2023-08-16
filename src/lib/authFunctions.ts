"use client"

import { signIn } from "next-auth/react";
import { FormEvent } from "react";

export const login = async (formData: FormData) => {
    await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        // callbackUrl: "/",
    });
};


export const register = async (formData: FormData) => {
    const res = await fetch("/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: formData.get("email"),
            password: formData.get("password"),
        }),
    });

    console.log("res", res);

    if (res.status !== 201) {
        const data = await res.json();
        return alert(data?.error)
    }
    const data = await res.json();

    await signIn("credentials", {
        email: data.user.email,
        password: formData.get("password"),
        callbackUrl: "/",
    });
    // if (!data.user) throw new Error("New Error");



}



export async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const res = await fetch("/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: form.get("email"),
            password: form.get("password"),
        }),
    });

    console.log("res", res);

    const data = await res.json();
    console.log("data", data);
    if (!data.user) return null;

    await signIn("credentials", {
        email: data.user.email,
        password: form.get("password"),
        callbackUrl: "/",
    });
}