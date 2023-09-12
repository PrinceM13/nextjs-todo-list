import type { IFilter } from "@/interfaces/frontend";

export default function NameList({
  nameList,
  onSelectMember
}: {
  nameList: IFilter.IMember[];
  onSelectMember: (name: IFilter.IMember) => void;
}): JSX.Element {
  return (
    <>
      {nameList.length > 0 && (
        <div className="absolute left-0 w-full mt-2">
          {nameList?.map((member, idx) => (
            <div
              key={idx}
              onClick={() => onSelectMember(member)}
              className="w-full bg-white px-1.5 py-0.5 border-b-2 cursor-pointer hover:bg-neutral-200"
            >
              {member?.displayName}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
