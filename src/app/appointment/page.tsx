import { columns } from "@/components/Column";
import { DataTable } from "@/components/data-table";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getUserAppointments } from "@/lib/actions";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
// export const revalidate = 0

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  const data = await getUserAppointments(session.user.id);

  // const myData = await prisma.appointment.findMany({
  //   where: {
  //     userId: session.user.id,
  //   },
  // });

  // const res = await fetch(
  //   process.env.URL + "/api/appointment/" + `${session.user.id}`,
  //   {
  //     cache: "no-store",
  //     next: { tags: ["all"] },
  //   }
  // );
  // const { userAppointments } = await res.json();

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
