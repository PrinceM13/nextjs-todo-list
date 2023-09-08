import { Button, Input } from "@/components/base";
import FormFrame from "../FormFrame";
import { Layout } from "@/components";

export default function LoginForm(): JSX.Element {
  return (
    <FormFrame>
      <Layout.FormInput>
        <Input.TextWithLabel label="Email" />
        <Input.TextWithLabel label="Password" />
      </Layout.FormInput>
      <Button.Default>Sign In</Button.Default>
    </FormFrame>
  );
}
