"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyPage(): JSX.Element {
  // * get params from url
  const params = useParams();
  const token: string | string[] = params?.token;

  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  // * verify email with token
  useEffect(() => {
    const verifyEmail = async () => {
      const res = await axios.patch(`http://localhost:3030/api/auth/${token}/verify-email`);
      console.log(res);
      if (res.status === 200) {
        setMessage(res.data.message);
      } else {
        setMessage(res.data);
      }
      setIsLoading(false);
    };
    verifyEmail();
  }, []);

  return (
    <main>
      <div>Verify Page</div>
      {isLoading ? <div>Loading...</div> : <div>{message}</div>}
    </main>
  );
}
