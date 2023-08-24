"use client";
import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Page = () => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [duration, setDuration] = useState(1); // duration in hours

  const getAllAppointments = async () => {
    const res = await fetch("/api/appointment");
    console.log("res", res);
    const { appointments } = await res.json();
    console.log("data", appointments);
    setAppointments(appointments);
  };

  useEffect(() => {
    getAllAppointments();
  }, []);

  const handleClick = (startHour, endHour) => {
    console.log(startHour, endHour);

    const startDate = new Date();
    startDate.setHours(startHour, 0, 0, 0); // set minutes, seconds, and milliseconds to 0

    const endDate = new Date();
    endDate.setHours(endHour, 0, 0, 0); // set minutes, seconds, and milliseconds to 0

    console.log(startDate, endDate);
    setSelectedTime({ start: startDate, end: endDate });
  };

  // Generate time slots based on duration
  const generateTimeSlots = (start, end, duration) => {
    const slots = [];
    for (let i = start; i < end; i += duration) {
      slots.push({ start: i, end: i + duration });
    }
    return slots;
  };

  const timeSlots = generateTimeSlots(8, 17, duration); // from 8:00 to 17:00
  console.log(timeSlots);

  return (
    <div>
      <Select
        onValueChange={(e) => {
          setDuration(Number(e));
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Appointment duration" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0.5">30 minutes</SelectItem>
          <SelectItem value="1">1hour</SelectItem>
          <SelectItem value="1.5">1hour 30minutes</SelectItem>
          <SelectItem value="2">2 hours</SelectItem>
          <SelectItem value="2.5">2hours 30minutes</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex gap-4 flex-wrap p-4">
        {timeSlots.map((slot, index) => {
          let startHourDate = new Date();
          startHourDate.setHours(slot.start, 0, 0, 0);

          let endHourDate = new Date();
          endHourDate.setHours(slot.end, 0, 0, 0);
          console.log(startHourDate, endHourDate, "start and end ");

        //   startHourDate = startHourDate.toLocaleString();
        //   endHourDate = endHourDate.toLocaleString();

          const isBooked = appointments.some((appointment) => {
            const appointmentStart = new Date(appointment.start);
            const appointmentEnd = new Date(appointment.end);

            console.log(
              appointment.start,
              appointment.end,
              appointment.title,
              "form DB"
            );
            console.log(appointmentStart, appointmentEnd, appointment.title);

            return (
              (appointmentStart >= startHourDate &&
                appointmentStart < endHourDate) ||
              (appointmentEnd > startHourDate && appointmentEnd <= endHourDate)
            );
          });

          return (
            <button
              key={index}
              className="bg-slate-300 disabled:bg-red-400 selection:bg-green-950"
              onClick={() => handleClick(slot.start, slot.end)}
              disabled={isBooked}
            >
              {slot.start}:00 - {slot.end}:00
            </button>
          );
        })}
      </div>
      {selectedTime && (
        <p className="text-slate-300">
          Selected time: {selectedTime.start.toLocaleString()} -
          {selectedTime.end.toLocaleString()} - {new Date().toLocaleString()}
        </p>
      )}
    </div>
  );
};

export default Page;
