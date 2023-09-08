interface FormFrameProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function FormFrame({ children }: FormFrameProps): JSX.Element {
  return <form className="flex flex-col gap-8 w-[400px] items-center">{children}</form>;
}
