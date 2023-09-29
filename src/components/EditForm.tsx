"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { prisma } from "@/lib/prisma";
import { updateAppointment } from "@/lib/actions";
import { Edit2, Trash2Icon } from "lucide-react";
import { revalidatePath } from "next/cache";
import { useState } from "react";

export type Appointment = {
  id: string;
  title: string;
  date: string;
  start: string;
  end: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

const EditForm = ({ appointment }: { appointment: Appointment }) => {
  const [open, setOpen] = useState(false);
  const handleSubmit = async (formData: FormData) => {
    await updateAppointment(formData, appointment.id);
    setOpen(!open);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>
        <Edit2 className="text-slate-300" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-green-950">
            Edit Appointment
          </AlertDialogTitle>
        </AlertDialogHeader>
        <form className="space-y-6" action={handleSubmit}>
          <div>
            <label className="block text-sm sm:text-[17px] font-medium leading-6 text-green-950">
              Title
            </label>
            <div className="mt-2">
              <input
                id="title"
                name="title"
                type="text"
                required
                className=" p-2 block w-full rounded-md border-0 py-1.5 text-green-950 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-green-950 focus:ring-2 focus:ring-inset focus:ring-green-950 sm:text-sm sm:leading-6"
                value={appointment.title}
                readOnly
              />
            </div>
          </div>
          <div>
            <label className="block text-sm sm:text-[17px] font-medium leading-6 text-green-950">
              Start
            </label>
            <div className="mt-2">
              <input
                id="start"
                name="start"
                type="text"
                required
                className=" p-2 block w-full rounded-md border-0 py-1.5 text-green-950 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-green-950 focus:ring-2 focus:ring-inset focus:ring-green-950 sm:text-sm sm:leading-6"
                value={appointment.start}
                readOnly
              />
            </div>
          </div>
          <div>
            <label className="block text-sm sm:text-[17px] font-medium leading-6 text-green-950">
              End
            </label>
            <div className="mt-2">
              <input
                id="end"
                name="end"
                type="text"
                required
                className=" p-2 block w-full rounded-md border-0 py-1.5 text-green-950 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-green-950 focus:ring-2 focus:ring-inset focus:ring-green-950 sm:text-sm sm:leading-6"
                value={appointment.end}
                readOnly
              />
            </div>
          </div>
          <div>
            <label className="block text-sm sm:text-[17px] font-medium leading-6 text-green-950">
              Status: {appointment.status}
            </label>
            {appointment && (
              <Select name="status">
                <SelectTrigger className="w-[180px] mt-2">
                  <SelectValue placeholder="Update Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="CONFIRMED">CONFIRM</SelectItem>
                    <SelectItem value="CANCELLED">CANCEL</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">Update</AlertDialogAction>
            <button type="submit">Update</button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditForm;
