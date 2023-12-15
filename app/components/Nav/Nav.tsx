export const Nav = () => (
  <nav className="navbar py-4">
    <div className="container is-fluid">
      <div className="navbar-brand">
        <a className="navbar-item" href="#">
          <img className="image" src="https://bulma.io/images/bulma-logo.png" alt="" width="96px" />
        </a>
      </div>
      <div className="navbar-menu">
        <div className="navbar-end flex is-align-items-center">
          <a className="navbar-item mr-2" href="#">Tours</a>
          <a className="button is-primary" href="#">Login</a>
        </div>
      </div>
    </div>
  </nav>
);
