import { useState } from "react";
import { useRouter } from "next/navigation";

import { axios } from "@/utils-frontend";
import { useMemberSearch, useModal } from "@/hooks";
import { Button, Input } from "@/components/base";

import type { ITodoDocumentUpdateProps } from "@/interfaces/global";

export default function TodoItemForm({
  id,
  todoItem,
  updateTodoItem,
  setIsLoading,
  onCancel,
  isCreate = false
}: {
  id?: string | string[];
  todoItem?: ITodoDocumentUpdateProps;
  setIsLoading: (value: boolean) => void;
  updateTodoItem: (updateItem: ITodoDocumentUpdateProps) => Promise<void>;
  onCancel?: () => void;
  isCreate?: boolean;
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
    initialMembers: todoItem?.member ?? [],
    onUpdateMember: (members) => {
      setUpdateItem({ ...updateItem, member: members });
    }
  });
  const handleInputSearchChange = (value: string) => {
    setInputSearch(value);
    onInputSearchChange(value);
  };

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
      <section className="flex flex-col gap-8 max-w-[500px] w-[95%] lg:w-[60%] self-center px-6 py-4 md:px-12 md:py-8 lg:px-16 lg:py-12 rounded-xl shadow-xl bg-yellow-200">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            {/* isCompleted */}
            <Input.CheckBox
              initialValue={todoItem?.isCompleted}
              onChange={(value) => handleTodoItemChange("isCompleted", value)}
            />
            <div>Status</div>
          </div>
          {!isCreate && (
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
          )}
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

          {/* search part */}
          <div className="flex gap-4 text-xs md:text-sm lg:text-base">
            <div className="flex-shrink-0 w-16 lg:w-24">Member</div>
            <div className="relative w-full">
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
            onClick={() => (isCreate ? onCancel && onCancel() : router.push("/todo-list"))}
          >
            {onCancel ? "Cancel" : "Back"}
          </Button.Default>
          <Button.Default
            className="flex-1 bg-green-400 hover:bg-green-500 active:bg-green-600"
            onClick={handleUpdateTodoItem}
          >
            {isCreate ? "Create" : "Save"}
          </Button.Default>
        </div>
      </section>

      {/* modal */}
      <CustomModal />
    </>
  );
}
