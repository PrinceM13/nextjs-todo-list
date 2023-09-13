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
    <div className="flex justify-between items-center gap-4 text-xs md:text-sm lg:text-base">
      {label && (
        <label className="flex-shrink-0 w-16 lg:w-36" style={{ width: labelWidth }}>
          {label}
        </label>
      )}
      <div className="flex-grow">{children}</div>
    </div>
  );
}
