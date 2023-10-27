import { verifyJwt } from "@/app/lib/jwt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { diaryId: string } }
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
          auth: true,
        },
      },
      _count: {
        select: {
          likes: true,
          report: true,
        },
      },
    },
  });
  return new Response(JSON.stringify(userPosts));
}
