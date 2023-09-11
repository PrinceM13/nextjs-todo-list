import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import FormFrame from "../FormFrame";
import { Button, Input } from "@/components/base";
import { Layout, Modal, Spinner } from "@/components";

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

  // TODO: might refactor with custom hook

  // * modal and spinner state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
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
      setModalTitle("Error");
      setModalMessage("Plesae fix password mismatch");
      setIsLoading(false);
      setIsModalOpen(true);
      return;
    } else {
      try {
        const res = await axios.post("/api/auth/register", registerInput);
        setModalTitle("Success");
        setModalMessage(res.data.message);
        setRegisterInput(initialRegisterInput);
      } catch (error: any) {
        console.log(error);
        setModalTitle("Error");
        setModalMessage(error.response.data.message);
      } finally {
        setIsLoading(false);
        setIsModalOpen(true);
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
      <Modal title={modalTitle} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div
          className={`${
            modalTitle === "Error"
              ? "text-red-500"
              : modalTitle === "Success"
              ? "text-green-500"
              : ""
          }`}
        >
          {modalMessage}
        </div>
      </Modal>

      {/* spinner */}
      {isLoading && <Spinner.HourGlass />}
    </>
  );
}
