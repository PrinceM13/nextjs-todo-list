export default function TodoListLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return <div className="min-h-[100vh] md:w-[90%] lg:w-[75%] m-auto px-8">{children}</div>;
}
