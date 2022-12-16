import React, { useEffect, useState } from "react";
import { Container, Row, Navbar, Nav, Form } from "react-bootstrap";
import { dummyData } from "../../utils/dummyData";
import Profile from "../../components/profile";
import { Link } from "react-router-dom";

const Data = dummyData;
const Home = () => {
  const [searchItem, setSearchItem] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const handleChange = (event) => {
    setSearchItem(event.target.value);
  };

  useEffect(() => {
    if (searchItem) {
      const results = Data.filter((item) =>
        item.title.toLowerCase().includes(searchItem.toLowerCase())  
      );
      setSearchResult(results);
    } else {
      setSearchResult([]);
    }
  }, [searchItem]);

  return (
    <>
      {" "}
      <Container fluid className="bg-img">
        <Row>
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
          <Container>
            <div className="bannerSection">
              <Form className=" m-auto">
                <Form.Control
                  placeholder="Search"
                  onChange={handleChange}
                  value={searchItem}
                />

                <div className="suggestions">
                  {searchResult.map((item, index) => (
                    <Profile
                      key={index}
                      profileImage={item.image}
                      name={item.title}
                      rating={item.rating}
                      address={item.address}
                      comment={item.comment}
                    />
                  ))}
                </div>
              </Form>
            </div>
          </Container>
        </Row>
      </Container>
    </>
  );
};

export default Home;
