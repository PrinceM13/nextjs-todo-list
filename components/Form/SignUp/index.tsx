import { Button, Input } from "@/components/base";
import FormFrame from "../FormFrame";
import { Layout } from "@/components";

export default function SignUpForm(): JSX.Element {
  return (
    <FormFrame>
      <Layout.FormInput>
        <Input.TextWithLabel label="Email" labelWidth="10rem" />
        <Input.TextWithLabel label="Password" labelWidth="10rem" />
        <Input.TextWithLabel label="Confirm Password" labelWidth="10rem" />
        <Input.TextWithLabel label="Display Name" labelWidth="10rem" />
      </Layout.FormInput>
      <Button.Default>Sign Up</Button.Default>
    </FormFrame>
  );
}
