import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const registerUserSchema = z.object({
  email: z
    .string()
    .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email"),
  password: z.string().min(5, "Password should be minimum 5 characters"),
});

export async function POST(req: Request, res: NextApiResponse) {
  const data = await req.json();
  console.log("data", data);

  const { email, password } = registerUserSchema.parse(data);

  console.log("email", email);
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user !== null) {
    return res.send({ user: null, message: "User already exists" });
  }

  console.log("email", email);
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  console.log("hashedPassword", hashedPassword);
  
  const newUser = await prisma.user.create({
      data: {
          email,
          password: hashedPassword,
        },
    });
    
    console.log("newUser", newUser);
    
  return res.send({ user: newUser, message: "User created successfully" });
}
