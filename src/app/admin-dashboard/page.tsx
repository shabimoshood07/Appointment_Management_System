import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import CalendarComp from "@/components/Calendar";
import { getAllAppointments } from "@/lib/actions";
import AppointmentCalendar from "@/components/AppointmentCalendar";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const AdminDashboard = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session.user.role === "USER") redirect("/");
  const appointments = await getAllAppointments();
  return (
    <>
      <div>
        <h1 className="text-center w-full text-slate-300 my-4 text-[25px] md:text-[35px] lg:text-[40px] ">
          Admin Dashboard
        </h1>
      </div>
      <div>
        <AppointmentCalendar
          allAppointments={appointments}
          session={session}
          role="ADMIN"
        />
      </div>
    </>
  );
};

export default AdminDashboard;
