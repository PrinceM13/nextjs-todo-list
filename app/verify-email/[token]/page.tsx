"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Svgs } from "@/assets";
import { useModal } from "@/hooks";
import { Spinner } from "@/components";
import { Button } from "@/components/base";

export default function VerifyPage(): JSX.Element {
  // * router
  const router = useRouter();

  // * get params from url
  const params = useParams();
  const token: string | string[] = params?.token;

  // * use modal hook
  const { openModal, CustomModal } = useModal();

  // * spinner state
  const [isLoading, setIsLoading] = useState(true);

  // * success state
  const [isSuccess, setIsSuccess] = useState(false);

  // * verify email with token
  useEffect(() => {
    const verifyEmail = async () => {
      setIsLoading(true);

      try {
        const res = await axios.patch(`http://localhost:3030/api/auth/${token}/verify-email`);
        console.log(res);
        if (res.status === 200) {
          setIsSuccess(true);
        } else {
        }
        setIsLoading(false);
      } catch (error: any) {
        console.log(error);
        openModal({
          title: "Error",
          message: error.response.data.message,
          type: "danger"
        });
      } finally {
        setIsLoading(false);
      }
    };
    verifyEmail();
  }, []);

  return (
    <>
      <main className="w-screen min-h-screen flex flex-col justify-center items-center">
        {!isLoading && (
          <>
            <div className="flex flex-col justify-center items-center gap-8">
              {isSuccess ? (
                <>
                  <div className="text-5xl">Congratulations !</div>
                  <div className="flex gap-16 justify-center items-center">
                    <Svgs.Check />
                    <p className="w-[50%] text-lg">
                      Your email address has been successfully verified. You can now log in to your
                      account and start exploring Todo List.
                    </p>
                  </div>
                  <Button.Default className="text-2xl" onClick={() => router.push("/login")}>
                    Back to Sign In
                  </Button.Default>
                </>
              ) : (
                <div className="text-3xl flex gap-16 justify-center items-center">
                  <Svgs.Cross />
                  <div className="flex flex-col gap-4">
                    <p>Something went wrong !</p>
                    <p>please contact our support team. </p>
                    <p>
                      email:{" "}
                      <Link
                        className="text-blue-600 underline cursor-pointer"
                        href={"mailto:princem13.test@gmail.com"}
                      >
                        princem13.test@gmail.com
                      </Link>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {/* modal */}
      <CustomModal />

      {/* spinner */}
      {isLoading && <Spinner.HourGlass />}
    </>
  );
}
