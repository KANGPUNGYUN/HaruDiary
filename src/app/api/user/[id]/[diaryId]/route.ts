import { verifyJwt } from "@/app/lib/jwt";
import prisma from "@/app/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const accessToken = request.headers.get("authorization");
  //   if (!accessToken || !verifyJwt(accessToken)) {
  //     return new Response(JSON.stringify({ error: "No Authorization" }), {
  //       status: 401,
  //     });
  //   }

  const diaryId = Number(params.diaryId);

  const userPosts = await prisma.diary.findUnique({
    where: {
      id: diaryId,
    },
    include: {
      author: {
        select: {
          email: true,
          name: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });
  return new Response(JSON.stringify(userPosts));
}
