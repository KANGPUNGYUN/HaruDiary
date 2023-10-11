import prisma from "@/app/lib/prisma";

interface UserData {
  name: string;
  email: string;
  auth: string;
}

interface RequestBody {
  user: UserData;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const user = await prisma.user.create({
    data: {
      name: body.user.name,
      email: body.user.email,
      auth: body.user.auth,
    },
  });

  const { ...result } = user;
  return new Response(JSON.stringify(result));
}
