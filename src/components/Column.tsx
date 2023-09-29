"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { deleteAppointment } from "@/lib/actions";
import AlertDialogComp from "./AlertDialog";
import { toast } from "./ui/use-toast";

export type Appointment = {
  id: string;
  title: string;
  date: string;
  start: string;
  end: string;
  status: string;
};

const handleDelete = async (appoinmentId: string) => {
  try {
    await deleteAppointment(appoinmentId, "admin-appointment");
    toast({
      title: "Successful",
      variant: "default",
      description: "Appointment deleted successfully",
    });
  } catch (error) {
    console.log("delete error", error);

    toast({
      variant: "destructive",
      description: "Something went wrong",
    });
  }
};

export const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return <p className="text-left text-slate-300">Title</p>;
    },
    cell: ({ row }) => {
      return <p className="text-left">{row.getValue("title")}</p>;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
          className="flex justify-center w-full text-slate-300"
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: (a, b) => {
      return (
        new Date(b.original.date).getTime() -
        new Date(a.original.date).getTime()
      );
    },
  },
  {
    accessorKey: "start",
    header: ({ column }) => {
      return <p className="text-center text-slate-300">Start</p>;
    },
  },
  {
    accessorKey: "end",
    header: ({ column }) => {
      return <p className="text-center text-slate-300">End</p>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <p className="text-center text-slate-300">Status</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <>
          <AlertDialogComp
            // type="delete"
            action={() => handleDelete(appointment.id)}
            promptMessage="Appointment will be deleted permanently"
            heading="Are you sure?"
          />
        </>
      );
    },
  },
];
