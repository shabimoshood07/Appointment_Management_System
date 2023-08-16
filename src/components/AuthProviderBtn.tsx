"use client";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
const AuthProviderBtn = () => {
  return (
    <div className="flex justify-center flex-col items-center gap-4">
      <p className="border border-slate-300 w-full mt-8 mb-6 relative flex justify-center items-center">
        <span className="absolute top-[-13px] bg-green-950  text-slate-300 px-4">
          or continue with
        </span>
      </p>
      <button
        className="flex items-center justify-center gap-3 w-full px-3 py-1.5 rounded-md bg-slate-300 text-[18px] hover:bg-green-800"
        onClick={() => signIn("google")}
      >
        <FcGoogle /> Google
      </button>
      <button
        className="flex items-center justify-center gap-3 w-full px-3 py-1.5 rounded-md bg-slate-300 text-[18px] hover:bg-green-800"
        onClick={() => signIn("github")}
      >
        <FaGithub />
        Github
      </button>
    </div>
  );
};

export default AuthProviderBtn;
