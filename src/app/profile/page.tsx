"use client";
// import Layout from "@/components/layout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import timeGridPlugin from "@fullcalendar/timegrid";
import { formatDate } from "@fullcalendar/core";
import { useState } from "react";

// function renderSidebarEvent(event) {
//   return (
//     <li key={event.id}>
//       <b>
//         {formatDate(event.start, {
//           year: "numeric",
//           month: "short",
//           day: "numeric",
//         })}
//       </b>
//       <i>{event.title}</i>
//     </li>
//   );
// }

function renderEventContent(eventInfo) {
  console.log("eventInfo", eventInfo);

  return (
    <p className="flex justify-center items-center w-full">
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </p>
  );
}
// export function sidebar() {
//   return (
//     <div className="demo-app-sidebar">
//       <div className="demo-app-sidebar-section">
//         <h2>Instructions</h2>
//         <ul>
//           <li>Select dates and you will be prompted to create a new event</li>
//           <li>Drag, drop, and resize events</li>
//           <li>Click an event to delete it</li>
//         </ul>
//       </div>
//       <div className="demo-app-sidebar-section">
//         <label>
//           <input
//             type="checkbox"
//             checked={this.state.weekendsVisible}
//             onChange={this.handleWeekendsToggle}
//           ></input>
//           toggle weekends
//         </label>
//       </div>
//       <div className="demo-app-sidebar-section">
//         <h2>All Events ({this.state.currentEvents.length})</h2>
//         <ul>{this.state.currentEvents.map(renderSidebarEvent)}</ul>
//       </div>
//     </div>
//   );
// }

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
    alert(arg.dateStr);
  };

  return (
    // <Layout>
    <div className="demo-app flex flex-col items-center py-4 md:p-0 md:flex-row md:items-start md:min-h-[calc(100vh-60px)] max-w-6xl mx-auto gap-8 ">
      <div className="demo-app-sidebar w-full max-w-[400px] mx-auto self-stretch">
        <div className="demo-app-sidebar-section">
          <h2>Instructions</h2>
          <ul>
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
          <h2>All Events ({currentEvents.length})</h2>
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

      <div className="demo-app-main w-[95%] mx-auto md:w-full md:p-2">
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
            let d = new Date().toISOString().replace(/T.*$/, "") + "T12:00:00";
            console.log("d", d);
            return { title, start: d, resourceId: "c" };
          })}
          events={[
            {
              title: "sleep",
              date: "2023-08-19",
              start:
                new Date("2023-08-19").toISOString().replace(/T.*$/, "") +
                "T12:00:00",
              end:
                new Date("2023-08-19").toISOString().replace(/T.*$/, "") +
                "T15:00:00",
            },
            { title: "eat", date: "2023-08-20" },
          ]}
          eventContent={renderEventContent}
          dateClick={handleDateClick}
        />
      </div>
    </div>
    // </Layout>
  );
}
