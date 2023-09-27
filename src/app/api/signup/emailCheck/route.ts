import prisma from "@/app/lib/prisma";

interface RequestBody {
  email: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const UserWhereUniqueInput = await prisma.user.findUnique({
    where: { email: body.email },
  });
  if (UserWhereUniqueInput !== null) {
    return new Response(JSON.stringify(true));
  } else {
    return new Response(JSON.stringify(false));
  }
}
