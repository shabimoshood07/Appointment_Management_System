import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type userData = {
  email: string;
  password: string;
};

export const registerUser = async (userData: userData) => {
    console.log("userData", userData);
    
  const newUser = await prisma.user.create({
    data: userData,
  });
  return newUser;
};
