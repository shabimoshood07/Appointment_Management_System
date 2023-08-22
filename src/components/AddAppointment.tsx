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
}

type currentEvents = {
  title?: String
  date?: String
  start?: String
  end?: String
  editable?: Boolean
  color?: String
}

const AddAppointment = ({ data, currentEvents, onClose }: { data: Props, currentEvents: currentEvents[], onClose: () => void }) => {
  const [allDay, setAllDay] = useState(true)
  const [openD, setOpenD] = useState(true)

  const validateTime = (time) => {
    const selectedTime = new Date(time);
    console.log("selectedTime", selectedTime);


    for (let event of currentEvents) {
      // if(!event.start || !event.end){
      //   const time = new Date(event.date);
      // }
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);
      console.log(event.start, event.end);
      console.log(eventEnd, eventStart);
      if (selectedTime >= eventStart && selectedTime <= eventEnd) {
        return false;
      }
    }

    return true;
  };

  const toggleAllDay = () => {
    setAllDay(!allDay)
  }
  console.log(data.date);




  return (
    <Dialog onOpenChange={() => setOpenD(!openD)} open={openD} defaultOpen={openD} >
      <DialogTrigger asChild >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 sm:w-6 sm:h-6 absolute top-0 z-10 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v12m6-6H6"
          />
        </svg>
      </DialogTrigger>
      <DialogContent className="bg-slate-300">
        <form className="space-y-6">
          <h1>{data.date.toDateString()}</h1>
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
                className=" p-2 block w-full rounded-md border-0 py-1.5 text-green-950 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-green-950 focus:ring-2 focus:ring-inset focus:ring-green-950 sm:text-sm sm:leading-6"

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


          {allDay &&
            (<>
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
                      if (!validateTime(e.target.value)) {
                        e.preventDefault();
                        alert('This time is not available.');
                      }
                    }}
                  />
                  <input
                    type="time"
                    required
                    className=" p-2 block w-full rounded-md border-0 py-1.5 text-green-950 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-green-950 focus:ring-2 focus:ring-inset focus:ring-green-950 sm:text-sm sm:leading-6"
                    step="1800"
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
                    className=" p-2 block w-full rounded-md border-0 py-1.5 text-green-950 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-green-950 focus:ring-2 focus:ring-inset focus:ring-green-950 sm:text-sm sm:leading-6" onChange={(e) => {
                      if (!validateTime(e.target.value)) {
                        e.preventDefault();
                        alert('This time is not available.');
                      }
                    }}
                  />
                </div>

              </div>
            </>
            )
          }

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
