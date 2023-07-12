import { getServerSession } from "next-auth";
import Link from "next/link";
import { prisma } from "../db/client";

async function getPosts() {
  return await prisma.post.findMany();
}

export default async function Home() {
  const session = await getServerSession();
  const posts = await getPosts();

  return (
    <>
      <h1>from page is server sid component</h1>
      {JSON.stringify(session?.user)}
      <h1>Posts</h1>
      {JSON.stringify(posts)}
    </>
  );
}
