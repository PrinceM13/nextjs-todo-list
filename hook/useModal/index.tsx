import { useState } from "react";
import ResponseModal from "./ResponseModal";

import type { IModal } from "@/interfaces/frontend";

const initialModalDetail: IModal.ModalDetailProps = {
  title: "Modal Title",
  message: "Modal Message",
  jsx: <p>Modal JSX</p>,
  type: "info"
};

export default function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDetail, setModalDetail] = useState<IModal.ModalDetailProps>(initialModalDetail);

  const openModal = ({ title, message, jsx, type }: IModal.ModalDetailProps) => {
    setIsModalOpen(true);
    setModalDetail({ title, message, jsx, type });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalDetail(initialModalDetail);
  };

  const CustomModal = (): JSX.Element => {
    return (
      <ResponseModal
        modalDetail={modalDetail}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    );
  };

  return {
    openModal,
    closeModal,
    CustomModal
  };
}
