import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { localStorage } from "@/utils-frontend";

export default function RedirectIfAuthenticated({
  children
}: {
  children: React.ReactNode;
}): JSX.Element {
  // * router
  const router = useRouter();

  // * loaded state
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // * check if the access token is present
    const accessToken: string | null = localStorage.getAccessToken();

    // * if the access token is present, redirect to the todo list page
    if (accessToken) {
      router.push("/todo-list");
    }

    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  }, []);

  return <>{isLoaded && children}</>;
}
