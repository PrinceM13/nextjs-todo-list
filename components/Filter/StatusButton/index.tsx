interface StatusButtonProps {
  [status: string]: {
    title: string;
    color: string;
    backgroundColor: string;
    hoverColor: string;
    hoverBackgroundColor: string;
    activeColor: string;
    activeBackgroundColor: string;
    disabledColor: string;
    disabledBackgroundColor: string;
  };
}

const statusButtonProps: StatusButtonProps = {
  all: {
    title: "All",
    color: "text-neutral-700",
    backgroundColor: "bg-neutral-200",
    hoverColor: "hover:text-neutral-800",
    hoverBackgroundColor: "hover:bg-neutral-300",
    activeColor: "active:text-neutral-900",
    activeBackgroundColor: "active:bg-neutral-400",
    disabledColor: "text-neutral-500",
    disabledBackgroundColor: "bg-neutral-200"
  },
  incomplete: {
    title: "Incomplete",
    color: "text-red-700",
    backgroundColor: "bg-red-200",
    hoverColor: "hover:text-red-800",
    hoverBackgroundColor: "hover:bg-red-300",
    activeColor: "active:text-red-900",
    activeBackgroundColor: "active:bg-red-400",
    disabledColor: "text-red-500",
    disabledBackgroundColor: "bg-red-200"
  },
  completed: {
    title: "Completed",
    color: "text-green-700",
    backgroundColor: "bg-green-200",
    hoverColor: "hover:text-green-800",
    hoverBackgroundColor: "hover:bg-green-300",
    activeColor: "active:text-green-900",
    activeBackgroundColor: "active:bg-green-400",
    disabledColor: "text-green-500",
    disabledBackgroundColor: "bg-green-200"
  }
};

export default function StatusButton({
  status,
  isSelect = false,
  onClick
}: {
  status: "all" | "incomplete" | "completed";
  isSelect?: boolean;
  onClick: () => void;
}): JSX.Element {
  const {
    title,
    color,
    backgroundColor,
    hoverColor,
    hoverBackgroundColor,
    activeColor,
    activeBackgroundColor,
    disabledColor,
    disabledBackgroundColor
  } = statusButtonProps[status];

  const dynamicClassName: string = `${color} ${backgroundColor} ${hoverColor} ${hoverBackgroundColor} ${activeColor} ${activeBackgroundColor} ${disabledColor} ${disabledBackgroundColor}`;

  return (
    <div
      onClick={onClick}
      style={{
        borderBottom: isSelect
          ? `2px solid ${
              status === "all" ? "#262626" : status === "completed" ? "#166534" : "#991b1b"
            }`
          : ""
      }}
      className={`flex-1 text-center py-4 cursor-pointer ${dynamicClassName}`}
    >
      {title}
    </div>
  );
}
