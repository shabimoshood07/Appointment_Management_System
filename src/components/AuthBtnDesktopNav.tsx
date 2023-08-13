"use client";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
const AuthBtnDesktopNav = () => {
  return <Button className="bg-green-950 hover:bg-green-800 text-slate-300" onClick={() => signIn()}>Sign in / Sign up</Button>;
};

export default AuthBtnDesktopNav;
