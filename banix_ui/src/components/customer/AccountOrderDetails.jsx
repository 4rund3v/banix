import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import { Container, Row, Col, Card, Table } from "react-bootstrap";
import Message from "../misc/Message";
import Loader from "../misc/Loader";
import { getOrderDetails } from "../../actions/orderActions";
import { getDateStringFromIsoTimestamp, numberWithCommas } from "../../utils";

const AccountOrderDetails = ({ match }) => {
  const dispatch = useDispatch();

  console.log("[AccountOrderDetails] the matched order id is ::: ", match);
  const orderId = match.params.id;
  const orderInfo = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderInfo;
  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch]);
  console.log("[AccountOrderDetails] The order is ::: ", order);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <Helmet>
        <title>{`Order Details — Banix`}</title>
      </Helmet>

      <Card>
        <div className="order-header">
          <div className="order-header__actions">
            <Link to="/account/orders" className="btn btn-xs btn-secondary">
              Back to list
            </Link>
          </div>
          <h5 className="order-header__title">Order #{orderId}</h5>
          <div className="order-header__subtitle">
            Was placed on{" "}
            <mark className="order-header__date">
              {getDateStringFromIsoTimestamp(order.orderDate)}
            </mark>{" "}
            and is currently{" "}
            <mark className="order-header__status">{"being Processed"}</mark>.
          </div>
        </div>
        <div className="card-divider" />
        <div className="card-table">
          <Table className="table-responsive-sm" size="sm">
            <thead>
              <tr>
                <th>Product</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody className="card-table__body card-table__body--merge-rows">
              {order.orderItems.map((orderItem) => (
                <tr>
                  <td>
                    {orderItem.orderProductName} × {orderItem.orderItemQty}
                  </td>
                  <td>
                    &#8377;{numberWithCommas(orderItem.totalSellingPrice)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tbody className="card-table__body  card-table__body--merge-rows">
              <tr>
                <th className="card-table__body__pricing__header">Subtotal</th>
                <td>
                  &#8377;
                  {numberWithCommas(order.orderPrice.totalSellingPrice)}
                </td>
              </tr>
              <tr>
                <th>Tax</th>
                <td>
                  &#8377;{numberWithCommas(order.orderPrice.totalTaxPrice)}
                </td>
              </tr>
              <tr>
                <th>Shipping</th>
                <td>
                  &#8377;
                  {numberWithCommas(order.orderPrice.totalShippingPrice)}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th>Total</th>
                <td>
                  <strong>
                    {" "}
                    &#8377; {numberWithCommas(order.orderPrice.totalPrice)}
                  </strong>
                </td>
              </tr>
            </tfoot>
          </Table>
        </div>{" "}
      </Card>

      <div className="row mt-3 no-gutters mx-n2">
        <div className="col-sm-6 col-12 px-2">
          <div className="card address-card address-card--featured">
            <div className="address-card__body">
              <div className="address-card__badge address-card__badge--muted">
                Shipping Address
              </div>
              <div className="address-card__name">
                {order.orderShippingAddress.fullName}
              </div>
              <div className="address-card__row">
                {order.orderShippingAddress.buildingInfo}
                <br />
                {order.orderShippingAddress.cityInfo},
                <br /> {order.orderShippingAddress.stateInfo} -{" "}
                {order.orderShippingAddress.pinCode}
                <br />
              </div>
              <div className="address-card__row">
                <div className="address-card__row-title">Phone Number</div>
                <div className="address-card__row-content">
                  {order.orderShippingAddress.mobileNumber}
                </div>
              </div>
              {/* <div className="address-card__row">
                <div className="address-card__row-title">Email Address</div>
                <div className="address-card__row-content">
                  {order.orderShippingAddress.emailAddress}
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-12 px-2 mt-sm-0 mt-3">
          <div className="card address-card address-card--featured">
            <div className="address-card__body">
              <div className="address-card__badge address-card__badge--muted">
                Billing Address
              </div>
              <div className="address-card__name">banix</div>
              <div className="address-card__row">
                25/1, Banix, Infant Mercy Ground floor Mallappa Layout,
                Seegehalli, K R Puram,
                <br />
                Bangalore, Karnataka - 560049
              </div>
              <div className="address-card__row">
                <div className="address-card__row-title">Phone Number</div>
                <div className="address-card__row-content">+91 7411607657</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountOrderDetails;
