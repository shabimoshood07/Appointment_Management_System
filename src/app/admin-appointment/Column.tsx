"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { deleteAppointment } from "@/lib/actions";
import AlertDialogComp from "@/components/AlertDialog";
import { toast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    await deleteAppointment(appoinmentId);
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
    cell: ({ row, column, cell }) => {
      return <p className="text-center">{row.getValue("status")}</p>;

      // (
      //   <Select defaultValue={row.getValue("status")}>
      //     <SelectTrigger className="w-[180px]">
      //       <SelectValue placeholder={row.getValue("status")} />
      //     </SelectTrigger>
      //     <SelectContent>
      //       <SelectItem value="light">Light</SelectItem>
      //       <SelectItem value="dark">Dark</SelectItem>
      //       <SelectItem value="system">System</SelectItem>
      //     </SelectContent>
      //   </Select>
      // );

      // (
      //   <DropdownMenu>
      //     <DropdownMenuTrigger>Open</DropdownMenuTrigger>
      //     <DropdownMenuContent>
      //       <DropdownMenuLabel>My Account</DropdownMenuLabel>
      //       <DropdownMenuSeparator />
      //       <DropdownMenuItem>Profile</DropdownMenuItem>
      //       <DropdownMenuItem>Billing</DropdownMenuItem>
      //       <DropdownMenuItem>Team</DropdownMenuItem>
      //       <DropdownMenuItem>Subscription</DropdownMenuItem>
      //     </DropdownMenuContent>
      //   </DropdownMenu>
      // );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <>
          <AlertDialogComp
            type="edit"
            action={() => handleDelete(appointment.id)}
            heading="Edit Appointment"
          />
        </>
      );
    },
  },
];
