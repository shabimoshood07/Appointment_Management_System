import { columns } from "./Column";
import { DataTable } from "@/components/data-table";
import { getAllAppointments } from "@/lib/actions";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const AdminAppointment = async () => {
  const allAppointments = await getAllAppointments();
  const formattedData = allAppointments.map((appt: Appointment) => {
    return {
      ...appt,
      date: new Date(appt.date).toDateString(),
      start: new Date(appt.start).toLocaleTimeString(),
      end: new Date(appt.end).toLocaleTimeString(),
    };
  });
  return (
    <div className=" w-[98%] max-w-6xl mx-auto py-10">
      <h1 className="text-center w-full text-slate-300 my-4 text-[25px] md:text-[35px] lg:text-[40px] ">
        All Client Appointments
      </h1>
      <DataTable columns={columns} data={formattedData} />
    </div>
  );
};

export default AdminAppointment;
