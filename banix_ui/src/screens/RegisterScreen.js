import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/misc/FormContainer";
import { toast, ToastContainer } from "react-toastify";
import Message from "../components/misc/Message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { auth, googleAuthProvider } from "../firebase";

const RegisterScreen = ({ location }) => {
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
      <div className="m-3">
        <Button shape="round" block variant="outline-danger">
          <FontAwesomeIcon
            icon={["fab", "google"]}
            className="mr-2"
            onClick={googleLogin}
          />
          {" Sign Up with Google"}
        </Button>
        <Button block variant="outline-info" onClick={selectMailOptionHandler}>
          <FontAwesomeIcon icon="envelope" className="mr-2" />
          Sign Up with Email
        </Button>
        <Row className="mt-3">
          <Col>
            {"Existing Customer ? "}
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              {" Login "}
            </Link>
          </Col>
        </Row>
      </div>
    );
  };
  const googleLogin = async (e) => {
    e.preventDefault();
    auth.signInWithPopup(googleAuthProvider).then(async (result) => {
      console.log("googleLogin :::: ", result);
      // const { user } = result;
      // dispatch(login(user.email, user.email));
    });
  };

  return (
    <div>
      <ToastContainer />
      <FormContainer>
        {message && <Message variant="info">{message}</Message>}
        <h1>Sign Up </h1>
        {!signupUsingEmail ? (
          signUpOptions()
        ) : (
          <div className="m-3 justify-content-md-center">
            <h3>Sign up with email</h3>
            <p>Enter your email address to create an account.</p>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" block variant="primary">
                Click to Register
              </Button>
            </Form>
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
      </FormContainer>
    </div>
  );
};

export default RegisterScreen;
