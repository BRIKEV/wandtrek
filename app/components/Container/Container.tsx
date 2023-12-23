import { ReactNode } from "react";

interface Props {
  children: ReactNode[] | ReactNode;
}

const Container = ({ children }: Props) => (
  <main className="mt-[6em] container mx-auto">
    {children}
  </main>
);

export default Container;
