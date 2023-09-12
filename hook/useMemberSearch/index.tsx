import { useEffect, useRef, useState } from "react";

import { converter } from "@/utils";
import { axios } from "@/utils-frontend";
import { Filter } from "@/components";

import type { IFilter } from "@/interfaces/frontend";

export default function useMemberSearch({
  initialMembers = []
}: {
  initialMembers?: IFilter.IMember[];
}) {
  // * input search state
  const [inputSearch, setInputSearch] = useState<string>("");
  // * name list state
  const [nameList, setNameList] = useState<IFilter.IMember[]>([]);
  // * selected member state
  const [members, setMembers] = useState<IFilter.IMember[]>(initialMembers);
  // * use for query
  const [nameQuery, setNameQuery] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    initialMembers.length > 0 && setMembers(initialMembers);
  }, [initialMembers]);

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
  const onDeleteMember = (deleteMember: IFilter.IMember) => {
    setMembers(members.filter((member) => member.displayName !== deleteMember.displayName));

    const memberNames: string[] = members
      .filter((member) => member.displayName !== deleteMember.displayName)
      .map((member) => member.displayName ?? "");

    // * auto search after delete member
    const newName = converter.convertArrayToStringWithComma(memberNames);
    setNameQuery(newName);
  };

  // * select member from name list
  const onSelectMember = (newMember: IFilter.IMember) => {
    // TODO: use user_id instead of displayName
    if (!members.some((member) => member.displayName === newMember.displayName)) {
      // if (!members.some((member) => member.user_id === newMember.user_id)) {
      setMembers([...members, newMember]);
      setInputSearch("");

      const memberNames: string[] = members.map((member) => member.displayName ?? "");

      // * auto search after select member
      const newName = converter.convertArrayToStringWithComma([
        ...memberNames,
        newMember.displayName ?? ""
      ]);
      setNameQuery(newName);
    } else {
      setInputSearch("");
      setNameList([]);
    }
  };

  // * --------------------------------------------------------------------

  // * input search
  const onInputSearchChange = (value: string) => {
    setInputSearch(value);
  };

  // * UI for input member search
  const InputMemberSearch = ({
    title,
    initialSelectedMember,
    onClearInput
  }: {
    title?: string;
    initialSelectedMember?: {
      user_id?: string;
      displayName?: string;
    }[];
    onClearInput: () => void;
  }): JSX.Element => {
    return (
      <>
        {/* selected member */}
        <Filter.Member.SelectedMember
          title={title}
          members={members}
          onDeleteMember={onDeleteMember}
        />

        {/* recommended name list from database */}
        <Filter.Member.NameList
          nameList={nameList}
          onSelectMember={(member) => {
            onSelectMember(member);
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
