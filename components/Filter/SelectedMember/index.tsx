import { converter } from "@/utils";

export default function FilterSelectedMember({
  searchNames,

  setSearchNames,
  setNameFilter
}: {
  searchNames: string[];
  setSearchNames: (searchNames: string[]) => void;
  setNameFilter: (nameFilter: string) => void;
}): JSX.Element {
  // * delete selected member
  const onDeleteMember = (name: string) => {
    setSearchNames(searchNames.filter((searchName) => searchName !== name));

    // * auto search after delete member
    const newName = converter.convertArrayToStringWithComma(
      searchNames.filter((searchName) => searchName !== name)
    );
    setNameFilter(newName);
  };

  return (
    <>
      {searchNames.length > 0 && (
        <div>
          <div className="text-sm mt-2">filter with:</div>
          <div className="flex flex-wrap gap-1 mt-1 rounded-xl p-2 border-2 border-neutral-300">
            {searchNames.map((name, idx) => (
              <div
                key={idx}
                className="flex justify-center items-center gap-2 w-fit px-2 py-1 cursor-default text-xs bg-neutral-300 rounded-full shadow-md"
              >
                <div>{name}</div>
                <div
                  className="font-bold text-red-600 cursor-pointer"
                  onClick={() => onDeleteMember(name)}
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
