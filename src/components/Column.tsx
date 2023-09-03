"use client";

import { ColumnDef } from "@tanstack/react-table";
import { start } from "repl";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  title: string;
  date: number;
  start: string;
  end: string;
  status: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return <p>Title</p>;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return <p className="text-center">Date</p>;
    },
  },
  {
    accessorKey: "start",
    header: ({ column }) => {
      return <p className="text-center">Start</p>;
    },
  },
  {
    accessorKey: "end",
    header: ({ column }) => {
      return <p className="text-center">End</p>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <p className="text-center">Status</p>;
    },
  },
];
