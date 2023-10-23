import prisma from "@/app/lib/prisma";

interface RequestBody {
  id: number;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const deleteUser = await prisma.user.delete({
    where: {
      id: body.id,
    },
  });

  return new Response(JSON.stringify(deleteUser));
}
