import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  const appointment = await prisma.appointment.findUnique({
    where: {
      id: id,
    },
  });
  console.log(appointment);

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

  return (
    <div>
      <h1 className="text-center w-full text-slate-300 my-4 text-[25px] md:text-[35px] lg:text-[40px] ">
        Appointment details
      </h1>
      <h1 className="text-slate-300">{appointment.title}</h1>
      <h1 className="text-slate-300">{new Date(appointment.date).toLocaleDateString()}</h1>
      <h1 className="text-slate-300">{appointment.start.toLocaleTimeString()}</h1>
      <h1 className="text-slate-300">{appointment.end.toLocaleTimeString()}</h1>
      <h1 className="text-slate-300">{appointment.status}</h1>
    </div>
  );
};

export default page;
