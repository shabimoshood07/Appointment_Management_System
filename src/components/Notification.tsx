import { getAllAppointments } from "@/lib/actions";
import React from "react";

const Notification = async () => {
  const appointments = await getAllAppointments();

  const unread = appointments.filter((app: Appointment) => {
    if (app.status === "PENDING") {
      return app;
    }
  });

  return (
    <div className="relative cursor-pointer">
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
      <p className="absolute text-center h-5 w-5 -top-2 bg-red-500 text-slate-300 rounded-full p-1 -right-1 text-[10px] font-bold">
        {unread.length}
      </p>
    </div>
  );
};

export default Notification;
