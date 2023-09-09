import { columns } from "@/components/Column";
import { DataTable } from "@/components/data-table";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getUserAppointments } from "@/lib/actions";

// export const dynamic = 'force-dynamic' 
export const revalidate = 0

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  const data = await getUserAppointments(session.user.id);

  const formattedData = data.map((appt: Appointment) => {
    return {
      ...appt,
      date: new Date(appt.date).toDateString(),
      start: new Date(appt.start).toLocaleTimeString(),
      end: new Date(appt.end).toLocaleTimeString(),
    };
  });

  return (
    <div className=" w-[98%] max-w-6xl mx-auto py-10">
      <h1 className="text-center w-full text-slate-300 my-4 text-[25px] md:text-[35px] lg:text-[40px] ">
        Your Appointments
      </h1>
      <DataTable columns={columns} data={formattedData} />
    </div>
  );
};

export default page;
