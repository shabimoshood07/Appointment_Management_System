"use client";
import React, { useEffect, useState } from "react";

const AvailableSlotsBtn = ({
  duration,
  dateAppointments,
  dateStr,
  setEnd,
  setStart,
}: {
  duration: Number;
  dateAppointments: Appointment[];
  dateStr: string;
  setEnd: (value: Date) => void;
  setStart: (value: Date) => void;
}) => {
  const [buttons, setButtons] = useState<React.JSX.Element[]>([]);
  const [selectedButtons, setSelectedButtons] =
    useState<React.JSX.Element | null>(null);

  const startTime = new Date("Thu Aug 24 2023 08:00:00 GMT+0100");
  const endTime = new Date("Thu Aug 24 2023 18:00:00 GMT+0100");

  const form = (dateStr: Date) => {
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleString([], {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    });
    return formattedDate;
  };
  console.log("dateappappointments", dateAppointments);

  useEffect(() => {
    const btns = [];
    let currentTime = startTime;
    while (currentTime < endTime) {
      const nextTime = new Date(
        currentTime.getTime() + Number(duration) * 60000
      );

      const buttonText = `${currentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })} - ${nextTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;

      // Check if the current time and nextTime fall within the start and end time of a booked appointment

      let isBooked = false;

      if (dateAppointments.length > 0) {
        const formatted = dateAppointments.map((app: Appointment) => {
          return { ...app, start: form(app.start), end: form(app.end) };
        });

        isBooked = formatted.some((appointment) => {
          const currentdateTime = new Date(
            `${dateStr.split("T")[0]}T${
              currentTime.toISOString().split("T")[1]
            }`
          ).toLocaleString([], {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZoneName: "short",
          });

          const nextdateTime = new Date(
            `${dateStr.split("T")[0]}T${nextTime.toISOString().split("T")[1]}`
          ).toLocaleString([], {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZoneName: "short",
          });

          return (
            (new Date(appointment.start).getTime() >=
              new Date(currentdateTime).getTime() &&
              new Date(appointment.start).getTime() <
                new Date(nextdateTime).getTime()) ||
            (new Date(appointment.end).getTime() >
              new Date(currentdateTime).getTime() &&
              new Date(appointment.end).getTime() <=
                new Date(nextdateTime).getTime())
          );
        });
      }

      btns.push(<button disabled={isBooked}>{buttonText}</button>);

      currentTime = nextTime;
    }

    setButtons(btns);
  }, [duration]);

  if (buttons.length > 0) {
    return (
      <div className="grid grid-cols-3 md:grid-cols-4 gap-x-1 md:gap-2">
        {buttons.length > 1 &&
          buttons.map((btn: React.JSX.Element, index) => (
            <input
              type={btn.type}
              key={index}
              className={`px-2 py-1 m-2 disabled:opacity-20 cursor-pointer disabled:cursor-default text-[10px] md:text-sm text-slate-300 w-full rounded-sm bg-green-950 ${
                selectedButtons === btn ? "!bg-green-800" : ""
              }`}
              onClick={(e) => {
                let date = dateStr;
                let st = new Date(e.target.value.split("-")[0] + "" + date);
                let en = new Date(e.target.value.split("-")[1] + "" + date);

                console.log(st, en);
                console.log(e.target.value);
                setEnd(en);
                setStart(st);

                setSelectedButtons(btn);
              }}
              value={btn.props.children}
              disabled={btn.props.disabled}
            />
          ))}
      </div>
    );
  }

  return <h1>Loading</h1>;
};

export default AvailableSlotsBtn;
