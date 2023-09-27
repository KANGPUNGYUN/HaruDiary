import prisma from "@/app/lib/prisma";

interface RequestBody {
  nickname: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const UserWhereUniqueInput = await prisma.user.findFirst({
    where: { name: body.nickname },
  });
  if (UserWhereUniqueInput !== null) {
    return new Response(JSON.stringify(true));
  } else {
    return new Response(JSON.stringify(false));
  }
}
