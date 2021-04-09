// react
import React from "react";

// third-party
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// application
import PageHeader from "../shared/PageHeader";
import { Check9x7Svg } from "../../svg";

// data stubs
import theme from "../../data/theme";

const AuthPageRegister = () => {
  const breadcrumb = [
    { title: "Home", url: "" },
    { title: "My Account", url: "" },
  ];

  return (
    <React.Fragment>
      <Helmet>
        <title>{`Register — ${theme.name}`}</title>
      </Helmet>

      <PageHeader header="Register" breadcrumb={breadcrumb} />

      <div className="block">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-6 d-flex mt-4 mt-md-0">
              <div className="card flex-grow-1 mb-0">
                <div className="card-body">
                  <h3 className="card-title">Register</h3>
                  <form>
                    <div className="form-group">
                      <label htmlFor="register-email">Adresa Email</label>
                      <input
                        id="register-email"
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="register-password">Parola</label>
                      <input
                        id="register-password"
                        type="password"
                        className="form-control"
                        placeholder="Password"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="register-confirm">Confirma parola</label>
                      <input
                        id="register-confirm"
                        type="password"
                        className="form-control"
                        placeholder="Password"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary mt-2 mt-md-3 mt-lg-4"
                    >
                      Inregistrare
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default AuthPageRegister;
