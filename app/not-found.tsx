"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/base";

export default function PageNotFound(): JSX.Element {
  const router = useRouter();
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    console.log("Page not found");
    setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    setTimeout(() => {
      router.push("/");
    }, 4800);
  }, []);

  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center p-8 gap-6 md:gap-8 lg:gap-12">
      <h1 className="text-2xl md:text-4xl lg:text-5xl">Page not found</h1>
      <div className="text-xl md:text-3xl lg:text-4xl text-center">
        Redirecting to home page in {counter} seconds, or click following button
      </div>
      <Link href="/">
        <Button.Default>Back to home page</Button.Default>
      </Link>
    </div>
  );
}
