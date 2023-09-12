import CalendarComp from "@/components/Calendar";
import { getAllAppointments } from "@/lib/actions";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic' 
// export const revalidate = 0

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  const appointments = await getAllAppointments();

  return (
    <div className="max-w-6xl mx-auto ">
      <h1 className="text-center w-full text-slate-300 my-4 text-[25px] md:text-[35px] lg:text-[38px] ">
        Book Appointment
      </h1>

      <div className="mx-auto max-w-6xl">
        <CalendarComp allAppointments={appointments} />
      </div>
    </div>
  );
};

export default page;
