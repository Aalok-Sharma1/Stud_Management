import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsLoggedIn }) {

  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {

    if (mobile === "9545337977") {
      alert("Login Successfully");
      setIsLoggedIn(true);
      navigate("/home");
    } else {
      alert("Invalid Mobile Number");
    }

  };

  return (

    <div
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1580582932707-520aed937b7b')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >

      {/* Dark Overlay */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.6)"
        }}
      ></div>

      <Container style={{ position: "relative", zIndex: 2 }}>

        <Row className="justify-content-center">

          <Col md={5}>

            <Card
              className="p-5 shadow-lg border-0"
              style={{
                borderRadius: "15px",
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(255,255,255,0.9)"
              }}
            >

              <h2 className="text-center fw-bold mb-2">
                🎓 Admin Portal
              </h2>

              <p className="text-center text-muted mb-4">
                IMR Institute Jalgaon
              </p>

              <Form>

                <Form.Group className="mb-4">

                  <Form.Label>Mobile Number</Form.Label>

                  <Form.Control
                    type="tel"
                    placeholder="Enter mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    size="lg"
                  />

                </Form.Group>

                <div className="d-grid">

                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleLogin}
                  >
                    Login
                  </Button>

                </div>

              </Form>

            </Card>

          </Col>

        </Row>

      </Container>

    </div>
  );
}