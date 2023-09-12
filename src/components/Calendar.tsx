"use client";

import { useEffect, useState } from "react";
import { Calendar } from "./ui/calendar";
import AvailableSlotsBtn from "./AvailableSlotsBtn";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { getAllAppointments } from "@/lib/actions";

const CalendarComp = ({
  allAppointments,
}: {
  allAppointments: Appointment[];
}) => {
  const [title, setTitle] = useState<string>("");
  const [end, setEnd] = useState<((value: Date) => void) | null>();
  const [start, setStart] = useState<((value: Date) => void) | null>();
  const [duration, setDuration] = useState<Number>(30);
  const [loading, setLoading] = useState(false);
  const [dateAppointments, setDateAppointments] = useState<Appointment[] | []>(
    []
  );
  const [date, setDate] = useState<Date | undefined | null>();

  const router = useRouter();

  const getDateAppointments = async (dateStr: string) => {
    setDateAppointments(() => {
      return allAppointments.filter(
        (appt: Appointment) => appt.date === dateStr
      );
    });
  };

  useEffect(() => {
    setDuration(30);
    setStart(null);
    setEnd(null);
    setTitle("");
  }, []);

  const formatDateToString = (date: Date) => {
    let year = String(date.getFullYear());
    let month = String(date.getMonth() + 1);
    month = month.padStart(2, "0");
    let day = String(date.getDate());
    day = day.padStart(2, "0");
    let formattedDate = year + "-" + month + "-" + day;
    return formattedDate;
  };

  useEffect(() => {
    if (date) {
      const formattedDate = formatDateToString(date);
      getDateAppointments(formattedDate);
    }
  }, [date]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!start || !end || !title || !date) {
      return toast({
        title: "Error",
        description: "Pick a date and duration",
        variant: "destructive",
        duration: 3000,
      });
    }
    setLoading(true);
    let formattedDate = formatDateToString(date as Date);

    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ start, end, title, date: formattedDate }),
      });

      toast({
        title: "Success",
        description: "Appointment booked successfully",
        duration: 2000,
      });
      setLoading(false);
      setDuration(30);
      setStart(null);
      setEnd(null);
      setTitle("");
      setDate(null);
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "something went wrong",
        variant: "destructive",
        duration: 3000,
      });
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-300 py-4 flex flex-col  px-2 w-[98%] mx-auto my-4 rounded-md gap-4 max-w-5xl"
    >
      <div>
        <label className="block text-sm sm:text-[17px] lg:text-[20px]  font-medium leading-6 text-green-950">
          Appointment duration
        </label>
        <div className="mt-2 max-w-md">
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
        <label className="block text-sm sm:text-[17px] lg:text-[20px]  font-medium leading-6 text-green-950">
          Title
        </label>
        <div className="mt-2 max-w-md">
          <input
            id="title"
            name="title"
            type="text"
            autoComplete="title"
            required
            className="p-2 block w-full rounded-md border-0 py-1.5 text-green-950 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-green-950 focus:ring-2 focus:ring-inset focus:ring-green-950 sm:text-sm sm:leading-6"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>

      {/* Calender and available slots */}
      <div className="lg:flex gap-6">
        <div>
          <label className="block text-sm sm:text-[17px] lg:text-[20px]  font-medium leading-6 text-green-950">
            Select a date
          </label>
          <Calendar
            mode="single"
            selected={date as Date}
            onSelect={setDate}
            className="rounded-md border shadow bg-green-950 text-slate-300 w-fit mt-2 !text-[50px]"
            fromDate={new Date()}
          />
        </div>

        {date && (
          <div className="flex-1 mt-4 lg:mt-0">
            <label className="block mb-2 text-sm sm:text-[17px] lg:text-[20px] font-medium leading-6 text-green-950">
              Available Slots
            </label>
            <AvailableSlotsBtn
              duration={duration}
              dateStr={formatDateToString(date)}
              dateAppointments={dateAppointments}
              setEnd={(value: Date | ((value: Date) => void) | undefined) =>
                setEnd(() => value)
              }
              setStart={(value: Date | ((value: Date) => void) | undefined) =>
                setStart(() => value)
              }
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        className={` w-[98%] max-w-md inline-block mx-auto justify-center rounded-md bg-green-300 px-3 py-1.5 text-sm font-semibold leading-6 text-green-950 shadow-sm hover:bg-green-800  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 disabled:hover:bg-slate-300 disabled:opacity-25`}
      >
        submit
      </button>
    </form>
  );
};

export default CalendarComp;
