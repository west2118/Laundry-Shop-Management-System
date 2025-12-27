import { X } from "lucide-react";
import { useEffect } from "react";
import ReactDOM from "react-dom";

const Modal = ({
  isModalOpen,
  isCloseModal,
  title,
  children,
  width = "max-w-md",
}: {
  isModalOpen: boolean;
  isCloseModal: () => void;
  title?: string;
  children: React.ReactNode;
  width?: string;
}) => {
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isModalOpen]);

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      onClick={isCloseModal}
      className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50">
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow-lg w-full ${width} max-h-[90vh] overflow-y-auto hide-scrollbar`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

            <button
              onClick={isCloseModal}
              className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {children}
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
