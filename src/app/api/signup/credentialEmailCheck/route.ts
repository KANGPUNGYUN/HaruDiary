import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface RequestBody {
  email: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const UserWhereUniqueInput = await prisma.user.findFirst({
    where: { email: body.email, auth: "credentials" },
  });
  if (UserWhereUniqueInput !== null) {
    return new Response(JSON.stringify(true));
  } else {
    return new Response(JSON.stringify(false));
  }
}
