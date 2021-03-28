import React, { Component } from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import ReactApexChart from "react-apexcharts";

const SalesAnalytics = () => {
  const data = {
    series: [42, 26, 15],
    options: {
      labels: ["Led LightStrip", "LightStrip 2", "Led bulb"],
      plotOptions: {
        pie: {
          donut: {
            size: "75%",
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      colors: ["#5664d2", "#1cbb8c", "#eeb902"],
    },
  };
  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <div className="float-right">
            <select className="custom-select custom-select-sm">
              <option defaultValue>Apr</option>
              <option value="1">Mar</option>
              <option value="2">Feb</option>
              <option value="3">Jan</option>
            </select>
          </div>
          <h4 className="card-title mb-4">Sales Analytics</h4>

          <div id="donut-chart" className="apex-charts">
            <ReactApexChart
              options={data.options}
              series={data.series}
              type="donut"
              height="230"
            />
          </div>

          <Row>
            <Col xs={4}>
              <div className="text-center mt-4">
                <p className="mb-2 text-truncate">
                  <i className="mdi mdi-circle text-primary font-size-10 mr-1"></i>{" "}
                  Led LightStrip
                </p>
                <h5>42 %</h5>
              </div>
            </Col>
            <Col xs={4}>
              <div className="text-center mt-4">
                <p className="mb-2 text-truncate">
                  <i className="mdi mdi-circle text-success font-size-10 mr-1"></i>{" "}
                  LightStrip 2
                </p>
                <h5>26 %</h5>
              </div>
            </Col>
            <Col xs={4}>
              <div className="text-center mt-4">
                <p className="mb-2 text-truncate">
                  <i className="mdi mdi-circle text-warning font-size-10 mr-1"></i>{" "}
                  Led Bulb
                </p>
                <h5>42 %</h5>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default SalesAnalytics;
