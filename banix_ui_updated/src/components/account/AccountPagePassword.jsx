// react
import React from "react";

// third-party
import { Helmet } from "react-helmet-async";

// data stubs
import theme from "../../data/theme";

export default function AccountPagePassword() {
  return (
    <div className="card">
      <Helmet>
        <title>{`Change Password — ${theme.name}`}</title>
      </Helmet>

      <div className="card-header">
        <h5>Update Password</h5>
      </div>
      <div className="card-divider" />
      <div className="card-body">
        <div className="row no-gutters">
          <div className="col-12 col-lg-7 col-xl-6">
            <div className="form-group">
              <label htmlFor="password-current">Current Password</label>
              <input
                type="password"
                className="form-control"
                id="password-current"
                placeholder="Parola Actuala"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password-new">New Password</label>
              <input
                type="password"
                className="form-control"
                id="password-new"
                placeholder="New Password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password-confirm">Confirm New Password</label>
              <input
                type="password"
                className="form-control"
                id="password-confirm"
                placeholder="Confirm New Password"
              />
            </div>

            <div className="form-group mt-5 mb-0">
              <button type="button" className="btn btn-primary">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
