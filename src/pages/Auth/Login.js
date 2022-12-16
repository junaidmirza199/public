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
import { AiFillMail, AiFillLock } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import { makeRequest } from "axios";
import { useUserActionsContext } from "../../providers/UserProvider";

const Login = () => {
  const setUserObj = useUserActionsContext();
  const history = useHistory();

  const [email, setEmail] = useState({ isInvalid: false, value: "", err: "" });
  const [password, setPassword] = useState({
    isInvalid: false,
    value: "",
    err: "",
  });
  const [toast, setShowToast] = useState({ show: false, heading: "", msg: "" });

  const handleEmail = (e) => {
    setEmail({ isInvalid: false, value: e.target.value, err: "" });
  };

  const handlePassword = (e) => {
    setPassword({ isInvalid: false, value: e.target.value, err: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!email.value)
      setEmail({ ...email, isInvalid: true, err: "Invalid Email!" });
    if (!password.value)
      setPassword({ ...password, isInvalid: true, err: "Invalid Password!" });
    if (email.value && password.value) {
      const data = {
        email: email.value,
        password: password.value,
      };

      makeRequest("/login/", "POST", {}, data)
        .then((resp) => {
          setUserObj(resp?.data);
          history.push("/");
        })
        .catch((err) => {
          setShowToast({
            show: true,
            heading: "Invalid Credentials",
            msg: err.response?.data?.error,
          });
        });
    }
  };

  return (
    <div className="mainLogin signup">
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
                {/* <Navbar.Brand href="#home">neuron bazaar</Navbar.Brand> */}
              </Link>
              <h3 className="text-primary text-center">Sign In</h3>
              <br />
            </div>
            <Form onSubmit={handleSubmit}>
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

              <p className="text-primary text-right">
                <a href="#">Forgot Password?</a>
              </p>

              <Button type="submit" block>
                Login
              </Button>
              <br />
              <p className="text-center">
                New to NeuronBazar? <Link to="register">Create Account</Link>
              </p>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
