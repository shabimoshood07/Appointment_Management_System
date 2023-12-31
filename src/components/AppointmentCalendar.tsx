"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import timeGridPlugin from "@fullcalendar/timegrid";
import { formatDate } from "@fullcalendar/core";
import { useState } from "react";
import AddAppointment from "@/components/AddAppointment";
import { Session } from "next-auth";
import Link from "next/link";
import { toast } from "./ui/use-toast";

export default function AppointmentCalendar({
  session,
  allAppointments,
  userAppointments,
  role,
}: {
  session: Session;
  allAppointments: Appointment[];
  userAppointments?: Appointment[];
  role: "ADMIN" | "USER";
}) {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [dateAppointments, setDateAppointments] = useState<Appointment[] | []>(
    []
  );
  const [isAddAppointmentVisible, setIsAddAppointmentVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const [openD, setOpenD] = useState(false);

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }

  const handleDateClick = (info: any) => {
    const clickedDate = new Date(info.dateStr);
    const nowDate = new Date();

    const clickedDateWithoutTime = new Date(
      clickedDate.getFullYear(),
      clickedDate.getMonth(),
      clickedDate.getDate()
    );
    const nowDateWithoutTime = new Date(
      nowDate.getFullYear(),
      nowDate.getMonth(),
      nowDate.getDate()
    );

    if (clickedDateWithoutTime < nowDateWithoutTime) {
      toast({
        title: "Error",
        description: "Can not book appointment on past date",
        variant: "destructive",
        duration: 2000,
      });
    } else {
      const appointmentsOnDate = allAppointments.filter(
        (app: Appointment) => app.date === info.dateStr.split("T")[0]
      );
      setDateAppointments(appointmentsOnDate);
      setSelectedDate(info.dateStr);
      setOpenD(!openD);
      setIsAddAppointmentVisible(true);
    }
  };

  function renderEventContent(eventInfo: any) {
    let appointmentId = eventInfo.event._def.extendedProps.userId;
    let userId = session.user.id;
    let id = eventInfo.event._def.publicId;
    if (role === "USER") {
      return (
        <>
          {appointmentId === userId ? (
            <Link
              href={`/appointment/${id}`}
              className="w-full bg-green-400 flex justify-center items-center h-full rounded-sm"
            >
              <i className="w-full text-center text-green-950 block text-[12px] ">
                Booked!
              </i>
            </Link>
          ) : (
            <i className="w-full h-full text-center text-green-950  bg-red-500 cursor-default flex items-center justify-center text-[12px] rounded-sm">
              Booked!
            </i>
          )}
        </>
      );
    }

    if (role === "ADMIN") {
      return (
        <>
          {appointmentId === userId ? (
            <Link
              href={`/admin-appointment/${id}`}
              className="w-full bg-green-400 flex justify-center items-center h-full rounded-sm"
            >
              <i className="w-full text-center text-green-950 block text-[12px] ">
                ADMIN!
              </i>
            </Link>
          ) : (
            <Link
              href={`/admin-appointment/${id}`}
              className=" w-full bg-green-400 flex justify-center items-center h-full rounded-sm"
            >
              <i className="w-full text-center rounded-sm text-green-950 bg-red-500 block text-[12px] ">
                Booked!
              </i>
            </Link>
          )}
        </>
      );
    }
  }

  return (
    <div className="demo-app flex flex-col items-center py-4 md:p-0 md:flex-row md:items-start md:min-h-[calc(100vh-60px)] max-w-6xl mx-auto gap-8 !text-slate-300 ">
      {userAppointments && (
        <div className="demo-app-sidebar w-full max-w-[400px] mx-auto self-stretch !bg-slate-300 !text-green-950">
          <div className="demo-app-sidebar-section !ml-10">
            <h2 className="font-bold">Instructions</h2>
            <ul className="!list-disc">
              <li>
                Select dates and you will be prompted to create a new event
              </li>
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
            <h2 className="font-bold  mb-4 flex items-center gap-2 underline">
              Your Appointments ({userAppointments.length})
              <i className="bg-green-300 text-[10px] px-2 py-1 rounded-sm">
                Booked
              </i>
            </h2>
            <ul>
              {userAppointments?.length > 0 &&
                userAppointments.map((event) => {
                  let date = new Date(event.start);

                  return (
                    <li key={event.id} className="my-2">
                      <b>
                        {formatDate(date, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </b>
                      <i>
                        {event.title} {event.status}
                      </i>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      )}

      <div className="demo-app-main p-2  mx-auto w-full md:p-4 bg-green-800">
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
          droppable={false}
          selectMirror={true}
          resources={[
            { id: "a", title: "Auditorium A" },
            { id: "b", title: "Auditorium B", eventColor: "green" },
            { id: "c", title: "Auditorium C", eventColor: "orange" },
          ]}
          events={allAppointments}
          eventContent={renderEventContent}
          eventBackgroundColor="transparent"
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
