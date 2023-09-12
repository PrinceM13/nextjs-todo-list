import { useEffect, useState } from "react";

interface CheckBoxProps {
  name?: string;
  initialValue?: boolean;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
  error?: string;
  onChange?: (value: boolean) => void;
}

export default function CheckBox({ initialValue, onChange }: CheckBoxProps): JSX.Element {
  const [value, setValue] = useState<boolean>(initialValue ?? false);

  useEffect(() => {
    setValue(initialValue ?? false);
  }, [initialValue]);

  const handleChange = () => {
    setValue(!value);
    onChange && onChange(!value);
  };

  return (
    <input type="checkbox" className="cursor-pointer" checked={value} onChange={handleChange} />
  );
}
