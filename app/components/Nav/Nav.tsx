export const Nav = () => (
  <nav className="navbar py-4">
    <div className="container is-fluid">
      <div className="navbar-brand">
        <a className="navbar-item" href="#">
          <img className="image" src="https://bulma.io/images/bulma-logo.png" alt="" width="96px" />
        </a>
        <a className="navbar-burger" role="button" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start"><a className="navbar-item" href="#">About</a><a className="navbar-item"
            href="#">Company</a><a className="navbar-item" href="#">Services</a><a className="navbar-item"
            href="#">Testimonials</a></div>
        <div className="navbar-item">
        </div>
      </div>
    </div>
  </nav>
);
