import { prisma } from "@/app/config/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    await prisma.employees.create({
      data: {
        firstName: body?.firstName,
        lastName: body?.lastName,
        email: body?.email,
      },
    });
    return NextResponse.json({ message: "Data Created" });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wronge",
      error: JSON.stringify(error),
    });
  }
};
