import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
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

  console.log(appointment);
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-center w-full text-slate-300 my-4 text-[25px] md:text-[35px] lg:text-[40px] ">
        Appointment details
      </h1>

      <Table className="border text-slate-300">
        <TableHeader>
          <TableRow className="!text-slate-300">
            <TableHead className="text-slate-300  w-[300px]">Title</TableHead>
            <TableHead className="text-slate-300  text-center">Date</TableHead>
            <TableHead className="text-slate-300  text-center">Start</TableHead>
            <TableHead className="text-slate-300  text-center">End</TableHead>
            <TableHead className="text-slate-300  text-center">
              Status
            </TableHead>
            <TableHead className="text-slate-300  text-center">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow key={appointment.id}>
            <TableCell className=" text-left">{appointment.title}</TableCell>
            <TableCell className=" text-center">{appointment.date}</TableCell>
            <TableCell className=" text-center">
              {appointment.start.toLocaleTimeString()}
            </TableCell>
            <TableCell className=" text-center">
              {appointment.end.toLocaleTimeString()}
            </TableCell>
            <TableCell className=" text-center">{appointment.status}</TableCell>
            <TableCell className=" text-center">
              <button>delete</button> <button>edit</button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
