import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface RequestBody {
  page: number;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  const users = await prisma.$transaction([
    prisma.user.count(),
    prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        auth: true,
        _count: {
          select: {
            diarys: true,
          },
        },
      },
      skip: (body.page - 1) * 5,
      take: 5,
    }),
  ]);

  return new Response(JSON.stringify(users));
}
