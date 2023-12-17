import { Link } from "@remix-run/react";

interface Props {
  hasSession: boolean;
  handleLogout: () => void;
}

export const Nav = ({ hasSession, handleLogout }: Props) => {
  return (
    <nav className="navbar py-4">
      <div className="container is-fluid">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img className="image" src="https://bulma.io/images/bulma-logo.png" alt="" width="96px" />
          </Link>
        </div>
        <div className="navbar-menu">
          <div className="navbar-end flex is-align-items-center">
            <Link className="navbar-item mr-2" to="/tours">Tours</Link>
            {!hasSession ? (
              <Link className="button is-primary" to="/login">Login</Link>
            ) : (
              <button className="button is-primary" onClick={handleLogout}>Logout</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
