"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

type Props = {
  date: Date;
  // dow: number;
  // isDisabled: boolean;
  // isOther: boolean;
  isToday: boolean;
  isPast: boolean;
  isFuture: boolean;
  // isMonthStart: boolean;
  // dayNumberText: string;
};

type currentappointmentss = {
  title?: String;
  date?: String;
  start?: String;
  end?: String;
  editable?: Boolean;
  color?: String;
};

const AddAppointment = ({
  data,
  appointments,
  openD,
  setOpenD,
}: {
  data: Props;
  appointments: Appointment[];
  openD: boolean;
  setOpenD: (value: boolean) => void;
}) => {
  const [allDay, setAllDay] = useState(true);
  const [formdata, setFormdata] = useState({
    start: "",
    end: "",
    title: "",
  });
  console.log("data", data);
  console.log("appappointments",appointments);

  const validateTime = (time: string) => {
    const selectedTime = new Date(time) as Date;
    console.log("selectedTime", selectedTime);

    for (let appointment of appointments) {
      if (appointment.start && appointment.end) {
        // const appointmentsStart = new Date(appointments.start);
        // const appointmentsEnd = new Date(appointments.end);
        const appointmentsStart = new Date(appointment.start.toString());
        const appointmentsEnd = new Date(appointment.end.toString());
        console.log(appointment.start, appointment.end);
        console.log(appointmentsEnd, appointmentsStart);
        if (
          selectedTime >= appointmentsStart &&
          selectedTime <= appointmentsEnd
        ) {
          return false;
        }

        return true;
      }
    }
  };

  const toggleAllDay = () => {
    setAllDay(!allDay);
  };

  const handleSbmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let start = new Date(formdata.start);
    let end = new Date(formdata.end);
    let title = formdata.title;
    let date = data.date;

    console.log(typeof date);
    console.log("formdata", start, end, title, typeof date);

    const res = await fetch("/api/appointment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ start, end, title, date }),
    });
    return;
  };

  return (
    <Dialog
      onOpenChange={() => setOpenD(!openD)}
      open={openD}
      defaultOpen={openD}
    >
      <DialogContent className="bg-slate-300">
        <form className="space-y-6" onSubmit={handleSbmit}>
          <h1>{new Date(data.date).toDateString()}</h1>
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
                onChange={(e) =>
                  setFormdata({ ...formdata, title: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex justify-start items-center gap-2">
            <label className="block text-sm sm:text-[17px] font-medium leading-6 text-green-950">
              All Day
            </label>
            <input
              id="all-day"
              name="all-day"
              type="checkbox"
              autoComplete="all-day"
              className="  text-green-950 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-green-950 sm:text-sm sm:leading-6"
              onChange={toggleAllDay}
            />
          </div>

          {allDay && (
            <>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="start"
                    className="block text-sm sm:text-[17px] font-medium leading-6 text-green-950"
                  >
                    start
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="start"
                    name="start"
                    type="datetime-local"
                    autoComplete="start"
                    required
                    className=" p-2 block w-full rounded-md border-0 py-1.5 text-green-950 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-green-950 focus:ring-2 focus:ring-inset focus:ring-green-950 sm:text-sm sm:leading-6"
                    onChange={(e) => {
                      console.log(e.target.value);

                      if (!validateTime(e.target.value)) {
                        e.preventDefault();
                        alert("This time is not available.");
                      }
                      setFormdata({ ...formdata, start: e.target.value });
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="end"
                    className="block text-sm sm:text-[17px] font-medium leading-6 text-green-950"
                  >
                    end
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="end"
                    name="end"
                    type="datetime-local"
                    autoComplete="end"
                    required
                    className=" p-2 block w-full rounded-md border-0 py-1.5 text-green-950 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-green-950 focus:ring-2 focus:ring-inset focus:ring-green-950 sm:text-sm sm:leading-6"
                    onChange={(e) => {
                      if (!validateTime(e.target.value)) {
                        e.preventDefault();
                        alert("This time is not available.");
                      }
                      setFormdata({ ...formdata, end: e.target.value });
                    }}
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-300 px-3 py-1.5 text-sm font-semibold leading-6 text-green-950 shadow-sm hover:bg-green-800  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 disabled:hover:bg-slate-300 disabled:opacity-25"
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
