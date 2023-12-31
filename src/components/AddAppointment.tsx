"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import AvailableSlotsBtn from "./AvailableSlotsBtn";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "./ui/use-toast";

type Props = {
  date: string;
  isToday: boolean;
  isPast: boolean;
  isFuture: boolean;
};

const AddAppointment = ({
  data,
  dateAppointments,
  openD,
  setOpenD,
}: {
  data: Props;
  dateAppointments: Appointment[];
  openD: boolean;
  setOpenD: (value: boolean) => void;
}) => {
  const [title, setTitle] = useState<string>("");
  const [end, setEnd] = useState<((value: Date) => void) | null>();
  const [start, setStart] = useState<((value: Date) => void) | null>();
  const [duration, setDuration] = useState<Number>(30);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setDuration(30);
    setStart(null);
    setEnd(null);
    setTitle("");
  }, [openD]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!start || !end || !title) {
      return toast({
        title: "Error",
        description: "Pick a duration",
        variant: "destructive",
        duration: 2000,
      });
    }
    setLoading(true);

    try {
      let date = data.date;
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ start, end, title, date }),
      });

      toast({
        title: "Success",
        description: "Appointment booked successfully",
        duration: 2000,
      });
      router.refresh();
      setOpenD(false);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      toast({
        title: "Erro",
        description: "something went wrong",
        variant: "destructive",
        duration: 3000,
      });
      setLoading(false);
    }
  };

  return (
    <Dialog
      onOpenChange={() => setOpenD(!openD)}
      open={openD}
      defaultOpen={openD}
    >
      <DialogContent className="bg-slate-300 border-2 border-red-700 !w-98% !max-w-2xl">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h1>{new Date(data.date).toDateString()}</h1>
          <div>
            <label className="block text-sm sm:text-[17px] font-medium leading-6 text-green-950">
              Appointment duration
            </label>
            <div className="mt-2">
              <Select
                defaultValue="30"
                onValueChange={(value) => setDuration(Number(value))}
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="30 minutes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Duration</SelectLabel>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1hour 30minutes</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="150">2hours 30minutes</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <label className="block text-sm sm:text-[17px] font-medium leading-6 text-green-950">
              Title
            </label>
            <div className="mt-2">
              <input
                id="title"
                name="title"
                type="text"
                autoComplete="title"
                required
                className="p-2 block w-full rounded-md border-0 py-1.5 text-green-950 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-green-950 focus:ring-2 focus:ring-inset focus:ring-green-950 sm:text-sm sm:leading-6"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          {/* Available Slots */}
          <div>
            <label className="block text-sm sm:text-[17px] font-medium leading-6 text-green-950">
              Available slots
            </label>
            <AvailableSlotsBtn
              duration={duration}
              dateAppointments={dateAppointments}
              dateStr={data.date}
              setEnd={(value: Date | ((value: Date) => void) | undefined) =>
                setEnd(() => value)
              }
              setStart={(value: Date | ((value: Date) => void) | undefined) =>
                setStart(() => value)
              }
            />
          </div>

          {/* Submit button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`flex w-full justify-center rounded-md bg-green-300 px-3 py-1.5 text-sm font-semibold leading-6 text-green-950 shadow-sm hover:bg-green-800  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 disabled:hover:bg-slate-300 disabled:opacity-25`}
            >
              Book Appointment
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAppointment;
