"use client";

import { signIn } from "next-auth/react";
import React, { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function login() {
    signIn("credentials", {
      username: email,
      password: password,
      callbackUrl: "/",
    });
  }

  function signinWithGoogle() {
    signIn("google", {
      callbackUrl: "/",
    });
  }

  return (
    <div>
      <button className="border py-2 px-4" onClick={signinWithGoogle}>
        Sign In With Google
      </button>{" "}
      <br />
      <input
        type="text"
        placeholder="email ..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password ..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Sign In</button>
    </div>
  );
};

export default SignIn;
