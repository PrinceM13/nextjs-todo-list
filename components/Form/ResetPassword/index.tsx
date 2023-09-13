import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { axios } from "@/utils-frontend";
import { Button, Input } from "@/components/base";
import { Layout, Spinner } from "@/components";
import { useModal } from "@/hooks";

import FormFrame from "../FormFrame";

const url: string = process.env.NEXT_PUBLIC_WEB_URL ?? "";

export default function ResetPasswordForm(): JSX.Element {
  // * router
  const router = useRouter();

  // * get params from url
  const params = useParams();
  const token: string | string[] = params?.token;

  // * input state
  const [resetInput, setResetInput] = useState({
    password: "",
    confirmPassword: ""
  });
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  // * use modal hook
  const { openModal, CustomModal } = useModal();

  // * modal and spinner state
  const [isLoading, setIsLoading] = useState(false);

  // * check if password and confirm password match
  useEffect(() => {
    if (resetInput.password !== resetInput.confirmPassword) {
      setIsPasswordMatch(false);
    } else {
      setIsPasswordMatch(true);
    }
  }, [resetInput.password, resetInput.confirmPassword]);

  // * handle input change
  const onInputChange = (key: string, value: string) => {
    setResetInput({ ...resetInput, [key]: value });
  };

  // * handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // * user need to fix password mismatch before submiting
    if (!isPasswordMatch) {
      console.log("password mismatch");
      setIsLoading(false);
      openModal({
        title: "Error",
        message: "Please fix password mismatch",
        type: "danger"
      });
    } else {
      try {
        const res = await axios.patch(`/auth/${token}/reset-password`, {
          password: resetInput.password
        });
        openModal({
          title: "Success",
          message: res.data.message,
          type: "success"
        });

        setResetInput({
          password: "",
          confirmPassword: ""
        });

        setTimeout(() => {
          router.push(url + "/login");
        }, 1500);
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
    }
  };

  return (
    <>
      <FormFrame onSubmit={handleSubmit}>
        <Layout.FormInput>
          <Input.TextWithLabel
            label="Password"
            initialValue={resetInput.password}
            isRequired={true}
            onChange={(value) => onInputChange("password", value)}
          />
          <Input.TextWithLabel
            label="Confirm Password"
            initialValue={resetInput.confirmPassword}
            isRequired={true}
            onChange={(value) => onInputChange("confirmPassword", value)}
            error={isPasswordMatch ? "" : "password not match"}
          />
        </Layout.FormInput>
        <Button.Default type="submit">Reset Password</Button.Default>
      </FormFrame>

      {/* modal */}
      <CustomModal />

      {/* spinner */}
      {isLoading && <Spinner.HourGlass />}
    </>
  );
}
