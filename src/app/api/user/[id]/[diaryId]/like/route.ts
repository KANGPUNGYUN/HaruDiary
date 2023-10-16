import prisma from "@/app/lib/prisma";

interface RequestBody {
  id: number;
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

  const diary = await prisma.like.create({
    data: {
      diary: { connect: { id: diaryId } },
      author: { connect: { id: body.id } },
    },
  });

  return new Response(JSON.stringify(diary));
}
