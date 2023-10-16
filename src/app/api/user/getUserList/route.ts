import { verifyJwt } from "@/app/lib/jwt";
import prisma from "@/app/lib/prisma";

export async function GET(request: Request) {
  const accessToken = request.headers.get("authorization");
  if (!accessToken || !verifyJwt(accessToken)) {
    console.log(accessToken);
    // return new Response(JSON.stringify({ error: "No Authorization" }), {
    //   status: 401,
    // });
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      auth: true,
      _count: {
        select: {
          diarys: true,
        },
      },
    },
  });

  return new Response(JSON.stringify(users));
}
