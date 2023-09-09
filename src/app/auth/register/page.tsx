import AuthProviderBtn from "@/components/AuthProviderBtn";
import AuthForm from "@/components/AuthForm";
import Link from "next/link";
import React from "react";
import { register } from "@/lib/authFunctions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Register = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");
  return (
    <div className="flex mt-12 flex-col justify-center">
      <div className="w-[90%] mx-auto sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-left text-2xl font-bold leading-9 tracking-tight text-slate-300">
          Register
        </h2>
      </div>
      <div className="mt-6 w-[90%] mx-auto sm:w-full sm:max-w-sm">
        <AuthForm formAction={register} title="Create account" />
        <div>
          <AuthProviderBtn />
          <p className="w-full text-right mt-4 text-slate-300 text-sm">
            Don&apos;t have an account?
            <Link href="/auth/login" className="text-base">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
