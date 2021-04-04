// react
import React from 'react';

// third-party
import { Helmet } from 'react-helmet-async';

// data stubs
import theme from '../../data/theme';

export default function AccountPagePassword() {
    return (
        <div className="card">
            <Helmet>
                <title>{`Change Password — ${theme.name}`}</title>
            </Helmet>

            <div className="card-header">
                <h5>Schimba Parola</h5>
            </div>
            <div className="card-divider" />
            <div className="card-body">
                <div className="row no-gutters">
                    <div className="col-12 col-lg-7 col-xl-6">
                        <div className="form-group">
                            <label htmlFor="password-current">Parola Actuala</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password-current"
                                placeholder="Parola Actuala"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password-new">Parola Noua</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password-new"
                                placeholder="Parola Noua"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password-confirm">Confirma parola noua</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password-confirm"
                                placeholder="Confirma parola noua"
                            />
                        </div>

                        <div className="form-group mt-5 mb-0">
                            <button type="button" className="btn btn-primary">Schimba</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
