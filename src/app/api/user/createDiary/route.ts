import prisma from "@/app/lib/prisma";

interface RequestBody {
  title: string;
  content: string;
  isPublic: boolean;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const diary = await prisma.diary.create({
    data: {
      title: body.title,
      content: body.content,
      isPublic: body.isPublic,
      authorId: body.authorId,
    },
  });

  return new Response(JSON.stringify(diary));
}
