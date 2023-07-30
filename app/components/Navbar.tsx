"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
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
