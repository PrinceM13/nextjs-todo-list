export default function Check({ size }: { size?: string }): JSX.Element {
  return (
    <svg
      width={`${size ?? 100}px`}
      height={`${size ?? 100}px`}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      className="iconify iconify--emojione shadow-xl rounded-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <circle cx="32" cy="32" r="30" fill="#4bd37b"></circle>
      <path fill="#ffffff" d="M46 14L25 35.6l-7-7.2l-7 7.2L25 50l28-28.8z"></path>
    </svg>
  );
}
