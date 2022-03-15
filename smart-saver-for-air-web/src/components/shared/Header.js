import React from "react";

function Header() {
  return (
    <div>
      {/* <nav
        className="main-header navbar navbar-expand navbar-white navbar-light"
        style={{ backgroundColor: "#598baf" }}
      > */}
      <nav
        className="main-header navbar navbar-expand navbar-white navbar-light"
        style={{ backgroundColor: "#2F9973" }}
      >
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button"
              style={{ color: "white" }}
            >
              <i className="fas fa-bars" />
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a className="nav-link" style={{ color: "white" }}>
            Smart Saver For Air Conditioners
            </a>
          </li>
        </ul>
        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          {/* Navbar Search */}

          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="fullscreen"
              href="#"
              role="button"
            >
              <i
                className="fas fa-expand-arrows-alt"
                style={{ color: "white" }}
              />
            </a>
          </li>
        </ul>
      </nav>

      {/* <div className="preloader flex-column justify-content-center align-items-center">
        <img
          className="animation__shake"
          src="dist/img/AdminLTELogo.png"
          alt="AdminLTELogo"
          height={60}
          width={60}
        />
      </div> */}
    </div>
  );
}

export default Header;
