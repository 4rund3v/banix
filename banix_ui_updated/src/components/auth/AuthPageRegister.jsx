// react
import React, { useState } from "react";

// third-party
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { auth, googleAuthProvider } from "../../firebase";
import Message from "../shared/Message";
import { toast, ToastContainer } from "react-toastify";

// application
import PageHeader from "../shared/PageHeader";
import { Check9x7Svg } from "../../svg";

// data stubs
import theme from "../../data/theme";

const AuthPageRegister = ({ location }) => {
  const breadcrumb = [
    { title: "Home", url: "" },
    { title: "Register", url: "" },
  ];

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [signupUsingEmail, setSignupUsingEmail] = useState(false);
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const submitHandler = async (e) => {
    e.preventDefault();

    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is sent to ${email}. Click the link to complete registration`
    );
    setMessage(
      `Email sent to ${email}. Click the link to complete registration.`
    );
    localStorage.setItem(
      "registerInfo",
      JSON.stringify({ registrationEmailId: email })
    );
  };
  const selectMailOptionHandler = () => {
    setSignupUsingEmail(true);
    console.log(" User Selected signup with mail option !");
  };

  const signUpOptions = () => {
    return (
      <div>
        <div className="row justify-content-center align-items-center justify-content-md-center">
          <Button shape="round" variant="outline-danger">
            <FontAwesomeIcon
              icon={["fab", "google"]}
              className="mr-2"
              onClick={() => {
                console.log("Google Login started");
              }}
            />
            {"Sign Up with Google"}
          </Button>
        </div>
        <div className="row justify-content-center align-items-center justify-content-md-center mt-2">
          <Button variant="outline-info" onClick={selectMailOptionHandler}>
            <FontAwesomeIcon icon="envelope" className="mr-3" />
            {"    Sign Up with Email "}
          </Button>
        </div>
        <div className="row justify-content-center align-items-center justify-content-md-center mt-2">
          {"Existing Customer ? "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            {" Login "}
          </Link>
        </div>
      </div>
    );
  };
  const googleLogin = (e) => {
    console.log("[googleLogin] The login with google component.");
    e.preventDefault();
    auth.signInWithPopup(googleAuthProvider).then(async (result) => {
      console.log("googleLogin :::: ", result);
      // const { user } = result;
      // dispatch(login(user.email, user.email));
    });
  };
  return (
    <React.Fragment>
      <Helmet>
        <title>{`Register — ${theme.name}`}</title>
      </Helmet>

      <PageHeader header="Register" breadcrumb={breadcrumb} />
      <div className="block">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            {message && <Message variant="info">{message}</Message>}
            {!signupUsingEmail ? (
              signUpOptions()
            ) : (
              <div>
                <h3>Sign up with email</h3>
                <p>Enter your email address to create an account.</p>
                <form onSubmit={submitHandler}>
                  <div className="form-group">
                    <label htmlFor="register-email">Email Address</label>
                    <input
                      id="register-email"
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                    />
                    <button
                      type="submit"
                      className="btn btn-primary mt-2 mt-md-3 mt-lg-4"
                    >
                      Register
                    </button>
                  </div>
                </form>
                <p className="mt-3">
                  <Link
                    variant="outline-secondary"
                    onClick={() => {
                      setSignupUsingEmail(false);
                    }}
                  >
                    {" < All Sign in Options"}
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <div className="block">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-6 d-flex mt-4 mt-md-0"></div>
            <Button shape="round" variant="outline-danger">
              <FontAwesomeIcon
                icon={["fab", "google"]}
                className="mr-2"
                onClick={"googleLogin"}
              />
              {" Sign Up with Google"}
            </Button>
            <Button variant="outline-info" onClick={"selectMailOptionHandler"}>
              <FontAwesomeIcon icon="envelope" className="mr-2" />
              Sign Up with Email
            </Button>
            <Row className="mt-3">
              <Col>
                {"Existing Customer ? "}
                <Link
                  to={
                    redirect
                      ? `/auth/login?redirect=${redirect}`
                      : "/auth/login"
                  }
                >
                  {" Login "}
                </Link>
              </Col>
            </Row>
          </div>
        </div>
      </div> */}

      {/* <div className="block">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-6 d-flex mt-4 mt-md-0">
              <div className="card flex-grow-1 mb-0">
                <div className="card-body">
                  <h3 className="card-title">Sign Up With Email Address</h3>
                  <form>
                    <div className="form-group">
                      <label htmlFor="register-email">Email Address</label>
                      <input
                        id="register-email"
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary mt-2 mt-md-3 mt-lg-4"
                    >
                      Register
                    </button>
                  </form>
                </div>
              </div>
              <div className="col-md-6 d-flex mt-4 mt-md-0">
                <div className="card flex-grow-1 mb-0">
                  <div className="card-body">
                    <h3 className="card-title">Sign Up with Google</h3>

                    <button
                      type="submit"
                      className="btn btn-danger mt-2 mt-md-3 mt-lg-4"
                    >
                      Google
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </React.Fragment>
  );
};
export default AuthPageRegister;
