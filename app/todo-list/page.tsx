import { Button, Input } from "@/components/base";

const todoList: any[] = [
  {
    id: 1,
    status: "incomplete",
    topic: "Todo List App",
    member: "Manee",
    dueDate: "2021-10-01"
  },
  {
    id: 2,
    status: "incomplete",
    topic: "Go to the gym",
    member: "Somchit",
    dueDate: "2021-10-01"
  },
  {
    id: 3,
    status: "incomplete",
    topic: "Do homework",
    member: "Ploy",
    dueDate: "2021-10-01"
  },
  {
    id: 4,
    status: "incomplete",
    topic: "Dinner with friends",
    member: "Piti",
    dueDate: "2021-10-01"
  },
  {
    id: 5,
    status: "incomplete",
    topic: "Travel to Japan",
    member: "John",
    dueDate: "2021-10-01"
  },
  {
    id: 6,
    status: "incomplete",
    topic: "Todo List App",
    member: "Manee",
    dueDate: "2021-10-01"
  },
  {
    id: 7,
    status: "incomplete",
    topic: "Go to the gym",
    member: "Somchit",
    dueDate: "2021-10-01"
  },
  {
    id: 8,
    status: "incomplete",
    topic: "Do homework",
    member: "Ploy",
    dueDate: "2021-10-01"
  }
];

export default function TodoListPage(): JSX.Element {
  return (
    <main className="flex flex-col gap-8">
      <header className="text-4xl text-center">Todo List</header>

      {/* filter by member */}
      <section className="flex justify-center items-center gap-4">
        <Input.TextWithLabel label="Member" labelWidth="4rem" />
        <Button.Default>Search</Button.Default>
      </section>

      {/* filter by status */}
      <section className="flex justify-between shadow-xl">
        <StatusButton status="all" />
        <StatusButton status="incomplete" />
        <StatusButton status="completed" />
      </section>

      {/* todo list */}
      <section className="grid grid-cols-3 gap-8">
        {/* todo list item */}
        {todoList.map((todo) => (
          <div className="flex flex-col justify-between gap-2 p-8 rounded-xl bg-yellow-200 hover:bg-yellow-300 shadow-xl cursor-pointer">
            <div className="flex-1 flex gap-2">
              <input type="checkbox" />
              <div>Status</div>
            </div>
            <div>{todo.topic}</div>
            <div>{todo.member}</div>
            <div>{todo.dueDate}</div>
          </div>
        ))}
      </section>

      {/* add todo */}
      <div className="w-20 h-20 rounded-full fixed right-12 bottom-12 cursor-pointer shadow-xl bg-blue-200 hover:bg-blue-300 active:bg-blue-400 text-blue-700 flex justify-center items-center">
        <div>Add</div>
      </div>
    </main>
  );
}

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
    color: "text-gray-700",
    backgroundColor: "bg-gray-200",
    hoverColor: "hover:text-gray-800",
    hoverBackgroundColor: "hover:bg-gray-300",
    activeColor: "active:text-gray-900",
    activeBackgroundColor: "active:bg-gray-400",
    disabledColor: "text-gray-500",
    disabledBackgroundColor: "bg-gray-200"
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

function StatusButton({ status }: { status: "all" | "incomplete" | "completed" }): JSX.Element {
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
    <div className={`flex-1 text-center py-4 cursor-pointer ${dynamicClassName}`}>{title}</div>
  );
}
