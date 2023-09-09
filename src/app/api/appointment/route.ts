import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function GET(request: Request) {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    return NextResponse.json(
      { appointments },
      { status: 200, statusText: "ok" }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500, statusText: "Something went wrong" }
    );
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  const data = await request.json();
  const newAppointment = await prisma.appointment.create({
    data: {
      ...data,
      userId,
    },
  });
  return NextResponse.json(newAppointment);
}
