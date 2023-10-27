import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface RequestBody {
  userId: number;
}

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: { id: string; diaryId: string };
  }
) {
  const body: RequestBody = await request.json();
  const diaryId = Number(params.diaryId);

  const unlike = await prisma.like.deleteMany({
    where: {
      diaryId: diaryId,
      authorId: body.userId,
    },
  });

  return new Response(JSON.stringify(unlike));
}
