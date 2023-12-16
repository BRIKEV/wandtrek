import { Link } from "@remix-run/react";

export const Nav = () => (
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
          <Link className="button is-primary" to="/auth">Login</Link>
        </div>
      </div>
    </div>
  </nav>
);
