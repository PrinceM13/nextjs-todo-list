"use client";

import { useEffect, useState } from "react";

import { converter } from "@/utils";
import { axios } from "@/utils-frontend";
import { Filter, Spinner, StickyNote } from "@/components";
import { Button, Input } from "@/components/base";

import type { ITodoDocumentProps } from "@/interfaces/global";
import type { IFilter } from "@/interfaces/frontend";

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
  // * todo list state
  const [todoList, setTodoList] = useState<ITodoDocumentProps[]>([]);

  // * loading state
  const [isLoading, setIsLoading] = useState(true);

  // * filter state
  const [inputMemberFilter, setInputMemberFilter] = useState<string>("");
  const [nameList, setNameList] = useState<IFilter.INameList[]>([]);
  // * selected member state
  const [searchNames, setSearchNames] = useState<string[]>([]);
  // * use for query
  const [statusFilter, setStatusFilter] = useState<IFilter.TStatusFilter>("all");
  const [nameFilter, setNameFilter] = useState<string>("");

  // * fetch todo list
  const fetchTodoList = async () => {
    try {
      const res = await axios(`/todo/all?name=${nameFilter}&status=${statusQuery[statusFilter]}`);
      setTodoList(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
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

  // * search todo list (currently use auto search instead of search button)
  const handleSearchClick = () => {
    const name = converter.convertArrayToStringWithComma(searchNames);
    setNameFilter(name);
  };

  return (
    <>
      <main className="flex flex-col gap-8 py-10">
        <header className="text-4xl text-center">Todo List</header>

        {/* filter by member */}
        <section className="flex justify-center items-start gap-4">
          <div>Member</div>

          {/* search part */}
          <>
            {/* input search */}
            <div className="relative w-[350px]">
              <Input.TextWithLabel
                initialValue={inputMemberFilter}
                onChange={(value) => setInputMemberFilter(value)}
              />

              {/* selected member */}
              <Filter.SelectedMember
                searchNames={searchNames}
                setSearchNames={setSearchNames}
                setNameFilter={setNameFilter}
              />

              {/* recommended name list from database */}
              <Filter.NameList
                nameList={nameList}
                searchNames={searchNames}
                setSearchNames={setSearchNames}
                setInputMemberFilter={setInputMemberFilter}
                setNameFilter={setNameFilter}
              />
            </div>
          </>

          <Button.Default className="text-xs py-1.5" onClick={handleSearchClick}>
            Search
          </Button.Default>
        </section>

        {/* filter by status */}
        <Filter.StatusBar
          statusFilter={statusFilter}
          onClick={(status) => setStatusFilter(status)}
        />

        {/* todo list */}
        <StickyNote.TodoList
          todoList={todoList}
          setTodoList={setTodoList}
          setIsLoading={setIsLoading}
          fetchTodoList={statusFilter !== "all" ? fetchTodoList : undefined}
        />

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
