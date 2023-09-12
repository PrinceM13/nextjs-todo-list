interface ModalProps {
  children: React.ReactNode;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ children, title, isOpen, onClose }: ModalProps): JSX.Element {
  return (
    <>
      {isOpen ? (
        <>
          {/* background */}
          <div className="fixed inset-0 bg-black opacity-50"></div>

          {/* modal */}
          <div className="fixed inset-0 flex items-center justify-center" onMouseDown={onClose}>
            {/* modal content */}
            <div
              className="bg-white rounded-lg p-6 min-w-[300px] max-w-[60%]"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-semibold">{title}</h3>
                <button onClick={onClose} className="text-2xl">
                  &times;
                </button>
              </div>
              {children}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
