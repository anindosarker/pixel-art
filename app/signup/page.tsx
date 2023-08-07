"use client";
import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function Signup() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const supabase = createClientComponentClient<Database>();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const notification = toast.loading("Signing up...");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.log("👉️ ~ file: page.tsx:16 ~ handleSignUp ~ error:\n", error);
      toast.error(`Something went wrong, ${error.message}`, {
        id: notification,
      });
      return;
    }
    toast.success("Signed up successfully", { id: notification });
    router.push("/");
  };

  useEffect(() => {
    if (password === confirmPassword) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  }, [password, confirmPassword]);

  return (
    <>
      <div className="flex min-h-full flex-col justify-center items-center px-6 py-12 lg:px-8 gap-7 mt-28 bg-black">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Create your account
          </h2>
        </div>

      
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSignup}>
            <div>
              <label className="block text-sm font-medium leading-6 text-white">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 outline-none px-3"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-white">
                  Password
                </label>
                <div className="text-sm"></div>
              </div>
              <div className="mt-2">
                <p className="text-red-500 text-xs">
                  {passwordMatch ? "" : "Passwords do not match"}
                </p>

                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 outline-none px-3"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6">
                Confirm Password
              </label>
              <div className="mt-2">
                <p className="text-red-500 text-xs">
                  {passwordMatch ? "" : "Passwords do not match"}
                </p>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 outline-none px-3"
                />
              </div>
            </div>

            <div>
              <button
                disabled={!passwordMatch}
                type="submit"
                className="flex disabled:bg-gray-400 disabled:cursor-not-allowed w-full justify-center rounded-md border border-white px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                onClick={handleSignup}
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-sm text-gray-400">
            Already Have an Account?{" "}
            <Link
              href="/login"
              className="font-semibold leading-6 pl-2 text-white hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
