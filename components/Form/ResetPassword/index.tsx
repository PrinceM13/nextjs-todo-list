import { Button, Input } from "@/components/base";
import FormFrame from "../FormFrame";
import { Layout } from "@/components";

export default function ResetPasswordForm(): JSX.Element {
  return (
    <FormFrame>
      <Layout.FormInput>
        <Input.TextWithLabel label="Password" labelWidth="10rem" />
        <Input.TextWithLabel label="Confirm Password" labelWidth="10rem" />
      </Layout.FormInput>
      <Button.Default>Reset Password</Button.Default>
    </FormFrame>
  );
}
