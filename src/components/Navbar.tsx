import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import AuthBtnMobileNav from "./AuthBtnMobileNav";
import LogoutBtnMobileNav from "./LogoutBtnMobileNav";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AuthBtnDesktopNav from "./AuthBtnDesktopNav";
import LogoutBtnDesktopNav from "./LogoutBtnDesktopNav";
import { navlinks } from "@/lib/navlinks";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  console.log("session", session);

  return (
    <nav className="border-2 border-slate-200 bg-slate-200 px-2 py-2">
      <div className="flex justify-between items-center w-[98%] md:w-[90%] max-w-6xl mx-auto">
        <Link href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 md:w-9 md:h-9 text-green-950 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            />
          </svg>
        </Link>

        {/* MObile Nav */}
        <div className="md:hidden">
          <Menubar className="!bg-transparent p-0">
            <MenubarMenu>
              <MenubarTrigger className="!bg-transparent p-0 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 md:w-10 md:h-10 text-green-950"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"
                  />
                </svg>
              </MenubarTrigger>
              {session ? (
                <MenubarContent className="ml-[-9rem]  md:!hidden">
                  {navlinks.map((link, index) => {
                    if (link.name === "Profile") {
                      return (
                        <>
                          <Link href={link.href}>
                            <MenubarItem
                              className="cursor-pointer hover:!bg-green-500"
                              key={index}
                            >
                              {link.name}
                              <MenubarShortcut>
                                {session?.user.image ? (
                                  <Image
                                    src={session?.user.image.toString()}
                                    height={25}
                                    width={25}
                                    className="rounded-full"
                                    alt="Profile image"
                                  />
                                ) : (
                                  <>{link.icon}</>
                                )}
                              </MenubarShortcut>
                            </MenubarItem>
                          </Link>

                          <MenubarSeparator />
                        </>
                      );
                    }
                    return (
                      <>
                        <Link href={link.href}>
                          <MenubarItem
                            className="cursor-pointer hover:!bg-green-500"
                            key={index}
                          >
                            {link.name}
                            <MenubarShortcut>{link.icon}</MenubarShortcut>
                          </MenubarItem>
                        </Link>

                        <MenubarSeparator />
                      </>
                    );
                  })}
                  <LogoutBtnMobileNav />
                </MenubarContent>
              ) : (
                <MenubarContent className="ml-[-9rem]  md:!hidden">
                  <MenubarItem className="cursor-pointer hover:!bg-green-500">
                    About
                    <MenubarShortcut>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-green-950"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                        />
                      </svg>
                    </MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator />
                  <AuthBtnMobileNav />
                </MenubarContent>
              )}
            </MenubarMenu>
          </Menubar>
        </div>

        {/* Desktop Navv */}
        <div className="hidden md:flex justify-center items-center">
          {session ? (
            <ul className="flex justify-between gap-10 items-center">
              {navlinks.map((link, index) => {
                if (link.name === "Profile") {
                  return (
                    <li
                      className="text-[18px] text-green-950 cursor-pointer font-medium flex items-center"
                      key={index}
                    >
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger>
                            <Link href={link.href}>
                              {session?.user.image ? (
                                <Image
                                  src={session?.user.image.toString()}
                                  alt="Img"
                                  height={35}
                                  width={35}
                                  className="rounded-full"
                                />
                              ) : (
                                <>{link.icon}</>
                              )}
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{link.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </li>
                  );
                }
                return (
                  <li className="text-[18px] text-green-950 cursor-pointer font-medium flex items-center">
                    <Link href={link.href}>
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger>{link.icon}</TooltipTrigger>
                          <TooltipContent>
                            <p>{link.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Link>
                  </li>
                );
              })}
              <LogoutBtnDesktopNav />
            </ul>
          ) : (
            <ul className="flex justify-between gap-10 items-center content-center">
              <li className="text-[18px] text-green-950 cursor-pointer font-medium flex items-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-8 h-8 text-green-950"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                        />
                      </svg>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>About</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
              <li>
                <AuthBtnDesktopNav props=" bg-green-950 hover:bg-green-800 text-slate-300" />
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
