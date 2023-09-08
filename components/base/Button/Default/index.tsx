interface ButtonDefaultProps {
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export default function ButtonDefault({
  children,
  type = "button"
}: ButtonDefaultProps): JSX.Element {
  return (
    <button
      type={type}
      className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-800 shadow-lg"
    >
      {children}
    </button>
  );
}
