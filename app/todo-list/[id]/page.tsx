"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { axios } from "@/utils-frontend";
import { useModal } from "@/hook";
import { Form, Spinner } from "@/components";

import type { ITodoDocumentUpdateProps } from "@/interfaces/global";

export default function TodoItemPage(): JSX.Element {
  // * get todo id from url
  const params = useParams();
  const id: string | string[] = params.id;

  // * use modal hook
  const { openModal, closeModal, CustomModal } = useModal();

  // * todo detail state
  const [todoItem, setTodoItem] = useState<ITodoDocumentUpdateProps>();

  // * spinner state
  const [isLoading, setIsLoading] = useState(true);

  // * fetch todo item by id
  useEffect(() => {
    setIsLoading(true);
    const fetchTodoItem = async () => {
      try {
        const res = await axios.get(`/todo/${id}/detail`);
        setTodoItem(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodoItem();
  }, []);

  // * update todo item
  const updateTodoItem = async (updateItem: ITodoDocumentUpdateProps) => {
    setIsLoading(true);
    try {
      const res = await axios.patch(`/todo/${id}/update`, updateItem);
      if (res.status === 200) {
        // * update todo item state
        setTodoItem({ ...todoItem, ...updateItem });
        openModal({
          title: "Todo Item",
          message: "Update todo item success",
          type: "success"
        });
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
      <main className="flex flex-col gap-8 min-h-screen justify-center items-center">
        <header className="text-4xl text-center">Todo Item</header>

        {/* todo item */}
        <Form.TodoItem
          todoItem={todoItem}
          id={id}
          updateTodoItem={updateTodoItem}
          setIsLoading={setIsLoading}
        />
      </main>

      {/* modal */}
      <CustomModal />

      {/* spinner */}
      {isLoading && <Spinner.HourGlass />}
    </>
  );
}
