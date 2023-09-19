import AppointmentCalendar from "@/components/AppointmentCalendar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
// import { getAllAppointments, getUserAppointments } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import Loading from "../loading";

export const dynamic = "force-dynamic";

export const getAllAppointments = async () => {
  const res = await fetch(process.env.URL + "/api/appointment", {
    cache: "no-store",
  });
  const { appointments } = await res.json();
  return appointments;
};

export const getUserAppointments = async (id: string) => {
  // const res = await fetch(
  //   process.env.URL + "/api/appointments/" + `123456789`,
  const res = await fetch(process.env.URL + "/api/appointment/" + `${id}`, {
    cache: "no-store",
  });
  const { userAppointments } = await res.json();
  return userAppointments;
};

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
  //  else {
  //   throw new Error("Something went wrong");
  // }

  // const allAppointments = await prisma.appointment.findMany({});
  // const userAppointments = await prisma.appointment.findMany({
  //   where: {
  //     userId: session.user.id,
  //   },
  // });

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
