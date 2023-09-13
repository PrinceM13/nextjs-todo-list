import { useRouter } from "next/navigation";

import { axios } from "@/utils-frontend";
import { Input } from "@/components/base";
import { compare, converter } from "@/utils";

import type { ITodoDocumentProps } from "@/interfaces/global";

export default function TodoListStickyNote({
  todoList,
  setTodoList,
  setIsLoading,
  fetchTodoList
}: {
  todoList: ITodoDocumentProps[];
  setTodoList: (todoList: ITodoDocumentProps[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  fetchTodoList?: () => Promise<void>;
}): JSX.Element {
  // * router
  const router = useRouter();

  const updateIsCompleted = async (id: string, isCompleted: boolean) => {
    setIsLoading(true);
    try {
      // * update isCompleted in database
      const res = await axios.patch(`/todo/${id}/update`, { isCompleted });
      // * update isCompleted in todo list state if update is success
      if (res.status === 200) {
        setTodoList(
          todoList.map((todo) => {
            if (todo._id === id) {
              return { ...todo, isCompleted };
            }
            return todo;
          })
        );

        // * auto search after update isCompleted
        fetchTodoList && (await fetchTodoList());
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* todo list item */}
      {todoList.map((todo, idx) => (
        <div
          key={idx}
          className="flex flex-col justify-between gap-8 p-8 rounded-xl bg-yellow-200 hover:bg-yellow-300 active:bg-yellow-400 shadow-xl cursor-pointer"
          onClick={() => router.push(`/todo-list/${todo?._id}`)}
        >
          <div className="flex flex-col gap-4">
            <div
              onClick={(e) => e.stopPropagation()}
              className={`flex-1 flex gap-2 flex-grow-0 justify-center items-center rounded-lg py-1 cursor-default ${
                todo?.isCompleted ? "bg-green-300" : "bg-red-300"
              }`}
            >
              <Input.CheckBox
                initialValue={todo.isCompleted}
                onChange={(value) => updateIsCompleted(todo._id ?? "", value)}
              />
              <div>{todo?.isCompleted ? "completed" : "incomplete"}</div>
            </div>
            <div className="font-bold text-xl">{todo.topic}</div>
            {todo && (
              <div>
                <label>member:</label>
                <div className="flex flex-wrap gap-2 border-2 border-yellow-400 rounded-lg p-2">
                  {todo?.member?.map((member, idx) => (
                    <div
                      key={idx}
                      className="flex justify-center items-center gap-2 w-fit px-2 py-1 cursor-default text-xs bg-neutral-300 rounded-full shadow-md"
                    >
                      <div>{member?.displayName}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {todo.dueDate && (
              <div className="flex gap-2">
                <label>due:</label>
                <div
                  className={`${
                    compare.isOverdue(todo.dueDate) && !todo.isCompleted ? "text-red-600" : ""
                  }`}
                >
                  {converter.dateToString(new Date(todo?.dueDate))}
                </div>
              </div>
            )}
          </div>

          <div className="text-xs lg:text-sm flex gap-2 text-neutral-400 self-end ">
            {(todo && todo?.view) || 0 > 0 ? (
              <>
                <label>view:</label>
                <div>{todo.view}</div>
              </>
            ) : (
              <div>no view</div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
