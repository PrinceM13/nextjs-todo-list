interface LayoutFormProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function FormLayout({ children, title }: LayoutFormProps): JSX.Element {
  return (
    <main className="min-h-[100vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-8 px-16 py-8 rounded-2xl bg-blue-200 shadow-xl">
        <header className="text-4xl">{title}</header>
        {children}
      </div>
    </main>
  );
}
