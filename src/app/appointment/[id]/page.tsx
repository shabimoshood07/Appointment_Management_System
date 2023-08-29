import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const session = await getServerSession(authOptions);
  const appointment = await prisma.appointment.findUnique({
    where: {
      id: id,
    },
  });
  console.log(appointment);

  if (!appointment)
    return (
      <div>
        <h1 className="text-slate-300 text-center">No Appointment found</h1>;
        <button>Go back</button>
      </div>
    );

  return <div>{params.id}</div>;
};

export default page;
