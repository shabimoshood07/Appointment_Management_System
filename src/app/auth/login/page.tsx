import AuthProviderBtn from "@/components/AuthProviderBtn";
import AuthForm from "@/components/AuthForm";
import { login } from "@/lib/authFunctions";

import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Login = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  return (
    <div className="flex mt-12 flex-col justify-center">
      <div className="w-[90%] mx-auto sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-left text-2xl font-bold leading-9 tracking-tight text-slate-300">
          Login
        </h2>
      </div>
      <div className="mt-6 w-[90%] mx-auto sm:w-full sm:max-w-sm">
        <AuthForm formAction={login} title="Login" />
        <div>
          <AuthProviderBtn />
          <p className="w-full text-right mt-4 text-slate-300 text-sm">
            Don't have an account? <Link href="/auth/register" className="text-base">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
