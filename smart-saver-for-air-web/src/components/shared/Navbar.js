/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useHistory } from "react-router-dom";

function Navbar() {
  const history = useHistory();
  return (
    <div>
      {/* Main Sidebar Container */}
      <aside
        className="main-sidebar sidebar-dark-primary elevation-4"
        style={{ backgroundColor: "#2F9973" }}
      >
        {/* Brand Logo */}
        <div className="brand-link" onClick={()=>history.push('/')}>
          <img
            src="dist/img/logo.png"
            // src="dist/img/AdminLTELogo.png"
            alt="STTSLIFE"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">STTSLIFFE</span>
        </div>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          {/* <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="dist/img/user2-160x160.jpg"
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info">
              <a href="#" className="d-block" style={{ color: "white" }}>
                Alexander Pierce
              </a>
            </div>
          </div> */}
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* <li className="nav-item ">
                <a
                  onClick={() => {
                    history.push("/");
                  }}
                  className="nav-link "
                >
                  <i
                    className="nav-icon fas fa-tachometer-alt"
                    style={{ color: "white" }}
                  />
                  <p style={{ color: "white" }}>Dashboard</p>
                </a>
              </li> */}

              {/* <li className="nav-header ">ระบบจัดการสมาชิก</li> */}

              <li className="nav-header ">ระบบจัดการสมาชิก</li>
              {/* ระบบจัดการสมาชิก */}
              <li className="nav-item">
                <a
                  onClick={() => {
                    history.push("/");
                  }}
                  className="nav-link"
                >
                  <i
                    className="nav-icon fas fa-user"
                    style={{ color: "white" }}
                  />
                  <p style={{ color: "white" }}>ระบบจัดการสมาชิก</p>
                </a>
              </li>

              <li className="nav-header ">ระบบจัดการข้อมูลแอร์</li>
              {/* จัดการชนิดของแอร์ */}
              <li className="nav-item">
                <a
                  onClick={() => {
                    history.push("/airtype");
                  }}
                  className="nav-link"
                >
                  <i
                    className="nav-icon fas fa-screwdriver"
                    style={{ color: "white" }}
                  />
                  <p style={{ color: "white" }}>จัดการชนิดของแอร์</p>
                </a>
              </li>
              {/* จัดการประเภทของแอร์ */}
              <li className="nav-item">
                <a
                  onClick={() => {
                    history.push("/airspecies");
                  }}
                  className="nav-link"
                >
                  <i
                    className="nav-icon fas fa-screwdriver"
                    style={{ color: "white" }}
                  />
                  <p style={{ color: "white" }}>จัดการประเภทของแอร์</p>
                </a>
              </li>

              {/* จัดการยี่ห้อของแอร์ */}
              <li className="nav-item">
                <a
                  onClick={() => {
                    history.push("/airbrand");
                  }}
                  className="nav-link"
                >
                  <i
                    className="nav-icon fas fa-screwdriver"
                    style={{ color: "white" }}
                  />
                  <p style={{ color: "white" }}>จัดการยี่ห้อของแอร์</p>
                </a>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </div>
  );
}

export default Navbar;
