import React, { useState } from "react";
import {
  Container,
  Card,
  Form,
  InputGroup,
  Button,
  Navbar,
  Nav,
  Toast,
} from "react-bootstrap";
import { AiFillMail, AiFillLock, AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { makeRequest } from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { useUserActionsContext } from "../../providers/UserProvider";

const Register = () => {
  const setUserObj = useUserActionsContext();

  const [fName, setFName] = useState({ isInvalid: false, value: "", err: "" });
  const [lName, setLName] = useState({ isInvalid: false, value: "", err: "" });
  const [email, setEmail] = useState({ isInvalid: false, value: "", err: "" });
  const [password, setPassword] = useState({
    isInvalid: false,
    value: "",
    err: "",
  });
  const [toast, setShowToast] = useState({ show: false, heading: "", msg: "" });

  const onChange = (value) => {
    console.log("Captcha value:", value);
  };

  const handleFName = (e) => {
    setFName({ isInvalid: false, value: e.target.value, err: "" });
  };

  const handleLName = (e) => {
    setLName({ isInvalid: false, value: e.target.value, err: "" });
  };

  const handleEmail = (e) => {
    setEmail({ isInvalid: false, value: e.target.value, err: "" });
  };

  const handlePassword = (e) => {
    setPassword({ isInvalid: false, value: e.target.value, err: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!fName.value)
      setFName({ ...fName, isInvalid: true, err: "Invalid First Name!" });
    if (!lName.value)
      setLName({ ...lName, isInvalid: true, err: "Invalid Last Name!" });
    if (!email.value)
      setEmail({ ...email, isInvalid: true, err: "Invalid Email!" });
    if (!password.value)
      setPassword({ ...password, isInvalid: true, err: "Invalid Password!" });

    if (fName.value && lName.value && email.value && password.value) {
      const data = {
        first_name: fName.value,
        last_name: lName.value,
        email: email.value,
        password: password.value,
      };

      makeRequest("/sign_up/", "POST", {}, data)
        .then((resp) => {
          setUserObj(resp?.data);
          setShowToast({
            show: true,
            heading: "Successfully Registered",
            msg:
              "Successfully created account. Please, check your email to verify your account.",
          });
        })
        .catch((err) => {
          setShowToast({
            show: true,
            heading: "Unable to register",
            msg: err.response?.data?.error,
          });
        });
    }
  };

  return (
    <div className="mainLogin ">
      <Navbar
        collapseOnSelect
        expand="none"
        variant="dark"
        className="w-100 bg-color"
      >
        <Navbar.Brand href="/">neuron bazaar</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/register" className="nav-link">
              Register
            </Link>
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container className="auth-page d-flex">
        <Toast
          show={toast.show}
          delay={5000}
          autohide
          onClose={() => setShowToast({ show: false, heading: "", msg: "" })}
        >
          <Toast.Header>
            <strong className="mr-auto">{toast.heading}</strong>
          </Toast.Header>
          <Toast.Body>{toast.msg}</Toast.Body>
        </Toast>
        <Card>
          <Card.Body>
            <div className="card-head">
              <Link to="/" className="nav-link">
                {" "}
                {/* <Navbar.Brand href="#home">neuron bazaar</Navbar.Brand> */}
              </Link>
              <h3 className="text-primary text-center">Sign Up</h3>
              <br />
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>First Name:</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text
                      className={fName.isInvalid ? "border-danger" : ""}
                    >
                      <AiOutlineUser size={20} color="#007bff" />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    value={fName.value}
                    onChange={handleFName}
                    type="text"
                    placeholder="Enter first name"
                    isInvalid={fName.isInvalid}
                  />
                  <Form.Control.Feedback type="invalid">
                    {fName.err}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group>
                <Form.Label>Last Name:</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text
                      className={lName.isInvalid ? "border-danger" : ""}
                    >
                      <AiOutlineUser size={20} color="#007bff" />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    value={lName.value}
                    onChange={handleLName}
                    type="text"
                    placeholder="Enter last name"
                    isInvalid={lName.isInvalid}
                  />
                  <Form.Control.Feedback type="invalid">
                    {lName.err}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group>
                <Form.Label>Email:</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text
                      className={email.isInvalid ? "border-danger" : ""}
                    >
                      <AiFillMail size={20} color="#007bff" />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    value={email.value}
                    onChange={handleEmail}
                    type="email"
                    placeholder="Enter email"
                    isInvalid={email.isInvalid}
                  />
                  <Form.Control.Feedback type="invalid">
                    {email.err}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group>
                <Form.Label>Password:</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text
                      className={password.isInvalid ? "border-danger" : ""}
                    >
                      <AiFillLock size={20} color="#007bff" />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    value={password.value}
                    onChange={handlePassword}
                    type="password"
                    placeholder="Enter password"
                    isInvalid={password.isInvalid}
                  />
                  <Form.Control.Feedback type="invalid">
                    {password.err}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <br />
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={onChange}
              />
              <br />
              <Button type="submit" block>
                Register
              </Button>
              <br />
              <p className="text-center">
                Already have and account? <Link to="login">Login</Link>
              </p>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Register;
