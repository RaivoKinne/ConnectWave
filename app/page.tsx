"use client";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div>
        Signed in as {session.user?.name} <br />
        <Button onClick={() => signOut()}>Sign out</Button>
      </div>
    );
  }
  return (
    <>
      <p>Not signed in</p>
      <div className="flex gap-4 mx-4">
        <Button className="flex gap-2" onClick={() => signIn("google")}>
          Sign in with <FaGoogle />
        </Button>
      </div>
    </>
  );
}
