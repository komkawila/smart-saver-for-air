import React from "react";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();
  return (
    <div
      className="hold-transition login-page"
      style={{ backgroundColor: "#598baf" }}
    >
      <div className="login-box">
        <div className="card card-outline ">
          <div className="card-header text-center">
            <a href="#" className="h1">
              {/* <b>Admin</b>LTE */}
              Welcome
            </a>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            <form
              onSubmit={() => {
                history.push("/");
              }}
            >
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-3"></div>

                <div className="col-6">
                  <button
                    type="submit"
                    className="btn btn-block"
                    style={{ backgroundColor: "#598baf", color: "white" }}
                  >
                    Login
                  </button>
                </div>
                <div className="col-3"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
