import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'


export async function GET(request: Request) {
    const appointments = await prisma.appointment.findMany()
    return NextResponse.json({ appointments })
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)
    if (!session) redirect('/register')
    const userId = session.user.id
    const data = await request.json()
    console.log(data, userId);
    const newAppointment = await prisma.appointment.create({
        data: {
            ...data, userId
        }
    })

    revalidatePath("/profile")
    return NextResponse.json(newAppointment)
}