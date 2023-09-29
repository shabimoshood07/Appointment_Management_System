"use server";
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

export const deleteAppointment = async (appointmentId: string, path: string) => {
  try {
    const res = await fetch(
      process.env.URL + "/api/appointment/" + `${appointmentId}`,
      {
        method: "DELETE",
      }
    );
    revalidateTag("allAppointments");
    revalidatePath(`/${path}`);
  } catch (error) {
    console.log("error", error);
  }
};


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
  await prisma.appointment.update({
    data: {
      status,
    },
    where: {
      id: appointmentId,
    },
  })
  revalidatePath("/admin-appointment");
};
