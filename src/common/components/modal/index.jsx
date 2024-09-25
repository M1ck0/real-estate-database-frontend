import { useEffect, useState } from "react";

import { XMarkIcon } from "@heroicons/react/16/solid";
import { DialogBackdrop, Dialog, DialogTitle, DialogPanel } from "@headlessui/react";

const Modal = ({ active, title, children, onClose = () => {} }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(active);
  }, [active]);

  return (
    <Dialog
      open={isOpen}
      onClose={() => {}}
      transition
      className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-[90vw] rounded-lg bg-white p-4">
          <DialogTitle className="mb-3 flex items-center justify-between border-b pb-3 text-xl font-semibold">
            {title}
            <XMarkIcon className="size-6 cursor-pointer" onClick={onClose} />
          </DialogTitle>
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default Modal;
