"use server"

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";

export const getAllAppointments = async () => {
    const res = await fetch(process.env.URL + "/api/appointment/");
    const { appointments } = await res.json();
    return appointments;
};
export const getUserAppointments = async (id: string) => {
    const res = await fetch(process.env.URL + "/api/appointment/" + `${id}`);
    const { userAppointments } = await res.json();
    return userAppointments;
};


export const deleteAppointment = async (appointmentId: string) => {
    try {
        const session = await getServerSession(authOptions)
        await prisma.appointment.delete({
            where: {
                id: appointmentId,
                userId: session?.user.id
            }
        })
        revalidatePath("/appointment")
    } catch (error) {
        console.log("error", error);
    }
}