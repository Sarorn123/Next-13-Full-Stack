"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { data: session, status } = useSession();
  return (
    <div className=" border-b py-2 flex justify-center">
      {status === "loading" && <h1>Loading ...</h1>}

      {status !== "loading" && (
        <>
          {session?.user ? (
            <button
              className="py-2 px-5 bg-red-600 text-white rounded-lg"
              onClick={() => signOut()}
            >
              Sign Out | {session.user.name}
            </button>
          ) : (
            <Link href={"/auth/signin"}>
              <button className="py-2 px-5 bg-blue-600 text-white rounded-lg">
                Sign In
              </button>
            </Link>
          )}
        </>
      )}
    </div>
  );
};

export default Navbar;
