"use client";
import React from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="p-5 flex justify-end">
      <button className="p-3 bg-blue-600 rounded-md" onClick={handleLogout}>
        Sign out
      </button>
    </div>
  );
}
