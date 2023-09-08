import { Layout } from "@/components";

export default function TodoListLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return <Layout.TodoList>{children}</Layout.TodoList>;
}
