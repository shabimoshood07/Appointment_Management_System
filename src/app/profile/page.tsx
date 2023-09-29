import AppointmentCalendar from "@/components/AppointmentCalendar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getAllAppointments, getUserAppointments } from "@/lib/actions";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const page = async () => {
  let allAppointments;
  let userAppointments;
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  const [getUserAppointment, getAllAppointment] = await Promise.allSettled([
    getUserAppointments(session.user.id),
    getAllAppointments(),
  ]);

  if (
    getAllAppointment.status === "fulfilled" &&
    getUserAppointment.status === "fulfilled"
  ) {
    allAppointments = getAllAppointment.value;
    userAppointments = getUserAppointment.value;
  }

  if (
    getAllAppointment.status === "rejected" ||
    getUserAppointment.status === "rejected"
  )
    throw new Error("Something went wrong");
  return (
    <>
      <AppointmentCalendar
        session={session}
        allAppointments={allAppointments}
        userAppointments={userAppointments}
      />
    </>
  );
};

export default page;
