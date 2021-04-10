// react
import React, { useState, useEffect } from "react";
// third-party
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { auth, googleAuthProvider } from "../../firebase";
// application
import PageHeader from "../shared/PageHeader";
import { Check9x7Svg } from "../../svg";
// data stubs
import theme from "../../data/theme";

const AuthPageLogin = () => {
  const breadcrumb = [];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(
      "[login] Log-in in the user with the username and the password"
    );
    // dispatch(login(email, password));
  };

  const googleLogin = async (e) => {
    e.preventDefault();
    console.log("[login] Log-in in the user with gmail");
    auth.signInWithPopup(googleAuthProvider).then(async (result) => {
      console.log("googleLogin :::: ", result);
      // const { user } = result;
      // dispatch(login(user.email, user.email));
    });
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>{`Login — ${theme.name}`}</title>
      </Helmet>
      <PageHeader header="Login" breadcrumb={breadcrumb} />
      <div className="block">
        <div className="container">
          <div className="row  justify-content-center align-items-center">
            <div className="col-md-6 d-flex">
              <div className="card flex-grow-1 mb-md-0">
                <div className="card-body">
                  <h3 className="card-title">Login</h3>
                  <form onSubmit={submitHandler}>
                    <div className="form-group">
                      <label htmlFor="login-email">Email Address</label>
                      <input
                        id="login-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        placeholder="Enter email"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="login-password">Password</label>
                      <input
                        id="login-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        placeholder="Password"
                      />
                      <small className="form-text text-muted">
                        <Link to="/">Forgot Password</Link>
                      </small>
                    </div>
                    <div className="form-group">
                      <div className="form-check">
                        <span className="form-check-input input-check">
                          <span className="input-check__body">
                            <input
                              id="login-remember"
                              type="checkbox"
                              className="input-check__input"
                            />
                            <span className="input-check__box" />
                            <Check9x7Svg className="input-check__icon" />
                          </span>
                        </span>
                        <label
                          className="form-check-label"
                          htmlFor="login-remember"
                        >
                          Remember Me
                        </label>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary mt-2 mt-md-3 mt-lg-4"
                    >
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AuthPageLogin;
