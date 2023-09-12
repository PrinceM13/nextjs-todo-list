"use client";

import { Button } from "@/components/base";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="w-[100vw] min-h-[100vh] px-8 md:px-16 lg:px-20 flex flex-col gap-12 justify-center items-center">
      <div className="text-4xl lg:text-6xl text-center">Welcome to Todo List App</div>
      <div className="flex gap-4 lg:gap-8">
        <Button.Default
          className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-md md:text-lg lg:text-2xl px-6 py-4 lg:px-8 lg:py-4"
          onClick={() => router.push("/login")}
        >
          Sign In
        </Button.Default>
        <Button.Default
          className="bg-neutral-500 hover:bg-neutral-600 active:bg-neutral-700 text-md md:text-lg lg:text-2xl px-6 py-4 lg:px-8 lg:py-4"
          onClick={() => router.push("/sign-up")}
        >
          Sign Up
        </Button.Default>
      </div>
    </main>
  );
}
