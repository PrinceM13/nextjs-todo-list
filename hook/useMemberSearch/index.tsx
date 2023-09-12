import { use, useEffect, useRef, useState } from "react";

import { converter } from "@/utils";
import { axios } from "@/utils-frontend";
import { Filter } from "@/components";

import type { IFilter } from "@/interfaces/frontend";

export default function useMemberSearch() {
  // * input search state
  const [inputSearch, setInputSearch] = useState<string>("");
  // * name list state
  const [nameList, setNameList] = useState<IFilter.INameList[]>([]);
  // * selected member state
  const [searchNames, setSearchNames] = useState<string[]>([]);
  // * use for query
  const [nameQuery, setNameQuery] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchNameList = async () => {
      try {
        const res = await axios(`/member/name-list?name=${inputSearch}`);
        setNameList(res.data.data);
        inputRef.current?.focus();
      } catch (error) {
        console.log(error);
      }
    };

    const id = setTimeout(() => {
      fetchNameList();
    }, 300);

    return () => {
      inputRef.current?.blur();
      clearTimeout(id);
    };
  }, [inputSearch]);

  // * manage selected member ---------------------------------------------

  // * delete member
  const onDeleteMember = (name: string) => {
    setSearchNames(searchNames.filter((searchName) => searchName !== name));

    // * auto search after delete member
    const newName = converter.convertArrayToStringWithComma(
      searchNames.filter((searchName) => searchName !== name)
    );
    setNameQuery(newName);
  };

  // * select member from name list
  const onSelectMember = (name: string) => {
    if (!searchNames.includes(name)) {
      setSearchNames([...searchNames, name]);
      setInputSearch("");

      // * auto search after select member
      const newName = converter.convertArrayToStringWithComma([...searchNames, name]);
      setNameQuery(newName);
    }
  };

  // * input search -----------------------------------------
  const onInputSearchChange = (value: string) => {
    setInputSearch(value);
  };

  // * UI for input member search -----------------------------------------
  const InputMemberSearch = ({ onClearInput }: { onClearInput: () => void }): JSX.Element => {
    return (
      <>
        {/* selected member */}
        <Filter.Member.SelectedMember searchNames={searchNames} onDeleteMember={onDeleteMember} />

        {/* recommended name list from database */}
        <Filter.Member.NameList
          nameList={nameList}
          onSelectMember={(name) => {
            onSelectMember(name);
            onClearInput();
          }}
        />
      </>
    );
  };

  return {
    nameQuery,
    onInputSearchChange,
    InputMemberSearch
  };
}
