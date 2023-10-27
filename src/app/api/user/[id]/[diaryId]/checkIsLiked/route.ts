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
    params: { diaryId: string };
  }
) {
  const body: RequestBody = await request.json();
  const diaryId = Number(params.diaryId);

  const isLiked = await prisma.like.count({
    where: {
      diaryId: diaryId,
      authorId: body.userId,
    },
  });

  return new Response(JSON.stringify(isLiked));
}
