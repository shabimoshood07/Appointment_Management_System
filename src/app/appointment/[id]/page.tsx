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

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

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

      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Title</TableHead>
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-center">Start</TableHead>
            <TableHead className="text-center">End</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow key={appointment.id}>
            <TableCell className="border border-red-500 text-left">{appointment.title}</TableCell>
            <TableCell className="border border-red-500 text-center">{appointment.date}</TableCell>
            <TableCell className="border border-red-500 text-center">{appointment.start.toLocaleTimeString()}</TableCell>
            <TableCell className="border border-red-500 text-center">{appointment.end.toLocaleTimeString()}</TableCell>
            <TableCell className="border border-red-500 text-center">{appointment.status}</TableCell>
            <TableCell className="border border-red-500 text-center">
              <button>delete</button> <button>edit</button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
