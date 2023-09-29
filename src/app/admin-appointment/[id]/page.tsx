import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { DataTable } from "@/components/data-table";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { columns } from "../Column";
import { getAllAppointments } from "@/lib/actions";

const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session.user.role === "USER") redirect("/");
  await getAllAppointments();
  const appointment = await prisma.appointment.findUnique({
    where: {
      id: id,
    },
  });


  if (!appointment)
    return (
      <div className="min-h-[70vh] flex items-center flex-col justify-center max-w-6xl mx-auto">
        <h1 className="text-slate-300 text-center text-[30px] sm:text-[40px]">
          No Appointment found
        </h1>
        ;
        <button className=" rounded-sm bg-slate-300 text-green-950 px-4 py-2 font-bold hover:bg-green-300 sm:text-[20px]">
          Go back
        </button>
      </div>
    );
  const formattedData = {
    ...appointment,
    date: new Date(appointment?.date).toDateString(),
    start: new Date(appointment?.start).toLocaleTimeString(),
    end: new Date(appointment?.end).toLocaleTimeString(),
  };
  return (
    <div className="w-[98%] max-w-6xl mx-auto">
      <h1 className="text-center w-full text-slate-300 my-4 text-[25px] md:text-[35px] lg:text-[40px] ">
        Appointment details
      </h1>

      <DataTable columns={columns} data={[formattedData]} />
    </div>
  );
};

export default page;
