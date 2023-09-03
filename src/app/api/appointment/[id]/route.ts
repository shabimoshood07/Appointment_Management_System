import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const userAppointments = await prisma.appointment.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        userId: id,
      },
    });
    return NextResponse.json(
      { userAppointments },
      { status: 200, statusText: "ok" }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500, statusText: "Something went wrong" }
    );
  }
}
