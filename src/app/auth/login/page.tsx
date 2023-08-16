import AuthProviderBtn from "@/components/AuthProviderBtn";
import AuthForm from "@/components/AuthForm";
import { login } from "@/lib/authFunctions";

import Link from "next/link";

const Login = async () => {
  return (
    <div className="flex mt-14 flex-col justify-center">
      <div className="w-[90%] mx-auto sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-left text-2xl font-bold leading-9 tracking-tight text-slate-300">
          Login
        </h2>
      </div>
      <div className="mt-10 w-[90%] mx-auto sm:w-full sm:max-w-sm">
        <AuthForm formAction={login} title="Login" />
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

export default Login;
