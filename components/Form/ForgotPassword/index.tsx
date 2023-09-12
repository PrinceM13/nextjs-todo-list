import { useState } from "react";

import { axios } from "@/utils-frontend";
import { Button, Input } from "@/components/base";
import { Layout, Spinner } from "@/components";

import FormFrame from "../FormFrame";
import { useModal } from "@/hooks";
import { useRouter } from "next/navigation";

const url: string = process.env.NEXT_PUBLIC_WEB_URL ?? "";

export default function ForgotPasswordForm(): JSX.Element {
  // * router
  const router = useRouter();

  // * input state
  const [email, setEmail] = useState<string>("");

  // * use modal hook
  const { openModal, CustomModal } = useModal();

  // * modal and spinner state
  const [isLoading, setIsLoading] = useState(false);

  // * handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // * send email to user
      const res = await axios.post(`/auth/forgot-password?email=${email}`);

      // * show modal
      openModal({
        title: "Success",
        message: res.data.message,
        type: "success"
      });
    } catch (error) {
      console.log(error);
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
            initialValue={email}
            isRequired={true}
            onChange={setEmail}
          />
        </Layout.FormInput>
        <Button.Default type="submit">Forgot Password</Button.Default>
      </FormFrame>

      {/* modal */}
      <CustomModal />

      {/* spinner */}
      {isLoading && <Spinner.HourGlass />}
    </>
  );
}
