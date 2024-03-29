import React, { Component, useState } from "react";
import {
  Container,
  Card,
  CardBody,
  Row,
  Col,
  Table,
  UncontrolledTooltip,
  Alert,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
} from "reactstrap";
import { Link } from "react-router-dom";

import { AvForm, AvField } from "availity-reactstrap-validation";
const CustomersPage = () => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [modalStatic, setModalStatic] = useState(false);
  const data = [
    {
      customer: "Carolyn Harvey",
      email: "CarolynHarvey@rhyta.com",
      phone: "580-464-4694",
      balance: "Rs. 3245",
      date: "06 Apr, 2020",
    },
    {
      customer: "Angelyn Hardin",
      email: "AngelynHardin@dayrep.com",
      phone: "913-248-2690",
      balance: "Rs. 2435",
      date: "05 Apr, 2020",
    },
    {
      customer: "Carrie Thompson	",
      email: "CarrieThompson@rhyta.com",
      phone: "734-819-9286",
      balance: "Rs. 2653",
      date: "04 Apr, 2020",
    },
    {
      customer: "Kathleen Haller",
      email: "KathleenHaller@dayrep.com",
      phone: "313-742-3333",
      balance: "Rs. 2135",
      date: "03 Apr, 2020",
    },
    {
      customer: "Martha Beasley",
      email: "MarthaBeasley@teleworm.us",
      phone: "301-330-5745",
      balance: "Rs. 2698",
      date: "02 Apr, 2020",
    },
    {
      customer: "Kathryn Hudson",
      email: "KathrynHudson@armyspy.com",
      phone: "414-453-5725",
      balance: "Rs. 2758",
      date: "02 Apr, 2020",
    },
    {
      customer: "Robert Bott",
      email: "RobertBott@armyspy.com",
      phone: "712-237-9899",
      balance: "Rs. 2836",
      date: "01 Apr, 2020",
    },
    {
      customer: "Mary McDonald",
      email: "MaryMcDonald@armyspy.com",
      phone: "317-510-25554",
      balance: "Rs. 3245",
      date: "31 Mar, 2020",
    },
    {
      customer: "Keith Rainey",
      email: "KeithRainey@jourrapide.com	",
      phone: "214-712-1810",
      balance: "Rs. 3125",
      date: "30 Mar, 2020",
    },
    {
      customer: "Anthony Russo",
      email: "AnthonyRusso@jourrapide.com",
      phone: "412-371-8864",
      balance: "Rs. 2456",
      date: "30 Mar, 2020",
    },
    {
      customer: "Donna Betz",
      email: "DonnaBetz@jourrapide.com",
      phone: "+91 9620707328",
      balance: "Rs. 3423",
      date: "29 Mar, 2020",
    },
    {
      customer: "Angie Andres",
      email: "AngieAndres@armyspy.com",
      phone: "213-494-4527",
      balance: "Rs. 3245",
      date: "28 Apr, 2020",
    },
  ];
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div>
                    <Link
                      to="#"
                      onClick={() =>
                        this.setState({
                          modal_static: true,
                          isAlertOpen: false,
                        })
                      }
                      className="btn btn-success mb-2"
                    >
                      <i className="mdi mdi-plus mr-2"></i> Add Customer
                    </Link>
                  </div>
                  <div className="table-responsive mt-3">
                    <Table
                      className="table-centered datatable dt-responsive nowrap "
                      style={{
                        borderCollapse: "collapse",
                        borderSpacing: 0,
                        width: "100%",
                      }}
                    >
                      <thead className="thead-light">
                        <tr>
                          <th style={{ width: "20px" }}>
                            <div className="custom-control custom-checkbox">
                              <Input
                                type="checkbox"
                                className="custom-control-input"
                                id="customercheck"
                              />
                              <Label
                                className="custom-control-label"
                                htmlFor="customercheck"
                              >
                                &nbsp;
                              </Label>
                            </div>
                          </th>
                          <th>Customer</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Purchased Amount</th>
                          <th>Joining Date</th>
                          <th style={{ width: "120px" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((customerData, key) => (
                          <tr key={key}>
                            <td>
                              <div className="custom-control custom-checkbox">
                                <Input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id={"customercheck" + key}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor={"customercheck" + key}
                                >
                                  &nbsp;
                                </Label>
                              </div>
                            </td>

                            <td>{customerData.customer}</td>
                            <td>{customerData.email}</td>
                            <td>{customerData.phone}</td>

                            <td>{customerData.balance}</td>
                            <td>{customerData.date}</td>
                            <td>
                              <Link
                                to="#"
                                className="mr-3 text-primary"
                                id={"edit" + key}
                              >
                                <i className="mdi mdi-pencil font-size-18"></i>
                              </Link>
                              <UncontrolledTooltip
                                target={"edit" + key}
                                placement="top"
                              >
                                Edit
                              </UncontrolledTooltip>
                              <Link
                                to="#"
                                className="text-danger"
                                id={"delete" + key}
                              >
                                <i className="mdi mdi-trash-can font-size-18"></i>
                              </Link>
                              <UncontrolledTooltip
                                target={"delete" + key}
                                placement="top"
                              >
                                Delete
                              </UncontrolledTooltip>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Modal
            isOpen={modalStatic}
            toggle={() => setModalStatic(!modalStatic)}
            backdrop="static"
            centered
            size="lg"
          >
            <ModalHeader toggle={() => setModalStatic(!modalStatic)}>
              Add Customer Details
            </ModalHeader>
            <ModalBody>
              <AvForm onValidSubmit={() => {}}>
                <Row>
                  <Col lg={12}>
                    <Alert
                      color="success"
                      isOpen={alertOpen}
                      toggle={() => setAlertOpen(!alertOpen)}
                    >
                      Data Added Successfully...!
                    </Alert>
                    <FormGroup>
                      <Label htmlFor="name">Customer Name</Label>
                      <AvField
                        name="custname"
                        type="text"
                        className="form-control"
                        id="custname"
                        placeholder="Enter Customer Name"
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col lg={4}>
                    <FormGroup>
                      <Label htmlFor="email">Email</Label>
                      <AvField
                        name="custemail"
                        type="email"
                        className="form-control"
                        id="custemail"
                        placeholder="Enter Email"
                        required
                      />
                    </FormGroup>
                  </Col>

                  <Col lg={4}>
                    <FormGroup>
                      <Label htmlFor="email">Phone Number</Label>
                      <AvField
                        name="phonenumber"
                        type="number"
                        className="form-control"
                        id="phonenumber"
                        placeholder="Enter Phone Number"
                        required
                      />
                    </FormGroup>
                  </Col>

                  <Col lg={4}>
                    <FormGroup>
                      <Label htmlFor="email">Purchased Amount</Label>
                      <AvField
                        name="wBalance"
                        type="number"
                        className="form-control"
                        id="wBalance"
                        placeholder="Purchased Amount"
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <ModalFooter>
                  <Button
                    type="button"
                    color="light"
                    onClick={() => this.setState({ modal_static: false })}
                  >
                    Calcel
                  </Button>
                  <Button type="submit" color="primary">
                    Add
                  </Button>
                </ModalFooter>
              </AvForm>
            </ModalBody>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CustomersPage;
