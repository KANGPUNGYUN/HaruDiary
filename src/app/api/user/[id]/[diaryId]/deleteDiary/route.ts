import prisma from "@/app/lib/prisma";

interface RequestBody {
  id: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const diary = await prisma.diary.delete({
    where: {
      id: Number(body.id),
    },
  });

  return new Response(JSON.stringify(diary));
}
