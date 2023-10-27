import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface RequestBody {
  title: string;
  content: string;
  isPublic: boolean;
  authorId: number;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const diary = await prisma.diary.create({
    data: {
      title: body.title,
      content: body.content,
      author: { connect: { id: body.authorId } },
      isPublic: body.isPublic,
    },
  });

  return new Response(JSON.stringify(diary));
}
