import { ReactNode } from "react";

interface Props {
  children: ReactNode[] | ReactNode;
}

const Modal = ({ children }: Props) => (
  <div className="fixed z-[1000] inset-0 flex items-center justify-center">
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
    <div className="z-[1] w-screen max-w-4xl">
      {children}
    </div>
  </div>
);

export default Modal;
