import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import FormFrame from "../FormFrame";
import { axios } from "@/utils-frontend";
import { useModal } from "@/hook";
import { Layout, Spinner } from "@/components";
import { Button, Input } from "@/components/base";

interface RegisterInput {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
}

const initialRegisterInput: RegisterInput = {
  email: "",
  password: "",
  confirmPassword: "",
  displayName: ""
};

export default function SignUpForm(): JSX.Element {
  // * router
  const router = useRouter();

  // * input state
  const [registerInput, setRegisterInput] = useState<RegisterInput>(initialRegisterInput);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);

  // * use modal hook
  const { openModal, CustomModal } = useModal();

  // * modal and spinner state
  const [isLoading, setIsLoading] = useState(false);

  // * check if password and confirm password match
  useEffect(() => {
    if (registerInput.password !== registerInput.confirmPassword) {
      setIsPasswordMatch(false);
    } else {
      setIsPasswordMatch(true);
    }
  }, [registerInput.password, registerInput.confirmPassword]);

  // * handle input change
  const onInputChange = (key: string, value: string) => {
    setRegisterInput({ ...registerInput, [key]: value });
  };

  // * handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // * user need to fix password mismatch before submiting
    if (!isPasswordMatch) {
      setIsLoading(false);
      openModal({
        title: "Error",
        message: "Please fix password mismatch",
        type: "danger"
      });
    } else {
      try {
        const res = await axios.post("/auth/register", registerInput);
        openModal({
          title: "Success",
          message: res.data.message,
          type: "success"
        });

        setRegisterInput(initialRegisterInput);
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
            type="email"
            labelWidth="10rem"
            label="Email"
            initialValue={registerInput.email}
            isRequired={true}
            onChange={(value) => onInputChange("email", value)}
          />
          <Input.TextWithLabel
            labelWidth="10rem"
            label="Password"
            initialValue={registerInput.password}
            isRequired={true}
            onChange={(value) => onInputChange("password", value)}
          />
          <Input.TextWithLabel
            labelWidth="10rem"
            label="Confirm Password"
            initialValue={registerInput.confirmPassword}
            isRequired={true}
            onChange={(value) => onInputChange("confirmPassword", value)}
            error={isPasswordMatch ? "" : "password not match"}
          />
          <Input.TextWithLabel
            labelWidth="10rem"
            label="Display Name"
            initialValue={registerInput.displayName}
            isRequired={true}
            onChange={(value) => onInputChange("displayName", value)}
          />
        </Layout.FormInput>
        <Button.Default type="submit">Sign Up</Button.Default>
      </FormFrame>

      {/* modal */}
      <CustomModal />

      {/* spinner */}
      {isLoading && <Spinner.HourGlass />}
    </>
  );
}
