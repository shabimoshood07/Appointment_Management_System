"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import timeGridPlugin from "@fullcalendar/timegrid";
import { formatDate } from "@fullcalendar/core";
import { useEffect, useState } from "react";
import AddAppointment from "@/components/AddAppointment";

function renderEventContent(eventInfo) {
  return (
    <p className="flex justify-center items-center w-full">
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </p>
  );
}

export default function CalendarPage() {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  //   {
  //     title: "sleep",
  //     date: "2023-08-21",
  //     start: "2023-08-23T09:00:00.000Z",
  //     // new Date("2023-08-23T09:00:00.000Z "),
  //     // new Date("2023-08-21").toISOString().replace(/T.*$/, "") + "T12:00:00",
  //     end: "2023-08-23T10:00:00.000Z",
  //     // new Date("2023-08-23T10:00:00.000Z"),
  //     // new Date("2023-08-21").toISOString().replace(/T.*$/, "") + "T15:00:00",
  //     // editable: true,
  //     // color: "yellow",
  //   },
  //   { title: "eat", date: "2023-08-20" },
  //   { title: "wash", date: "2023-08-20" },
  // ]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [dateAppointments, setDateAppointments] = useState<Appointment[] | []>(
    []
  );

  const [isAddAppointmentVisible, setIsAddAppointmentVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const [openD, setOpenD] = useState(false);

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

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }

  const handleDateClick = (info) => {
    const appointmentsOnDate = appointments.filter(
      (app: Appointment) => app.date === info.dateStr.split("T")[0]
    );
    setDateAppointments(appointmentsOnDate);
    setSelectedDate(info.dateStr);
    setOpenD(!openD);
    setIsAddAppointmentVisible(true);
  };

  return (
    <div className="demo-app flex flex-col items-center py-4 md:p-0 md:flex-row md:items-start md:min-h-[calc(100vh-60px)] max-w-6xl mx-auto gap-8 !text-slate-300 ">
      <div className="demo-app-sidebar w-full max-w-[400px] mx-auto self-stretch !bg-slate-300 !text-green-950">
        <div className="demo-app-sidebar-section !ml-10">
          <h2 className="font-bold">Instructions</h2>
          <ul className="!list-disc">
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>

        <div className="demo-app-sidebar-section p-0">
          <label>
            <input
              type="checkbox"
              checked={weekendsVisible}
              onChange={handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div>
        <div className="demo-app-sidebar-section ">
          <h2 className="font-bold underline mb-4">
            All Events ({appointments.length})
          </h2>
          <ul>
            {appointments.length > 0 &&
              appointments.map((event) => {
                let date = new Date(event?.start);
                return (
                  <li key={event.id}>
                    <b>
                      {formatDate(date, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </b>
                    <i>{event.title}</i>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>

      <div className="demo-app-main p-2  mx-auto w-full md:p-2 bg-green-800">
        <FullCalendar
          plugins={[
            resourceTimelinePlugin,
            dayGridPlugin,
            interactionPlugin,
            timeGridPlugin,
          ]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          dayMaxEvents={true}
          weekends={weekendsVisible}
          nowIndicator={true}
          editable={true}
          selectable={true}
          selectMirror={true}
          resources={[
            { id: "a", title: "Auditorium A" },
            { id: "b", title: "Auditorium B", eventColor: "green" },
            { id: "c", title: "Auditorium C", eventColor: "orange" },
          ]}
          events={appointments}
          eventContent={renderEventContent}
          eventBackgroundColor="#E8C547"
          dateClick={handleDateClick}
        />

        {isAddAppointmentVisible && (
          <AddAppointment
            data={{
              date: selectedDate!,
              isToday:
                new Date(selectedDate!).toDateString() ===
                new Date().toDateString(),
              isPast: new Date(selectedDate!) < new Date(),
              isFuture: new Date(selectedDate!) > new Date(),
            }}
            openD={openD}
            setOpenD={setOpenD}
            dateAppointments={dateAppointments}
          />
        )}
      </div>
    </div>
  );
}
