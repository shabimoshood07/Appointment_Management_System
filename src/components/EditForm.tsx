"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateAppointment } from "@/lib/actions";
import { Edit2 } from "lucide-react";
import { FaSpinner } from "react-icons/fa";
import { useEffect, useState } from "react";
import { toast } from "./ui/use-toast";
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
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    setStatus("");
  }, []);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      await updateAppointment(formData, appointment.id);
      toast({
        title: "Success",
        description: "Appointment updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setOpen(!open);
      setLoading(false);
    }
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

            <Select name="status" onValueChange={(value) => setStatus(value)}>
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
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-green-950 text-slate-300 px-3 py-2 rounded-md hover:bg-green-800 duration-300 hover:text-slate-300">
              Cancel
            </AlertDialogCancel>
            {status !== "" && (
              <button
                type="submit"
                className="bg-green-950 text-slate-300 px-3 py-2 rounded-md hover:bg-green-800 duration-300"
              >
                {loading ? <FaSpinner /> : "Update"}
              </button>
            )}
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditForm;
