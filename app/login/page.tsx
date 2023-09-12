"use client";

import { Form, Layout } from "@/components";

export default function LoginPage(): JSX.Element {
  return (
    <Layout.FormPage title="Todo List Application">
      <Form.Login />
    </Layout.FormPage>
  );
}
