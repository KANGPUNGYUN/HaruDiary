// import { verifyJwt } from "@/app/lib/jwt";
// import prisma from "@/app/lib/prisma";

// export async function GET(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   const accessToken = request.headers.get("authorization");
// if (!accessToken || !verifyJwt(accessToken)) {
//   console.log(accessToken);
//   return new Response(JSON.stringify({ error: "No Authorization" }), {
//     status: 401,
//   });
// }

//   console.log(params);

//   const id = Number(params.id);

//   const userPosts = await prisma.diary.findMany({
//     where: {
//       authorId: id,
//     },
//     include: {
//       author: {
//         select: {
//           email: true,
//           name: true,
//         },
//       },
//     },
//     orderBy: [
//       {
//         id: "desc",
//       },
//     ],
//   });
//   return new Response(JSON.stringify(userPosts));
// }

import { db } from "@vercel/postgres";

export default async function handler(
  request: Request,
  { params }: { params: { id: string } }
) {
  const client = await db.connect();

  try {
    const user = await client.sql`SELECT * FROM user;`;
    return new Response(JSON.stringify(user));
  } catch (error) {
    console.log(error);
  }
}
