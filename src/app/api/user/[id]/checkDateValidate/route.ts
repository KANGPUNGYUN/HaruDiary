import prisma from "@/app/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  const lastCreatedDate = await prisma.diary.findFirst({
    where: {
      authorId: id,
    },
    select: {
      createdAt: true,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
  });

  return new Response(JSON.stringify(lastCreatedDate));
}
