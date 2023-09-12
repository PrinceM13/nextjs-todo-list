interface LabelFrameProps {
  label: string;
  children: React.ReactNode;
  labelWidth?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function LabelFrame({
  children,
  label,
  labelWidth = ""
}: LabelFrameProps): JSX.Element {
  return (
    <div className="flex justify-between gap-4">
      {label && (
        <label className="flex-shrink-0 w-24" style={{ width: labelWidth }}>
          {label}
        </label>
      )}
      <div className="flex-grow">{children}</div>
    </div>
  );
}
