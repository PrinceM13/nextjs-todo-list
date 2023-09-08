import { Button, Input } from "@/components/base";

export default function TodoItemPage(): JSX.Element {
  return (
    <main className="flex flex-col gap-8">
      <header className="text-4xl text-center">Todo Item</header>

      {/* todo item */}
      <section className="flex flex-col gap-8 w-[500px] self-center px-16 py-12 rounded-xl shadow-xl bg-yellow-200">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <input type="checkbox" />
            <div>Status</div>
          </div>
          <Button.Default className="bg-red-400 hover:bg-red-500 active:bg-red-600">
            Delete
          </Button.Default>
        </div>
        <div className="flex flex-col gap-4">
          <Input.TextWithLabel label="Topic" />
          <Input.TextWithLabel label="Detail" />
          <Input.TextWithLabel label="Due Date" />
          <Input.TextWithLabel label="Member" />
        </div>

        <div className="flex self-center gap-4 w-[100%]">
          <Button.Default className="flex-1 bg-neutral-400 hover:bg-neutral-500 active:bg-neutral-600">
            Back
          </Button.Default>
          <Button.Default className="flex-1 bg-green-400 hover:bg-green-500 active:bg-green-600">
            Save
          </Button.Default>
        </div>
      </section>
    </main>
  );
}
