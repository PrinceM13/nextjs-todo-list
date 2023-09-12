"use client";

import { useEffect, useState } from "react";
import LabelFrame from "../LabelFrame";

interface TextWithLabelProps {
  name?: string;
  initialValue?: string;
  label?: string;
  labelWidth?: string;
  isRequired?: boolean;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  type?: string;
  error?: string;
  onChange?: (value: string) => void;
}

export default function TextWithLabel({
  label,
  labelWidth,
  initialValue,
  isRequired,
  type = "text",
  error = "",
  onChange
}: TextWithLabelProps): JSX.Element {
  const [value, setValue] = useState(initialValue ?? "");

  useEffect(() => {
    setValue(initialValue ?? "");
  }, [initialValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange && onChange(e.target.value);
  };

  return (
    <LabelFrame label={label ?? ""} labelWidth={labelWidth}>
      <input
        type={type}
        className="w-[100%] px-2 py-1 rounded-lg outline outline-2 outline-blue-300"
        value={value}
        onChange={handleChange}
        required={isRequired}
      />
      {error && <p className="text-red-600">{error}</p>}
    </LabelFrame>
  );
}
