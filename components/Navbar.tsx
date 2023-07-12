"use client";

import { Post } from "@prisma/client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const { data: session, status } = useSession();
  // const [posts, setPosts] = useState<Post[]>([]);

  // async function getPosts() {
  //   const res = await fetch("http://localhost:3000/api/post");
  //   const data = await res.json();
  //   setPosts(data);
  // }

  // useEffect(() => {
  //   getPosts();
  // }, []);

  return (
    <div className="border-b py-2 px-5">
      {status === "loading" && <h1>Loading ...</h1>}

      {status !== "loading" && (
        <>
          {session?.user ? (
            <button
              className="py-2 px-5 bg-red-600 text-white"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          ) : (
            <Link href={"/auth/signin"}>
              <button className="py-2 px-5 bg-blue-600 text-white">
                Sign In
              </button>
            </Link>
          )}
        </>
      )}

      <h1>Post</h1>
      {/* {JSON.stringify(posts)} */}
    </div>
  );
};

export default Navbar;
