import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface RequestBody {
  email: string;
  auth: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const res = await prisma.user.findFirst({
    where: { email: body.email, auth: body.auth },
  });

  if (res !== null) {
    return new Response(JSON.stringify(res.id));
  } else {
    return new Response(JSON.stringify(null));
  }
}
