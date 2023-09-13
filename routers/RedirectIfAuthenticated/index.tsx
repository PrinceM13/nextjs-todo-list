import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { localStorage } from "@/utils-frontend";

const url: string = process.env.NEXT_PUBLIC_WEB_URL ?? "";

export default function RedirectIfAuthenticated({
  children
}: {
  children: React.ReactNode;
}): JSX.Element {
  // * router
  const router = useRouter();

  // * loaded state
  const [isLoaded, setIsLoaded] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // * check if the access token is present
    const accessToken: string | null = localStorage.getAccessToken();
    setAccessToken(accessToken);

    // * if the access token is present, redirect to the todo list page
    if (accessToken) {
      router.push(url + "/todo-list");
    }

    setIsLoaded(true);
  }, []);

  return <>{isLoaded && !accessToken && children}</>;
}
