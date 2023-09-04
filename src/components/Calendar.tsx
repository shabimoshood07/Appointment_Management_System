"use client";

import { useState } from "react";
import { Calendar } from "./ui/calendar";
import AvailableSlotsBtn from "./AvailableSlotsBtn";
import AddAppointment from "./AddAppointment";

const CalendarComp = () => {
  const startTime = new Date("Thu Aug 24 2023 08:00:00 GMT+0100");
  const endTime = new Date("Thu Aug 24 2023 18:00:00 GMT+0100");

  const [date, setDate] = useState<Date>(new Date());
  const [duration, setDuration] = useState(30);
  const [dateAppointments, setDateAppointments] = useState([]);
  const [end, setEnd] = useState<(value: Date) => void>(null);
  const [start, setStart] = useState<(value: Date) => void>(null);

  //   duration;
  //   dateAppointments;
  //   dateStr;
  //   setEnd;
  //   setStart;

  return (
    <>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow bg-slate-300 w-fit"
      />

      <AvailableSlotsBtn
        duration={duration}
        dateStr={date?.toDateString()}
        dateAppointments={dateAppointments}
        setEnd={setEnd}
        setStart={setStart}
      />
      {/* <AddAppointment /> */}
    </>
  );
};

export default CalendarComp;
