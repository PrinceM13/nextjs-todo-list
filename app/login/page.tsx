"use client";

import { Form, Layout } from "@/components";
import { RedirectIfAuthenticated } from "@/routers";

export default function LoginPage(): JSX.Element {
  return (
    <RedirectIfAuthenticated>
      <Layout.FormPage title="Todo List Application">
        <Form.Login />
      </Layout.FormPage>
    </RedirectIfAuthenticated>
  );
}
