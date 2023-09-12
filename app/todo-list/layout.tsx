"use client";

import { Layout } from "@/components";
import { PrivateRoute } from "@/routers";

export default function TodoListLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <PrivateRoute>
      <Layout.TodoList>{children}</Layout.TodoList>
    </PrivateRoute>
  );
}
