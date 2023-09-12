"use client";

import { Button } from "@/components/base";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="w-[100vw] min-h-[100vh] flex flex-col gap-12 justify-center items-center">
      <div className="text-6xl">Welcome to Todo List App</div>
      <div className="flex gap-8">
        <Button.Default
          className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-2xl px-8 py-4"
          onClick={() => router.push("/login")}
        >
          Sign In
        </Button.Default>
        <Button.Default
          className="bg-neutral-500 hover:bg-neutral-600 active:bg-neutral-700 text-2xl px-8 py-4"
          onClick={() => router.push("/sign-up")}
        >
          Sign Up
        </Button.Default>
      </div>
    </main>
  );
}
