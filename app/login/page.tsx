"use client";
import Link from "next/link";
import { BsFacebook, BsGoogle } from "react-icons/bs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-hot-toast";

export default function Login() {
  const supabase = createClientComponentClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleLogin = async (e: any) => {
    e.preventDefault();
    const notification = toast.loading("Logging in...");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log("👉️ ~ file: page.tsx:24 ~ handleLogin ~ error:\n", error);
      toast.error(`${error}`, { id: notification });
      return;
    }
    console.log("👉️ ~ file: page.tsx:22 ~ handleSignUp ~ data:\n", data);
    toast.success("Logged in successfully", { id: notification });
    router.push("/");
  };
  return (
    <>
      <div className="flex min-h-full flex-col justify-center items-center px-6 py-12 lg:px-8 gap-7 mt-28">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Login to your account
          </h2>
        </div>

        <div className="flex flex-row justify-center items-center gap-4">
          <a
            className="inline-flex items-center gap-2 rounded border-2 border-[#171515] bg-[#171515] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-transparent hover:text-blue-400 focus:outline-none focus:ring active:opacity-75"
            href="/github"
            target="_blank"
            rel="noreferrer"
          >
            <BsGoogle />
          </a>

          <a
            className="inline-flex items-center gap-2 rounded border-2 border-[#171515] bg-[#171515] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-transparent hover:text-blue-400 focus:outline-none focus:ring active:opacity-75"
            href="/github"
            target="_blank"
            rel="noreferrer"
          >
            <BsFacebook />
          </a>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
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
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm"></div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 outline-none px-3"
                />
              </div>
            </div>
            asdfsda
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-white px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold leading-6 pl-2 text-white hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
