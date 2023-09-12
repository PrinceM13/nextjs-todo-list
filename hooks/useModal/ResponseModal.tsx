import { Modal } from "@/components";

import type { IModal } from "@/interfaces/frontend";

export default function ResponseModal({
  modalDetail: { title, message, type, jsx },
  isModalOpen,
  setIsModalOpen
}: {
  modalDetail: IModal.ModalDetailProps;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}): JSX.Element {
  return (
    <Modal title={title ?? ""} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className="flex flex-col gap-8">
        {/* plain text content */}
        {message && (
          <p
            style={{
              color: type === "success" ? "green" : type === "danger" ? "red" : ""
            }}
          >
            {message}
          </p>
        )}

        {/* jsx content */}
        {jsx}
      </div>
    </Modal>
  );
}
