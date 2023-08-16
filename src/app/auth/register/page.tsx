import AuthProviderBtn from "@/components/AuthProviderBtn";
import AuthForm from "@/components/AuthForm";
import Link from "next/link";
import React from "react";
import { register } from "@/lib/authFunctions";


const Register = () => {
  return (
    <div className="flex mt-14 flex-col justify-center">
      <div className="w-[90%] mx-auto sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-left text-2xl font-bold leading-9 tracking-tight text-slate-300">
          Register
        </h2>
      </div>
      <div className="mt-10 w-[90%] mx-auto sm:w-full sm:max-w-sm">
        <AuthForm formAction={register} title="Create account" />
        <div>
          <AuthProviderBtn />
          <p className="w-full text-right mt-4 text-slate-300">
            Don't have an account? <Link href="/auth/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
