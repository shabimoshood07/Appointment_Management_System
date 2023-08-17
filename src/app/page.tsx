import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-60px)] max-w-6xl mx-auto p-2 xl:flex justify-evenly md:p-4">
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-96 h-96 absolute top-0"
      >
        <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
        <path
          fillRule="evenodd"
          d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
          clipRule="evenodd"
        />
      </svg> */}
      {/* <AiOutlineSchedule style={{ color: "red", fontSize: "11em" }} /> */}
      <h1 className="text-slate-300 text-[25px] capitalize text-center px-2 pt-9 sm:text-[40px] md:pt-2 md:text-[50px] xl:text-[60px] xl:text-left xl:mt-28 xl:w-fit flex-1">
        Manage your <span className="ml-2 uppercase">appointments</span>
      </h1>
      <div className="flex-1">
        <Image
          alt="hero"
          src="/hero1.png"
          width={400}
          height={400}
          className="my-4 md:my-0 block mx-auto"
        />
        {/* <button className="bg-slate-300 text-green-950 py-2 rounded-sm px-4 mx-auto block w-[95%] font-semibold sm:w-[50%] sm:text-xl md:text-2xl xl:w-full md:mt-6">
          Book an Appointment
        </button> */}
        <Skeleton className="bg-slate-300 text-green-950 py-2 rounded-sm px-4 mx-auto block w-[95%] font-semibold sm:w-[50%] sm:text-xl md:text-2xl xl:w-full md:mt-6 text-center cursor-pointer">
          Book an Appointment
        </Skeleton>
      </div>
    </div>
  );
}
