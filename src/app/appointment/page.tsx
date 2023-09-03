import { Payment, columns } from "@/components/Column";
import { DataTable } from "@/components/data-table";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getUserAppointments } from "@/lib/actions";

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
    <div className="max-w-6xl mx-auto py-10">
      <DataTable columns={columns} data={formattedData} />
    </div>
  );
};

export default page;
