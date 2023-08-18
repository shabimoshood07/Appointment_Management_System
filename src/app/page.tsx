import { Skeleton } from "@/components/ui/skeleton";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "./api/auth/[...nextauth]/route";
import AuthProviderBtn from "@/components/AuthProviderBtn";
import AuthBtnDesktopNav from "@/components/AuthBtnDesktopNav";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-[calc(100vh-60px)] max-w-6xl mx-auto p-2 xl:flex justify-evenly md:p-4">
      <h1 className="text-slate-300 text-[25px] capitalize text-center px-2 pt-9 sm:text-[40px] md:pt-2 md:text-[50px] xl:text-[60px] xl:text-left  xl:w-fit flex-1 xl:my-auto">
        Manage your <span className="ml-2 uppercase">appointments</span>
      </h1>
      <div className="flex flex-col flex-1  justify-center self-stretch">
        <Image
          alt="hero"
          src="/hero1.png"
          width={400}
          height={400}
          className="my-4 md:my-0 block mx-auto"
        />
        {session && session.user.role === "USER" && (
          <Skeleton className="bg-slate-300 text-green-950 py-2 rounded-sm px-4 mx-auto block w-[95%] font-semibold sm:w-[50%] sm:text-xl md:text-2xl xl:w-full md:mt-6 text-center cursor-pointer">
            Book an Appointment
          </Skeleton>
        )}
        {session && session.user.role === "ADMIN" && (
          <Skeleton className="bg-slate-300 text-green-950 py-2 rounded-sm px-4 mx-auto block w-[95%] font-semibold sm:w-[50%] sm:text-xl md:text-2xl xl:w-full md:mt-6 text-center cursor-pointer">
            View all Appointment
          </Skeleton>
        )}

        {!session && (
          <>
            <div className=" flex justify-center gap-10">
              <Link href="/auth/register">
                <Button className="bg-slate-300 hover:bg-green-800 text-green-950">
                  Register
                </Button>
              </Link>
              <AuthBtnDesktopNav props="bg-slate-300 hover:bg-green-800 text-green-950" />
            </div>
            <AuthProviderBtn />
          </>
        )}
      </div>
    </div>
  );
}
