"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { axios } from "@/utils-frontend";
import { Spinner } from "@/components";
import { Button, Input } from "@/components/base";
import { ITodoDocumentProps } from "@/interfaces/global";

interface NameList {
  _id: string;
  displayName: string;
}
interface StatusQuery {
  completed: string;
  incomplete: string;
  all: string;
}

const statusQuery: StatusQuery = {
  completed: "true",
  incomplete: "false",
  all: ""
};

export default function TodoListPage(): JSX.Element {
  // * router
  const router = useRouter();

  // * todo list state
  const [todoList, setTodoList] = useState<ITodoDocumentProps[]>([]);

  // * loading state
  const [isLoading, setIsLoading] = useState(true);

  // * filter state
  const [inputMemberFilter, setInputMemberFilter] = useState<string>("");
  const [nameList, setNameList] = useState<NameList[]>([]);
  // * selected member state
  const [searchNames, setSearchNames] = useState<string[]>([]);
  // * use for query
  const [statusFilter, setStatusFilter] = useState<"completed" | "incomplete" | "all">("all");
  const [nameFilter, setNameFilter] = useState<string>("");

  // * fetch todo list
  useEffect(() => {
    setIsLoading(true);
    const fetchTodoList = async () => {
      try {
        const res = await axios(`/todo/all?name=${nameFilter}&status=${statusQuery[statusFilter]}`);
        setTodoList(res.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTodoList();
  }, [statusFilter, nameFilter]);

  useEffect(() => {
    const fetchNameList = async () => {
      try {
        const res = await axios(`/member/name-list?name=${inputMemberFilter}`);
        setNameList(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    const id = setTimeout(() => {
      fetchNameList();
    }, 300);

    return () => clearTimeout(id);
  }, [inputMemberFilter]);

  // * add selected member
  const onSelectMember = (name: string) => {
    if (!searchNames.includes(name)) {
      setSearchNames([...searchNames, name]);
      setInputMemberFilter("");
    }
  };

  // * delete selected member
  const onDeleteMember = (name: string) => {
    setSearchNames(searchNames.filter((searchName) => searchName !== name));
  };

  // * convert array of string to string with comma
  const convertArrayToStringWithComma = (array: string[]): string => {
    let result = "";
    array?.forEach((item, idx) => {
      if (idx === array.length - 1) {
        result += item;
      } else {
        result += `${item},`;
      }
    });
    return result;
  };

  const handleSearchClick = () => {
    const name = convertArrayToStringWithComma(searchNames);
    setNameFilter(name);
  };

  return (
    <>
      <main className="flex flex-col gap-8 py-10">
        <header className="text-4xl text-center">Todo List</header>

        {/* filter by member */}
        <section className="flex justify-center items-start gap-4">
          <div>Member</div>
          <div className="relative w-[250px]">
            <Input.TextWithLabel
              initialValue={inputMemberFilter}
              onChange={(value) => setInputMemberFilter(value)}
            />

            {/* selected member */}
            {searchNames.length > 0 && (
              <div>
                <div className="text-xs mt-2">filter with:</div>
                <div className="flex flex-wrap gap-1 mt-1 rounded-xl p-2 border-2 border-neutral-300">
                  {searchNames.map((name, idx) => (
                    <div
                      key={idx}
                      className="flex justify-center items-center gap-2 w-fit px-2 py-1 cursor-default text-[0.5rem] bg-neutral-300 rounded-full shadow-md"
                    >
                      <div>{name}</div>
                      <div
                        className="font-bold text-red-600 cursor-pointer"
                        onClick={() => onDeleteMember(name)}
                      >
                        x
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* name list */}
            {nameList.length > 0 && (
              <div className="absolute left-0 w-full mt-2">
                {nameList?.map((name, idx) => (
                  <div
                    key={idx}
                    onClick={() => onSelectMember(name.displayName)}
                    className="w-full bg-white px-1.5 py-0.5 border-b-2 cursor-pointer hover:bg-neutral-200"
                  >
                    {name?.displayName}
                  </div>
                ))}
              </div>
            )}
          </div>
          <Button.Default className="text-xs py-1.5" onClick={handleSearchClick}>
            Search
          </Button.Default>
        </section>

        {/* filter by status */}
        <section className="flex justify-between shadow-xl">
          <StatusButton
            status="all"
            isSelect={statusFilter === "all"}
            onClick={() => setStatusFilter("all")}
          />
          <StatusButton
            status="incomplete"
            isSelect={statusFilter === "incomplete"}
            onClick={() => setStatusFilter("incomplete")}
          />
          <StatusButton
            status="completed"
            isSelect={statusFilter === "completed"}
            onClick={() => setStatusFilter("completed")}
          />
        </section>

        {/* todo list */}
        <section className="grid grid-cols-3 gap-8">
          {/* todo list item */}
          {todoList.map((todo, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between gap-2 p-8 rounded-xl bg-yellow-200 hover:bg-yellow-300 shadow-xl cursor-pointer"
              onClick={() => router.push(`/todo-list/${todo._id}`)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className={`flex-1 flex gap-2 justify-center rounded-lg py-1 cursor-default ${
                  todo.isCompleted ? "bg-green-300" : "bg-red-300"
                }`}
              >
                <input type="checkbox" className="cursor-pointer" checked={todo.isCompleted} />
                <div>{todo.isCompleted ? "completed" : "incomplete"}</div>
              </div>
              <div>{todo.topic}</div>
              {todo &&
                todo?.member?.map((member, idx) => <div key={idx}>{member.displayName}</div>)}
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

function StatusButton({
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
