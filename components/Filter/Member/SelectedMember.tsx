import { IFilter } from "@/interfaces/frontend";

export default function SelectedMember({
  title = "filter with:",
  members,
  onDeleteMember
}: {
  title?: string;
  members: IFilter.IMember[];
  onDeleteMember: (name: IFilter.IMember) => void;
}): JSX.Element {
  return (
    <>
      {members.length > 0 && (
        <div>
          <div className="text-sm mt-2">{title}</div>
          <div className="flex flex-wrap gap-1 mt-1 rounded-xl p-2 border-2 border-neutral-300">
            {members.map((member, idx) => (
              <div
                key={idx}
                className="flex justify-center items-center gap-2 w-fit px-2 py-1 cursor-default text-xs bg-neutral-300 rounded-full shadow-md"
              >
                <div>{member.displayName}</div>
                <div
                  className="font-bold text-red-600 cursor-pointer"
                  onClick={() => onDeleteMember(member)}
                >
                  x
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
