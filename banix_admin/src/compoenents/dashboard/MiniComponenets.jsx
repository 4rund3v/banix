import React from "react";
import { Col, Card, CardBody, Media } from "reactstrap";

const MiniComponenets = () => {
  const reportsInfo = [
    {
      icon: "las la-layer-group",
      title: "Number of Sales",
      value: "1,452",
      rate: "2.4%",
      desc: "From previous period",
    },
    {
      icon: "las la-store",
      title: "Sales Revenue",
      value: "Rs. 38,452",
      rate: "2.4%",
      desc: "From previous period",
    },
    {
      icon: "las la-briefcase",
      title: "Average Price",
      value: "Rs. 900",
      rate: "2%",
      desc: "From previous period",
    },
  ];
  return (
    <React.Fragment>
      {reportsInfo.map((report) => (
        <Col key={report.id} md={4}>
          <Card>
            <CardBody>
              <Media>
                <Media body className="overflow-hidden">
                  <p className="text-truncate font-size-14 mb-2">
                    {report.title}
                  </p>
                  <h4 className="mb-0">{report.value}</h4>
                </Media>
                <div className="text-primary">
                  <i className={report.icon + " font-size-24"}></i>
                </div>
              </Media>
            </CardBody>

            <CardBody className="border-top py-3">
              <div className="text-truncate">
                <span className="badge badge-soft-success font-size-11 mr-1">
                  <i className="mdi mdi-menu-up"> </i> {report.rate}
                </span>
                <span className="text-muted ml-2">{report.desc}</span>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </React.Fragment>
  );
};

export default MiniComponenets;
