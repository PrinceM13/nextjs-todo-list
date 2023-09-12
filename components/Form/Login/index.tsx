import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import FormFrame from "../FormFrame";
import { axios, localStorage } from "@/utils-frontend";
import { useModal } from "@/hooks";
import { Button, Input } from "@/components/base";
import { Layout, Spinner } from "@/components";

interface LoginInput {
  email: string;
  password: string;
}

const initialLoginInput: LoginInput = {
  email: "",
  password: ""
};

const url: string = process.env.NEXT_PUBLIC_WEB_URL ?? "";

export default function LoginForm(): JSX.Element {
  // * router
  const router = useRouter();

  // * input state
  const [loginInput, setLoginInput] = useState<LoginInput>(initialLoginInput);

  // * use modal hook
  const { openModal, CustomModal } = useModal();

  // * spinner state
  const [isLoading, setIsLoading] = useState(false);

  // * handle input change
  const onInputChange = (key: string, value: string) => {
    setLoginInput({ ...loginInput, [key]: value });
  };

  // * handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post("/auth/login", loginInput);
      openModal({
        title: "Success",
        message: res.data.message,
        type: "success"
      });
      setLoginInput(initialLoginInput);

      // * set token to local storage
      localStorage.setAccessToken(res.data.accessToken);

      // * redirect to todo list page
      setTimeout(() => {
        router.push("/todo-list");
      }, 1000);
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

  return (
    <>
      <FormFrame onSubmit={handleSubmit}>
        <Layout.FormInput>
          <Input.TextWithLabel
            label="Email"
            initialValue={loginInput.email}
            isRequired={true}
            onChange={(value) => onInputChange("email", value)}
          />
          <Input.TextWithLabel
            label="Password"
            initialValue={loginInput.password}
            isRequired={true}
            onChange={(value) => onInputChange("password", value)}
          />
          <Link
            href={url + "/forgot-password"}
            className="text-blue-600 underline cursor-pointer self-end"
          >
            Forgot Password
          </Link>
        </Layout.FormInput>
        <Button.Default type="submit">Sign In</Button.Default>
        <p>
          {`Don't have an account? `}
          <Link href={url + "/sign-up"} className="text-blue-600 underline cursor-pointer">
            Sign Up
          </Link>
        </p>
      </FormFrame>

      {/* modal */}
      <CustomModal />

      {/* spinner */}
      {isLoading && <Spinner.HourGlass />}
    </>
  );
}
