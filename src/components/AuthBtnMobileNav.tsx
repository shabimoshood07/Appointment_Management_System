"use client";
import { MenubarItem } from "./ui/menubar";
import { signIn } from "next-auth/react";
const AuthBtnMobileNav = () => {
  return (
    <MenubarItem
      className="cursor-pointer font-bold text-center block  hover:!bg-green-500"
      onClick={() => signIn()}
    >
      Login / Signup
    </MenubarItem>
  );
};

export default AuthBtnMobileNav;
