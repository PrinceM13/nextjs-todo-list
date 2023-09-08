import { Button, Input } from "@/components/base";
import FormFrame from "../FormFrame";
import { Layout } from "@/components";

export default function ForgotPasswordForm(): JSX.Element {
  return (
    <FormFrame>
      <Layout.FormInput>
        <Input.TextWithLabel label="Email" />
      </Layout.FormInput>
      <Button.Default>Forgot Password</Button.Default>
    </FormFrame>
  );
}
