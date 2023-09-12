"use client";

import { useEffect, useState } from "react";

import { axios } from "@/utils-frontend";
import { useMemberSearch, useModal } from "@/hook";
import { Filter, Form, Spinner, StickyNote } from "@/components";
import { Button, Input } from "@/components/base";

import type { ITodoDocumentProps, ITodoDocumentUpdateProps } from "@/interfaces/global";
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

  // * use for status filter
  const [statusFilter, setStatusFilter] = useState<IFilter.TStatusFilter>("all");
  // * use for member search
  const [inputSearch, setInputSearch] = useState<string>("");
  const { nameQuery, onInputSearchChange, InputMemberSearch } = useMemberSearch({
    initialMembers: []
  });

  // * use modal hook
  const { openModal, closeModal, CustomModal } = useModal();

  const handleInputSearchChange = (value: string) => {
    setInputSearch(value);
    onInputSearchChange(value);
  };

  // * fetch todo list
  const fetchTodoList = async () => {
    try {
      const res = await axios(`/todo/all?name=${nameQuery}&status=${statusQuery[statusFilter]}`);
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
  }, [statusFilter, nameQuery]);

  // * search todo list (currently use auto search instead of search button)
  // const handleSearchClick = () => {
  //   const name = converter.convertArrayToStringWithComma(searchNames);
  //   setNameFilter(name);
  // };

  // * create todo item
  const createTodoItem = async (createItem: ITodoDocumentUpdateProps) => {
    setIsLoading(true);
    try {
      const res = await axios.post(`/todo/create`, createItem);
      if (res.status === 201) {
        // * update todo item to todo list state
        setTodoList([...todoList, res.data.data]);
        closeModal();

        setTimeout(() => {
          openModal({
            title: "Todo Item",
            message: "create todo item success",
            type: "success"
          });
        }, 500);
      }
    } catch (error: any) {
      console.log(error);

      openModal({
        title: "Todo Item",
        message: error.response?.data?.message ?? "something went wrong",
        type: "danger"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="flex flex-col gap-8 py-10">
        <header className="text-4xl text-center">Todo List</header>

        {/* filter by member */}
        <section className="flex justify-center items-start gap-4">
          <div>Member</div>

          {/* search part */}
          <div className="relative w-[350px]">
            <Input.TextWithLabel
              initialValue={inputSearch}
              onChange={(value) => handleInputSearchChange(value)}
            />
            <InputMemberSearch onClearInput={() => setInputSearch("")} />
          </div>

          <Button.Default className="text-xs py-1.5" onClick={() => {}}>
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
          <div
            onClick={() =>
              openModal({
                title: "Add Todo Item",
                jsx: (
                  <Form.TodoItem
                    updateTodoItem={createTodoItem}
                    setIsLoading={setIsLoading}
                    onCancel={closeModal}
                    isCreate={true}
                  />
                )
              })
            }
          >
            Add
          </div>
        </div>
      </main>

      {/* modal */}
      <CustomModal />

      {/* spinner */}
      {isLoading && <Spinner.HourGlass />}
    </>
  );
}
