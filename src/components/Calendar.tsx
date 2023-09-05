"use client";

import { FormEvent, useEffect, useState } from "react";
import { Calendar } from "./ui/calendar";
import AvailableSlotsBtn from "./AvailableSlotsBtn";
import AddAppointment from "./AddAppointment";
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

const CalendarComp = () => {
  const [title, setTitle] = useState<string>("");
  const [end, setEnd] = useState<((value: Date) => void) | null>();
  const [start, setStart] = useState<((value: Date) => void) | null>();
  const [duration, setDuration] = useState<Number>(30);
  const [loading, setLoading] = useState(false);
  const [dateAppointments, setDateAppointments] = useState([]);
  const [date, setDate] = useState<Date>(new Date());

  const router = useRouter();

  const getDateAppointments = async (dateStr: string) => {
    const appointments = await getAllAppointments();
    setDateAppointments(() => {
      return appointments.filter((appt) => appt.date === dateStr);
    });
  };

  useEffect(() => {
    setDuration(30);
    setStart(null);
    setEnd(null);
    setTitle("");
    setDate(new Date());
  }, []);

  useEffect(() => {
    getDateAppointments(date?.toISOString().split("T")[0]);
    console.log("dateappointments", dateAppointments);
    // console.log("appointments", appointments);
  }, [date]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("data", date);
    console.log("data", date?.toISOString());
    console.log("data", date?.toISOString().split("T")[0]);
    console.log("data", date?.toLocaleDateString("en-US").split("/").join("-"));
    // console.log("data", date?.toLocaleString("en-US", { timeZone: "local" }));

    // if (!start || !end || !title) {
    //   return toast({
    //     title: "Error",
    //     description: "Pick a duration",
    //     variant: "destructive",
    //     duration: 2000,
    //   });
    // }
    // setLoading(true);

    // try {
    //   const res = await fetch("/api/appointment", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ start, end, title, date }),
    //   });

    //   toast({
    //     title: "Success",
    //     description: "Appointment booked successfully",
    //     duration: 2000,
    //   });
    //   router.refresh();
    //   setLoading(false);
    // } catch (error) {
    //   toast({
    //     title: "Erro",
    //     description: "something went wrong",
    //     variant: "destructive",
    //     duration: 3000,
    //   });
    //   setLoading(false);
    // }
  };
  // console.log("data", date?.toISOString().split("T")[0]);

  return (
    <form onSubmit={handleSubmit} className="bg-slate-300">
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

      <Calendar
        mode="single"
        selected={date}
        // selected={date?.toISOString().split("T")[0]}
        onSelect={setDate}

        className="rounded-md border shadow bg-slate-300 w-fit"
      />


      <input type="date" />

      <AvailableSlotsBtn
        duration={duration}
        dateStr={date?.toISOString().split("T")[0]}
        // dateStr={date?.toDateString()}
        dateAppointments={dateAppointments}
        setEnd={(value: Date | ((value: Date) => void) | undefined) =>
          setEnd(() => value)
        }
        setStart={(value: Date | ((value: Date) => void) | undefined) =>
          setStart(() => value)
        }
      />

      <button type="submit">submit</button>
      {/* <AddAppointment /> */}
    </form>
  );
};

export default CalendarComp;
