"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { deleteAppointment } from "@/lib/actions";
import AlertDialogComp from "./AlertDialog";
import { toast } from "./ui/use-toast";
import { DeleteIcon } from "@/lib/navlinks";

export type Appointment = {
  id: string;
  title: string;
  date: string;
  start: string;
  end: string;
  status: string;
};

const handleDelete = async (appoinmentId: string) => {
  await deleteAppointment(appoinmentId);
  try {
    toast({
      title: "Successful",
      variant: "default",
      description: "Appointment deleted successfully",
    });
  } catch (error) {
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
    header: ({ column, table }) => {
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
        // <DropdownMenu>
        //   <DropdownMenuTrigger asChild>
        //     <Button variant="ghost" className="h-8 w-8 p-0">
        //       <span className="sr-only">Open menu</span>
        //       <MoreHorizontal className="h-4 w-4" />
        //     </Button>
        //   </DropdownMenuTrigger>
        //   <DropdownMenuContent align="end">
        //     <DropdownMenuSeparator />
        //     <DropdownMenuItem  className="cursor-pointer">Cancel Appointment</DropdownMenuItem>
        //     <DropdownMenuSeparator />
        //     <DropdownMenuItem  className="cursor-pointer">Delete Appointment</DropdownMenuItem>
        //   </DropdownMenuContent>
        // </DropdownMenu>

        <>
          <AlertDialogComp
            type="delete"
            action={() => handleDelete(appointment.id)}
            promptMessage="Appointment will be deleted permanently"
          />

          <div>
            {/* <button onClick={() => deleteAppointment(appointment.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-red-500"
              >
                <path
                  fillRule="evenodd"
                  d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                  clipRule="evenodd"
                />
              </svg>
            </button> */}
            {/* <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                clipRule="evenodd"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button> */}
          </div>
        </>
      );
    },
  },
];
