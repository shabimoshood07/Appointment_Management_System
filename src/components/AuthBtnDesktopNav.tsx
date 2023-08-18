"use client";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

const AuthBtnDesktopNav = ({ props }: { props?: string }) => {
  return (
    <Button className={`${props}`} onClick={() => signIn()}>
      Log in
    </Button>
  );
};

export default AuthBtnDesktopNav;
