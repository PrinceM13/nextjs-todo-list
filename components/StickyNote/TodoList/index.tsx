import { useRouter } from "next/navigation";

import { axios } from "@/utils-frontend";
import { Input } from "@/components/base";

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
          className="flex flex-col gap-2 p-8 rounded-xl bg-yellow-200 hover:bg-yellow-300 shadow-xl cursor-pointer"
          onClick={() => router.push(`/todo-list/${todo._id}`)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`flex-1 flex gap-2 flex-grow-0 justify-center items-center rounded-lg py-1 cursor-default ${
              todo.isCompleted ? "bg-green-300" : "bg-red-300"
            }`}
          >
            <Input.CheckBox
              initialValue={todo.isCompleted}
              onChange={(value) => updateIsCompleted(todo._id ?? "", value)}
            />
            <div>{todo.isCompleted ? "completed" : "incomplete"}</div>
          </div>
          <div>{todo.topic}</div>
          {todo && todo?.member?.map((member, idx) => <div key={idx}>{member.displayName}</div>)}
          <div>{todo.dueDate}</div>
        </div>
      ))}
    </section>
  );
}
