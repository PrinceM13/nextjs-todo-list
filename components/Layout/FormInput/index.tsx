interface LayoutFormInputProps {
  children?: React.ReactNode;
}

export default function FormInputLayout({ children }: LayoutFormInputProps): JSX.Element {
  return <div className="flex flex-col gap-4 w-[100%]">{children}</div>;
}
