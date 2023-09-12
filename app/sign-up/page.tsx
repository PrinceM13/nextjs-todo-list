"use client";

import { Form, Layout } from "@/components";

export default function SignUpPage(): JSX.Element {
  return (
    <Layout.FormPage title="Create new account">
      <Form.SignUp />
    </Layout.FormPage>
  );
}
