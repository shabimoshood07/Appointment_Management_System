"use client";
// import Layout from "@/components/layout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import timeGridPlugin from "@fullcalendar/timegrid";
import { formatDate } from "@fullcalendar/core";
import { useState } from "react";
import AddAppointment from "@/components/AddAppointment";
// import { ReactDOM } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReactDOM from "react-dom";

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
  const [currentEvents, setCurrentEvents] = useState([
    {
      id: Math.random(),
      title: "event 1",
      date: "2023-08-17",
      start: "08:00",
      resourceId: "a",
    },
    {
      id: Math.random(),
      title: "event 2",
      date: "2023-08-18",
      start: "08:00",
      resourceId: "b",
    },
  ]);

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }

  const handleDateClick = (arg) => {
    // bind with an arrow function
    console.log(arg);
    alert(arg.dateStr);
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
            All Events ({currentEvents.length})
          </h2>
          <ul>
            {currentEvents.map((event) => {
              let date = new Date(event.date).toISOString().replace(/T.*$/, "");

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
            // right: "resourceTimelineWeek,dayGridMonth,timeGridWeek",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          //   initialView="resourceTimelineWeek"
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
          initialEvents={currentEvents.map((evn) => {
            const { start, title, date } = evn;
            let d =
              new Date(date).toISOString().replace(/T.*$/, "") + "T12:00:00";
            console.log("d", d);
            return { title, start: d, resourceId: "c" };
          })}
          events={[
            {
              title: "sleep",
              date: "2023-08-21",
              start:
                new Date("2023-08-21").toISOString().replace(/T.*$/, "") +
                "T12:00:00",
              end:
                new Date("2023-08-21").toISOString().replace(/T.*$/, "") +
                "T15:00:00",
              editable: true,
              color: "yellow",
            },
            { title: "eat", date: "2023-08-20" },
          ]}
          eventContent={renderEventContent}
          eventBackgroundColor="#E8C547"
          // dateClick={handleDateClick}
          dayCellDidMount={(info) => {
            const container = document.createElement("div"); // Create a container element
            info.el.appendChild(container); // Append the container to the day cell

            // Render the AddAppointment component into the container
            ReactDOM.render(<AddAppointment />, container);

            // Cleanup when the day cell is unmounted
            // info.el.addEventListener("DOMNodeRemoved", () => {
            //   ReactDOM.unmountComponentAtNode(container);
            // });
            // const componentHTML = ReactDOMServer.renderToStaticMarkup(
            //   <AddAppointment text={info.dayNumberText} />
            // );
            // info.el.innerHTML = componentHTML;

            // return <h1>new</h1>;
          }}
          // select={() => console.log("selected")}
          // dayCellContent={(argg) => {
          //   const { dayNumberText } = argg;
          //   console.log("argg", argg);
          //   return <AddAppointment />;
          // }}
          // dayCellContent=<AddAppointment />
        />
      </div>
    </div>
  );
}
