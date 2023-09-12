"use client";

import { signIn } from "next-auth/react";
import { FormEvent } from "react";

export const login = async (formData: FormData) => {
  return await signIn<"credentials">("credentials", {
    redirect: false,
    email: formData.get("email"),
    password: formData.get("password"),
  }).then(({ ok, error }: any) => {
    if (error) {
      return error;
    } else {
      return ok;
    }
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

  if (res.status !== 201) {
    const data = await res.json();
    return data?.error;
  }
  const data = await res.json();

  return await signIn("credentials", {
    redirect: false,
    email: data.user.email,
    password: formData.get("password"),
    callbackUrl: "/",
  }).then(({ ok, error }: any) => {
    if (error) {
      return error;
    } else {
      return ok;
    }
  });
};

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
  const data = await res.json();
  if (!data.user) return null;
  await signIn("credentials", {
    email: data.user.email,
    password: form.get("password"),
    callbackUrl: "/",
  });
}
