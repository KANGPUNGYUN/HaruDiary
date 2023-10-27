import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface RequestBody {
  name: string;
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body: RequestBody = await request.json();

  const id = Number(params.id);

  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      name: body.name,
    },
  });

  return new Response(JSON.stringify(user));
}
