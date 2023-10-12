import prisma from "@/app/lib/prisma";

interface RequestBody {
  name: string;
  email: string;
  auth: string;
  password: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      auth: body.auth,
      password: body.password,
    },
  });

  const { ...result } = user;
  return new Response(JSON.stringify(result));
}
