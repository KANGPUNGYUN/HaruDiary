import prisma from "@/app/lib/prisma";

interface RequestBody {
  views: number;
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

  const diary = await prisma.diary.update({
    where: {
      id: diaryId,
    },
    data: {
      views: {
        increment: 1,
      },
    },
  });

  return new Response(JSON.stringify(diary));
}
