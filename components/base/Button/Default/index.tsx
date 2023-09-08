interface ButtonDefaultProps {
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
}

export default function ButtonDefault({
  children,
  type = "button",
  className = ""
}: ButtonDefaultProps): JSX.Element {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 shadow-lg ${className}`}
    >
      {children}
    </button>
  );
}
