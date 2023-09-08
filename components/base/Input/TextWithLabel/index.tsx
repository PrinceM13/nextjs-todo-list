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
  onChange?: (value: string) => void;
}

export default function TextWithLabel({ label, labelWidth }: TextWithLabelProps): JSX.Element {
  return (
    <LabelFrame label={label ?? ""} labelWidth={labelWidth}>
      <input className="w-[100%] px-2 rounded-lg outline outline-2 outline-blue-300" />
    </LabelFrame>
  );
}
