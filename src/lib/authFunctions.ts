"use client";

import { signIn } from "next-auth/react";
import { FormEvent } from "react";

export const login = async (formData: FormData) => {
  return await signIn<"credentials">("credentials", {
    redirect: false,
    email: formData.get("email"),
    password: formData.get("password"),
    callbackUrl: "/",
  }).then(({ ok, error }) => {
    console.log(ok, error);
    if (error) {
      console.log("error", error);
      return error;
    } else {
      console.log("error", error);
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

  console.log("res", res);

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
  }).then(({ ok, error }) => {
    console.log(ok, error);
    if (error) {
      console.log("error", error);
      return error;
    } else {
      console.log("ok", ok);
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
