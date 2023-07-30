"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/logo.webp";
import toast from "react-hot-toast";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Bye");
    router.push("/login");
  };

  return (
    <header className="shadow-xl border-b-2 border-white sticky top-0 z-10 bg-black">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between w-full gap-8 px-4 sm:px-6 lg:px-8">
        <Link
          className="items-center justify-between flex text-teal-600"
          href="/"
        >
          <span className="sr-only">Home</span>
          <Image src={logo} alt="Logo" width={40} height={40} />
          <h1 className="text-2xl font-bold text-white">OnlyMP3</h1>
        </Link>

        <button
          className="block rounded-md bg-orange-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-orange-700"
          onClick={handleLogout}
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
