import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,Row,Col,Card,Button,Modal,Form,Table} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Dash({ setIsLoggedIn }) {

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const [nm, setNm] = useState("");
  const [ct, setCt] = useState("");
  const [mo, setMo] = useState("");

  const [show, setShow] = useState(false);
  const [ushow, setUshow] = useState(false);

  const [id, setUId] = useState("");
  const [unm, setUNm] = useState("");
  const [uct, setUCt] = useState("");
  const [umo, setUMo] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const uhandleClose = () => setUshow(false);
  const uhandleShow = () => setUshow(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  const api = () => {
    axios.get("http://localhost:8080/cstud")
      .then(res => {
        setData(res.data.Student);
      });
  };

  useEffect(() => {
    api();
  }, []);

  const getdata = (id, name, city, mob) => {
    setUId(id);
    setUNm(name);
    setUCt(city);
    setUMo(mob);
    uhandleShow();
  };

  const addStud = () => {
    const dt = { name: nm, city: ct, mob: mo };

    axios.post("http://localhost:8080/save", dt)
      .then(() => {
        alert("Student Added Successfully");
        api();
        setShow(false);
      });
  };

  const uptStud = () => {
    const dt = { name: unm, city: uct, mob: umo, id: id };

    axios.put("http://localhost:8080/update", dt)
      .then(() => {
        alert("Student Updated Successfully");
        api();
        setUshow(false);
      });
  };

  const del = (id) => {
    axios.delete("http://localhost:8080/del/" + id)
      .then(() => {
        alert("Student Deleted");
        api();
      });
  };

  // Search Filter
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <Container className="mt-5">

      <Card className="shadow-lg border-0 rounded-4">

        <Card.Body>

          {/* HEADER */}

          <Row className="align-items-center mb-4">

            <Col md={4}>
              <h3 className="fw-bold mb-0">
                🎓 Student Dashboard
              </h3>
              <small className="text-muted">
                Manage student records
              </small>
            </Col>

            <Col md={4}>

              <Form.Control
                type="text"
                placeholder="🔍 Search student..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </Col>

            <Col md={4} className="text-end">

              <Button
                variant="primary"
                className="me-2"
                onClick={handleShow}
              >
                + Add Student
              </Button>

              <Button
                variant="outline-danger"
                onClick={handleLogout}
              >
                Logout
              </Button>

            </Col>

          </Row>

          {/* TABLE */}

          <Table striped hover bordered responsive className="text-center">

            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>City</th>
                <th>Mobile</th>
                <th width="200">Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredData.map((value) => (

                <tr key={value.id}>

                  <td>{value.id}</td>
                  <td>{value.name}</td>
                  <td>{value.city}</td>
                  <td>{value.mob}</td>

                  <td>

                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() =>
                        getdata(
                          value.id,
                          value.name,
                          value.city,
                          value.mob
                        )
                      }
                    >
                      ✏ Edit
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => del(value.id)}
                    >
                      🗑 Delete
                    </Button>

                  </td>

                </tr>

              ))}

            </tbody>

          </Table>

        </Card.Body>

      </Card>


      {/* ADD STUDENT MODAL */}

      <Modal show={show} onHide={handleClose} centered>

        <Modal.Header closeButton>
          <Modal.Title>Add New Student</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <Form.Control
            className="mb-3"
            type="text"
            placeholder="Student Name"
            onChange={(e) => setNm(e.target.value)}
          />

          <Form.Control
            className="mb-3"
            type="text"
            placeholder="City"
            onChange={(e) => setCt(e.target.value)}
          />

          <Form.Control
            type="number"
            placeholder="Mobile Number"
            onChange={(e) => setMo(e.target.value)}
          />

        </Modal.Body>

        <Modal.Footer>

          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>

          <Button variant="success" onClick={addStud}>
            Save Student
          </Button>

        </Modal.Footer>

      </Modal>


      {/* UPDATE STUDENT MODAL */}

      <Modal show={ushow} onHide={uhandleClose} centered>

        <Modal.Header closeButton>
          <Modal.Title>Update Student</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <Form.Control
            className="mb-3"
            type="text"
            value={unm}
            onChange={(e) => setUNm(e.target.value)}
          />

          <Form.Control
            className="mb-3"
            type="text"
            value={uct}
            onChange={(e) => setUCt(e.target.value)}
          />

          <Form.Control
            type="number"
            value={umo}
            onChange={(e) => setUMo(e.target.value)}
          />

        </Modal.Body>

        <Modal.Footer>

          <Button variant="secondary" onClick={uhandleClose}>
            Cancel
          </Button>

          <Button variant="warning" onClick={uptStud}>
            Update Student
          </Button>

        </Modal.Footer>

      </Modal>

    </Container>
  );
}