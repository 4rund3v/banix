import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import ReactApexChart from "react-apexcharts";

const EarningReports = () => {
  const data = {
    menu: false,
    series: [72],
    options: {
      chart: {
        sparkline: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#5664d2"],
      stroke: {
        lineCap: "round",
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: "70%",
          },
          track: {
            margin: 0,
          },

          dataLabels: {
            show: false,
          },
        },
      },
    },
    series2: [65],
    options2: {
      chart: {
        sparkline: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#1cbb8c"],
      stroke: {
        lineCap: "round",
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: "70%",
          },
          track: {
            margin: 0,
          },

          dataLabels: {
            show: false,
          },
        },
      },
    },
  };

  const [menu, setMenu] = useState(false);

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <Dropdown
            className="float-right"
            isOpen={menu}
            toggle={() => setMenu(!menu)}
          >
            <DropdownToggle tag="i" className="arrow-none card-drop">
              <i className="mdi mdi-dots-vertical"></i>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem href="">Sales Report</DropdownItem>

              <DropdownItem href="">Export Report</DropdownItem>

              <DropdownItem href="">Profit</DropdownItem>

              <DropdownItem href="">Action</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <h4 className="card-title mb-4">Earning Reports</h4>
          <div className="text-center">
            <Row>
              <Col sm={6}>
                <div>
                  <div className="mb-3">
                    <div id="radialchart-1" className="apex-charts">
                      <ReactApexChart
                        options={data.options}
                        series={data.series}
                        type="radialBar"
                        height="60"
                      />
                    </div>
                  </div>

                  <p className="text-muted text-truncate mb-2">
                    Weekly Earnings
                  </p>
                  <h5>Rs. 2,523</h5>
                </div>
              </Col>

              <Col sm={6}>
                <div className="mt-5 mt-sm-0">
                  <div className="mb-3">
                    <div id="radialchart-2" className="apex-charts">
                      <ReactApexChart
                        options={data.options2}
                        series={data.series2}
                        type="radialBar"
                        height="60"
                      />
                    </div>
                  </div>

                  <p className="text-muted text-truncate mb-2">
                    Monthly Earnings
                  </p>
                  <h5>Rs.11,235</h5>
                </div>
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default EarningReports;
