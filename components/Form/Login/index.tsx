"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

import FormFrame from "../FormFrame";
import { Button, Input } from "@/components/base";
import { Layout, Modal, Spinner } from "@/components";

interface LoginInput {
  email: string;
  password: string;
}

const initialLoginInput: LoginInput = {
  email: "",
  password: ""
};

export default function LoginForm(): JSX.Element {
  // * router
  const router = useRouter();

  // * input state
  const [loginInput, setLoginInput] = useState<LoginInput>(initialLoginInput);

  // TODO: might refactor with custom hook

  // * modal and spinner state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
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
      const res = await axios.post("/api/auth/login", loginInput);
      setModalTitle("Success");
      setModalMessage(res.data.message);
      setLoginInput(initialLoginInput);

      // * redirect to todo list page
      setTimeout(() => {
        router.push("/todo-list");
      }, 1000);
    } catch (error: any) {
      console.log(error);
      setModalTitle("Error");
      setModalMessage(error.response.data.message);
    } finally {
      setIsLoading(false);
      setIsModalOpen(true);
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
        </Layout.FormInput>
        <Button.Default type="submit">Sign In</Button.Default>
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
