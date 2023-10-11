import prisma from "@/app/lib/prisma";

interface RequestBody {
  email: string;
  auth: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const user = await prisma.user.findUnique({
    where: { email: body.email, auth: body.auth },
  });

  if (user !== null) {
    return new Response(JSON.stringify(user.id));
  } else {
    return new Response(JSON.stringify(false));
  }
}
