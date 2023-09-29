"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { prisma } from "./prisma";
import { revalidatePath, revalidateTag } from "next/cache";

export const getAllAppointments = async () => {
  const res = await fetch(process.env.URL + "/api/appointment", {
    cache: "no-cache",
    next: {
      tags: ["allAppointments"],
    },
  });
  const { appointments } = await res.json();
  return appointments;
};

export const getUserAppointments = async (id: string) => {
  const res = await fetch(process.env.URL + "/api/appointment/" + `${id}`, {
    cache: "no-cache",
    next: {
      tags: ["allAppointments"],
    },
  });
  const { userAppointments } = await res.json();
  return userAppointments;
};

export const deleteAppointment = async (appointmentId: string) => {
  try {
    const res = await fetch(
      process.env.URL + "/api/appointment/" + `${appointmentId}`,
      {
        method: "DELETE",
      }
    );
    revalidateTag("allAppointments");
    revalidatePath("/appointment");
  } catch (error) {
    console.log("error", error);
  }
};
// export const deleteAppointment = async (appointmentId: string) => {
//   try {
//     const session = await getServerSession(authOptions);
//     await prisma.appointment.delete({
//       where: {
//         id: appointmentId,
//         userId: session?.user.id,
//       },
//     });
//     revalidatePath("/appointment");
//   } catch (error) {
//     console.log("error", error);
//   }
// };

export const updateAppointment = async (
  formData: FormData,
  appointmentId: string
) => {
  const status = formData.get("status")?.toString() as
    | "PENDING"
    | "CONFIRMED"
    | "CANCELLED";
  const start = formData.get("start")?.toString();
  const end = formData.get("end")?.toString();
  const title = formData.get("title")?.toString();
  console.log(status, end, start, title, appointmentId);

  await prisma.appointment.update({
    data: {
      status,
    },
    where: {
      id: appointmentId,
    },
  });

  revalidatePath("/admin-appointment");
};
