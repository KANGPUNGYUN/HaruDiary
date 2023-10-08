import { verifyJwt } from "@/app/lib/jwt";
import prisma from "@/app/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const accessToken = request.headers.get("authorization");
  if (!accessToken || !verifyJwt(accessToken)) {
    console.error(accessToken);
    // return new Response(JSON.stringify({ error: "No Authorization" , message: }), {
    //   status: 401,
    // });
  }

  console.log(params);

  const id = Number(params.id);
  const diaryId = Number(params.diaryId);

  const userPosts = await prisma.diary.findUnique({
    where: {
      authorId: id,
      id: diaryId,
    },
    include: {
      author: {
        select: {
          email: true,
          name: true,
        },
      },
    },
  });
  return new Response(JSON.stringify(userPosts));
}
