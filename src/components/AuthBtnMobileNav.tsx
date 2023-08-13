"use client";
import { MenubarItem } from "./ui/menubar";
import { signIn } from "next-auth/react";
const AuthBtnMobileNav = () => {
  return (
    <MenubarItem
      className="cursor-pointer font-bold text-center block  hover:!bg-green-800 hover:!text-slate-300"
      onClick={() => signIn()}
    >
      Sign in / Sign up
    </MenubarItem>
  );
};

export default AuthBtnMobileNav;
