import { converter } from "@/utils";

import type { IFilter } from "@/interfaces/frontend";

export default function FilterNameList({
  nameList,
  searchNames,
  setSearchNames,
  setInputMemberFilter,
  setNameFilter
}: {
  nameList: IFilter.INameList[];
  searchNames: string[];
  setSearchNames: (searchNames: string[]) => void;
  setInputMemberFilter: (inputMemberFilter: string) => void;
  setNameFilter: (nameFilter: string) => void;
}): JSX.Element {
  // * add selected member
  const onSelectMember = (name: string) => {
    if (!searchNames.includes(name)) {
      setSearchNames([...searchNames, name]);
      setInputMemberFilter("");

      // * auto search after select member
      const newName = converter.convertArrayToStringWithComma([...searchNames, name]);
      setNameFilter(newName);
    }
  };

  return (
    <>
      {nameList.length > 0 && (
        <div className="absolute left-0 w-full mt-2">
          {nameList?.map((name, idx) => (
            <div
              key={idx}
              onClick={() => onSelectMember(name.displayName)}
              className="w-full bg-white px-1.5 py-0.5 border-b-2 cursor-pointer hover:bg-neutral-200"
            >
              {name?.displayName}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
