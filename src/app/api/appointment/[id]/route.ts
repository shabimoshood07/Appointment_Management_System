import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { revalidatePath, revalidateTag } from "next/cache";

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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const id = params.id;
    await prisma.appointment.delete({
      where: {
        id,
        userId: session?.user.id,
      },
    });
    return NextResponse.json(
      { message: "Appointment deleted successfully" },
      { status: 200, statusText: "ok" }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500, statusText: "Something went wrong" }
    );
  }
}
