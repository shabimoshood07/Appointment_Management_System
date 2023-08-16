import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ZodError, z } from "zod";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const registerUserSchema = z.object({
  email: z
    .string()
    .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email"),
  password: z.string().min(5, "Password should be minimum 5 characters"),
});

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const data = await req.json();

    const { email, password } = registerUserSchema.parse(data);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user !== null) {
      return NextResponse.json(
        { error: "user already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    return NextResponse.json(
      { user: newUser, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof ZodError) {
      let err = "";
      err = error.issues
        .map((er) => {
          return er.message;
        })
        .join(", ");
      return NextResponse.json({ error: err }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
