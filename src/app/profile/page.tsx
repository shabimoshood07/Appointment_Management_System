import AppointmentCalendar from "@/components/AppointmentCalendar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getAllAppointments, getUserAppointments } from "@/lib/actions";
import { prisma } from "@/lib/prisma";

// export const dynamic = 'force-dynamic'
export const revalidate = 0;
const Profile = async () => {
  // let allAppointments;
  // let userAppointments;
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  // const [getUserAppointment, getAllAppointment] = await Promise.allSettled([
  //   getUserAppointments(session.user.id),
  //   getAllAppointments(),
  // ]);

  // if (
  //   getAllAppointment.status === "fulfilled" &&
  //   getUserAppointment.status === "fulfilled"
  // ) {
  //   allAppointments = getAllAppointment.value;
  //   userAppointments = getUserAppointment.value;
  // }

  const allAppointments = await prisma.appointment.findMany({});
  const userAppointments = await prisma.appointment.findMany({
    where: {
      userId: session.user.id,
    },
  });

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

export default Profile;
