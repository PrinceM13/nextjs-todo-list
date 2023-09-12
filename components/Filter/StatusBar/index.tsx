import StatusButton from "../StatusButton";

import type { IFilter } from "@/interfaces/frontend";

export default function FilterStatusBar({
  statusFilter,
  onClick
}: {
  statusFilter: IFilter.TStatusFilter;
  onClick: (status: IFilter.TStatusFilter) => void;
}): JSX.Element {
  return (
    <section className="flex justify-between shadow-xl">
      <StatusButton status="all" isSelect={statusFilter === "all"} onClick={() => onClick("all")} />
      <StatusButton
        status="incomplete"
        isSelect={statusFilter === "incomplete"}
        onClick={() => onClick("incomplete")}
      />
      <StatusButton
        status="completed"
        isSelect={statusFilter === "completed"}
        onClick={() => onClick("completed")}
      />
    </section>
  );
}
