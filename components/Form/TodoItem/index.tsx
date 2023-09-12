import { useState } from "react";
import { useRouter } from "next/navigation";

import { axios } from "@/utils-frontend";
import { useMemberSearch, useModal } from "@/hook";
import { Button, Input } from "@/components/base";

import type { ITodoDocumentUpdateProps } from "@/interfaces/global";

export default function TodoItemForm({
  id,
  todoItem,
  updateTodoItem,
  setIsLoading
}: {
  id?: string | string[];
  todoItem?: ITodoDocumentUpdateProps;
  setIsLoading: (value: boolean) => void;
  updateTodoItem: (updateItem: ITodoDocumentUpdateProps) => Promise<void>;
}): JSX.Element {
  // * router
  const router = useRouter();

  // * use modal hook
  const { openModal, closeModal, CustomModal } = useModal();

  // * update todo item state
  const [updateItem, setUpdateItem] = useState<ITodoDocumentUpdateProps>({});

  // * use for member search
  const [inputSearch, setInputSearch] = useState<string>("");
  const { onInputSearchChange, InputMemberSearch } = useMemberSearch({
    initialMembers: todoItem?.member ?? []
  });
  const handleInputSearchChange = (value: string) => {
    setInputSearch(value);
    onInputSearchChange(value);
  };

  // TODO: update member to database

  // * handle update todo item
  const handleUpdateTodoItem = async () => {
    setIsLoading(true);
    try {
      await updateTodoItem(updateItem);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // * handle todo item change
  const handleTodoItemChange = (name: string, value: string | boolean) => {
    setUpdateItem({ ...updateItem, [name]: value });
  };

  // * handle delete todo item
  const handleDeleteTodoItem = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`/todo/${id}/delete`);
      router.push("/todo-list");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="flex flex-col gap-8 w-[500px] self-center px-16 py-12 rounded-xl shadow-xl bg-yellow-200">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            {/* isCompleted */}
            <Input.CheckBox
              initialValue={todoItem?.isCompleted}
              onChange={(value) => handleTodoItemChange("isCompleted", value)}
            />
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
          <Input.TextWithLabel
            label="Topic"
            initialValue={todoItem?.topic}
            onChange={(value) => handleTodoItemChange("topic", value)}
          />
          <Input.TextWithLabel
            label="Detail"
            initialValue={todoItem?.detail}
            onChange={(value) => handleTodoItemChange("detail", value)}
          />
          <Input.TextWithLabel
            label="Due Date"
            type="date"
            initialValue={String(todoItem?.dueDate).split("T")[0]}
            onChange={(value) => handleTodoItemChange("dueDate", value)}
          />

          <Input.TextWithLabel
            label="Member"
            initialValue={todoItem?.member ? todoItem?.member[0]?.displayName : ""}
            onChange={(value) => handleTodoItemChange("member", value)}
          />
          {/* search part */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-24">Member</div>
            <div className="relative w-[350px]">
              <Input.TextWithLabel
                initialValue={inputSearch}
                placeholder="type to search member"
                onChange={(value) => handleInputSearchChange(value)}
              />
              <InputMemberSearch
                title="selected member"
                initialSelectedMember={todoItem?.member}
                onClearInput={() => setInputSearch("")}
              />
            </div>
          </div>
        </div>

        <div className="flex self-center gap-4 w-[100%]">
          <Button.Default
            className="flex-1 bg-neutral-400 hover:bg-neutral-500 active:bg-neutral-600"
            onClick={() => router.push("/todo-list")}
          >
            Back
          </Button.Default>
          <Button.Default
            className="flex-1 bg-green-400 hover:bg-green-500 active:bg-green-600"
            onClick={handleUpdateTodoItem}
          >
            Save
          </Button.Default>
        </div>
      </section>

      {/* modal */}
      <CustomModal />
    </>
  );
}
