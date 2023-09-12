interface FormFrameProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function FormFrame({ children, onSubmit }: FormFrameProps): JSX.Element {
  return (
    <form className="flex flex-col gap-8 w-[400px] items-center" onSubmit={onSubmit}>
      {children}
    </form>
  );
}
