import { verifyJwt } from "@/app/lib/jwt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const accessToken = request.headers.get("authorization");
  if (!accessToken || !verifyJwt(accessToken)) {
    console.log(accessToken);
    // return new Response(JSON.stringify({ error: "No Authorization" , message: }), {
    //   status: 401,
    // });
  }

  console.log(params);

  const id = Number(params.id);

  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  if (user?.password || user?.password === "") {
    const { password, ...result } = user;
    return new Response(JSON.stringify(result));
  } else {
    return new Response(JSON.stringify(null));
  }
}
