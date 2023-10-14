import { verifyJwt } from "@/app/lib/jwt";
import prisma from "@/app/lib/prisma";

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
  return new Response(JSON.stringify(user));
}
