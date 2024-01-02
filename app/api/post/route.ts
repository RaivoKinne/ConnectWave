import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.title || !body.id) {
    return new NextResponse("No content", { status: 400 });
  }

  const post = await prisma.post.create({
    data: {
      name: body.title,
      createdBy: {
        connect: {
          id: body.id,
        },
      },
    },
  });

  return new NextResponse(JSON.stringify(post), { status: 200 });
}

export async function GET() {
  const posts = await prisma.post.findMany();
  return new NextResponse(JSON.stringify(posts), { status: 200 });
}
