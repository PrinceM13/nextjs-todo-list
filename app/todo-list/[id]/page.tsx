"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { axios } from "@/utils-frontend";
import { useModal } from "@/hook";
import { Spinner } from "@/components";
import { Button, Input } from "@/components/base";

import type { ITodoDocumentProps } from "@/interfaces/global";

export default function TodoItemPage(): JSX.Element {
  // * router
  const router = useRouter();

  // * get todo id from url
  const params = useParams();
  const id: string | string[] = params.id;

  // * use modal hook
  const { openModal, closeModal, CustomModal } = useModal();

  // * todo detail state
  const [todoItem, setTodoItem] = useState<ITodoDocumentProps>();

  // * spinner state
  const [isLoading, setIsLoading] = useState(false);

  // * fetch todo item by id
  useEffect(() => {
    const fetchTodoItem = async () => {
      try {
        const res = await axios(`/todo/${id}/detail`);
        setTodoItem(res.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTodoItem();
  }, []);

  // convert date to locale string
  const dateToString = (date: Date | null) =>
    new Date(date ?? "").toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });

  // * handle delete todo item
  const handleDeleteTodoItem = async () => {
    try {
      await axios.delete(`/todo/${id}/delete`);
      router.push("/todo-list");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main className="flex flex-col gap-8 min-h-screen justify-center items-center">
        <header className="text-4xl text-center">Todo Item</header>

        {/* todo item */}
        <section className="flex flex-col gap-8 w-[500px] self-center px-16 py-12 rounded-xl shadow-xl bg-yellow-200">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <input type="checkbox" />
              <div>Status</div>
            </div>
            <Button.Default
              className="bg-red-400 hover:bg-red-500 active:bg-red-600"
              onClick={() =>
                openModal({
                  title: "Delete Todo Item",
                  type: "danger",
                  message: "Are you sure you want to delete this todo item?",
                  jsx: (
                    <div className="flex justify-center gap-4">
                      <Button.Default
                        className="bg-red-400 hover:bg-red-500 active:bg-red-600"
                        onClick={() => closeModal()}
                      >
                        Cancel
                      </Button.Default>
                      <Button.Default
                        className="bg-neutral-400 hover:bg-neutral-500 active:bg-neutral-600"
                        onClick={() => handleDeleteTodoItem()}
                      >
                        Delete
                      </Button.Default>
                    </div>
                  )
                })
              }
            >
              Delete
            </Button.Default>
          </div>
          <div className="flex flex-col gap-4">
            <Input.TextWithLabel label="Topic" initialValue={todoItem?.topic} />
            <Input.TextWithLabel label="Detail" initialValue={todoItem?.detail} />
            <Input.TextWithLabel
              label="Due Date"
              initialValue={dateToString(todoItem?.createdAt || null)}
            />
            <Input.TextWithLabel
              label="Member"
              initialValue={todoItem?.member ? todoItem?.member[0]?.name : ""}
            />
          </div>

          <div className="flex self-center gap-4 w-[100%]">
            <Button.Default
              className="flex-1 bg-neutral-400 hover:bg-neutral-500 active:bg-neutral-600"
              onClick={() => router.push("/todo-list")}
            >
              Back
            </Button.Default>
            <Button.Default className="flex-1 bg-green-400 hover:bg-green-500 active:bg-green-600">
              Save
            </Button.Default>
          </div>
        </section>
      </main>

      {/* spinner */}
      {isLoading && <Spinner.HourGlass />}

      {/* modal */}
      <CustomModal />
    </>
  );
}
