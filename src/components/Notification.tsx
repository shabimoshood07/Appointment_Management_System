"use client";
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

const Notification = ({ appointments }: { appointments: Appointment[] }) => {
  const unread = appointments.filter((app: Appointment) => {
    if (app.status === "PENDING") {
      return app;
    }
  });

  return (
    <Menubar className="bg-transparent w-fit p-0 m-0">
      <MenubarMenu>
        <MenubarTrigger className="bg-transparent relative p-0 m-0 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            />
          </svg>
          <p className="absolute text-center h-5 w-5 -top-2 bg-red-500 text-slate-300 rounded-full p-0 -right-1 text-[10px] font-bold">
            {unread.length}
          </p>
        </MenubarTrigger>

        <MenubarContent align="center" className="bg-slate-300 text-green-950">
          {unread.map((appt: Appointment) => {
            const { id, status, userId, date } = appt;
            return (
              <Link href={`/admin-appointment/${id}`} key={id}>
                <MenubarItem className="gap-8 cursor-pointer">
                  New Booking <MenubarShortcut>{date}</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
              </Link>
            );
          })}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Notification;
