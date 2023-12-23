import { Link } from "@remix-run/react";
import { Button } from "~/@ui/components/ui/button";

interface Props {
  hasSession: boolean;
  handleLogout: () => void;
}

export const Nav = ({ hasSession, handleLogout }: Props) => {
  return (
    <div className="fixed p-[1em] top-0 inset-x-0 bg-white border-b-slate-300 border-b border-solid">
      <div className="flex justify-between items-center">
        <div>
          <Link to="/">
            <img src="https://bulma.io/images/bulma-logo.png" alt="" width="96px" />
          </Link>
        </div>
        <nav>
          <Button className="mr-2" asChild variant="ghost">
            <Link to="/tours">Tours</Link>
          </Button>
          {!hasSession ? (
            <Button asChild>
              <Link to="/login">
                Login
              </Link>
            </Button>
          ) : (
            <Button variant="secondary" onClick={handleLogout}>Logout</Button>
          )}
        </nav>
      </div>
    </div>
  );
};
