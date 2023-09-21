"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { prisma } from "./prisma";
import { revalidatePath, revalidateTag } from "next/cache";

export const getAllAppointments = async () => {
  const res = await fetch(process.env.URL + "/api/appointment", {
    cache: "no-store",
  });
  const { appointments } = await res.json();
  return appointments;
};

export const getUserAppointments = async (id: string) => {
  const res = await fetch(process.env.URL + "/api/appointment/" + `${id}`, {
    cache: "no-store",
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
    revalidatePath("/profile");
    revalidatePath("/appointment");
    revalidateTag("all");
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

export const handleSubmit = async (formData: FormData, appointmentId:string) => {
  console.log(formData);

  const data = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }
  console.log(data);

  const res = await fetch( process.env.URL + "/api/appointment/" + `${appointmentId}`, {
    method: "PATCH",
    body: JSON.stringify(data.status),
  });
  const { message } = await res.json();
  revalidatePath("/admin-appointment");
  return message;
};
