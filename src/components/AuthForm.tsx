"use client";
import React from "react";
import { useToast } from "@/components/ui/use-toast";

type AuthFormProps = {
  formAction: (formData: FormData) => Promise<void> | Promise<Boolean | string>;
  title: string;
};

const AuthForm = ({ formAction, title }: AuthFormProps) => {
  const { toast } = useToast();

  const handlesubmit = async (formData: FormData) => {
    const data = await formAction(formData);

    if (data === true) {
      toast({
        title: "Successful",
        description: ` ${title} successfully`,
      });
    } else {
      toast({
        title: "Error",
        description: data as string,
        variant: "destructive",
      });
    }

    console.log("data from form", data);
  };

  return (
    <form className="space-y-6" action={handlesubmit}>
      <div>
        <label className="block text-sm sm:text-[17px] font-medium leading-6 text-slate-300">
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className=" p-2 block w-full rounded-md border-0 py-1.5 text-green-950 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-green-950 focus:ring-2 focus:ring-inset focus:ring-green-950 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm sm:text-[17px] font-medium leading-6 text-slate-300"
          >
            Password
          </label>
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className=" p-2 block w-full rounded-md border-0 py-1.5 text-green-950 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-green-950 focus:ring-2 focus:ring-inset focus:ring-green-950 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-slate-300 px-3 py-1.5 text-sm font-semibold leading-6 text-green-950 shadow-sm hover:bg-green-800  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
        >
          {title}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
