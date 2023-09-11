"use client";

import { useEffect, useState } from "react";

import { axios } from "@/utils-frontend";
import { Button, Input } from "@/components/base";
import { Spinner } from "@/components";
import { ITodoDocumentProps } from "@/interfaces/global";

export default function TodoListPage(): JSX.Element {
  // * todo list state
  const [todoList, setTodoList] = useState<ITodoDocumentProps[]>([]);

  // * loading state
  const [isLoading, setIsLoading] = useState(true);

  // * fetch todo list
  useEffect(() => {
    const fetchTodoList = async () => {
      try {
        const res = await axios("/todo/all");
        setTodoList(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTodoList();
  }, []);

  return (
    <>
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
          {todoList.map((todo, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between gap-2 p-8 rounded-xl bg-yellow-200 hover:bg-yellow-300 shadow-xl cursor-pointer"
            >
              <div className="flex-1 flex gap-2">
                <input type="checkbox" />
                <div>Status</div>
              </div>
              <div>{todo.topic}</div>
              {todo && todo?.member?.map((member, idx) => <div>{member.name}</div>)}
              <div>{todo.dueDate}</div>
            </div>
          ))}
        </section>

        {/* add todo */}
        <div className="w-20 h-20 rounded-full fixed right-12 bottom-12 cursor-pointer shadow-xl bg-blue-200 hover:bg-blue-300 active:bg-blue-400 text-blue-700 flex justify-center items-center">
          <div>Add</div>
        </div>
      </main>

      {/* spinner */}
      {isLoading && <Spinner.HourGlass />}
    </>
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
