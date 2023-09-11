import { Modal } from "@/components";
import { useState } from "react";

interface ModalDetailProps {
  title?: string;
  message?: string;
  jsx?: JSX.Element;
  type?: "info" | "danger" | "success";
}

const initialModalDetail: ModalDetailProps = {
  title: "Modal Title",
  message: "Modal Message",
  jsx: <p>Modal JSX</p>,
  type: "info"
};

export default function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDetail, setModalDetail] = useState<ModalDetailProps>(initialModalDetail);

  const openModal = ({ title, message, jsx, type }: ModalDetailProps) => {
    setIsModalOpen(true);
    setModalDetail({ title, message, jsx, type });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalDetail(initialModalDetail);
  };

  const CustomModal = (): JSX.Element => {
    return (
      <Modal
        title={modalDetail.title ?? ""}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="flex flex-col gap-8">
          {/* plain text content */}
          {modalDetail.message && (
            <p
              className={`${
                modalDetail.type === "success"
                  ? "text-green-600"
                  : modalDetail.type === "danger"
                  ? "text-red-600"
                  : ""
              }`}
            >
              {modalDetail.message}
            </p>
          )}

          {/* jsx content */}
          {modalDetail.jsx}
        </div>
      </Modal>
    );
  };

  return {
    openModal,
    closeModal,
    CustomModal
  };
}
