import Link from "next/link";
import React from "react";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
const Navbar = async () => {
  const session = await auth();
  return (
    <div className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/daniamLogo.png" alt="Logo" width={50} height={50} />
        </Link>
        <div className="flex items-center gap-4">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>
              <form action={async () => {
                'use server';
                await signOut({redirectTo: "/"});
                }}>
                <span>Logout</span>
              </form>
              <Link href={`/user/${session?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit">
                <span>Login</span>
              </button>
            </form>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
