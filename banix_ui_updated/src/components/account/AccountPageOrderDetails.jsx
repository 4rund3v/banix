// react
import React from 'react';

// third-party
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// data stubs
import theme from '../../data/theme';

export default function AccountPageOrderDetails() {
    return (
        <React.Fragment>
            <Helmet>
                <title>{`Order Details — ${theme.name}`}</title>
            </Helmet>

            <div className="card">
                <div className="order-header">
                    <div className="order-header__actions">
                        <Link to="/account/orders" className="btn btn-xs btn-secondary">Inapoi</Link>
                    </div>
                    <h5 className="order-header__title">Comanda #3857</h5>
                    <div className="order-header__subtitle">
                        A fost plasata in data de
                        {' '}
                        <mark className="order-header__date">19 Decembrie, 2020</mark>
                        {' '}
                        si are statusul
                        {' '}
                        <mark className="order-header__status">Terminat</mark>
                        .
                    </div>
                </div>
                <div className="card-divider" />
                <div className="card-table">
                    <div className="table-responsive-sm">
                        <table>
                            <thead>
                                <tr>
                                    <th>Produs</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody className="card-table__body card-table__body--merge-rows">
                                <tr>
                                    <td>Panouri solare</td>
                                    <td>Lei 5200</td>
                                </tr>
                                <tr>
                                    <td>Centrala termica</td>
                                    <td>Lei 3450</td>
                                </tr>
                                <tr>
                                    <td>Serviciu : Montaj Centrala</td>
                                    <td>Lei 500</td>
                                </tr>
                            </tbody>
                            <tbody className="card-table__body card-table__body--merge-rows">
                                <tr>
                                    <th>Subtotal</th>
                                    <td>Lei 9150</td>
                                </tr>
                                <tr>
                                    <th>Discount</th>
                                    <td>Lei 300</td>
                                </tr>
                                <tr>
                                    <th>Transport</th>
                                    <td>Lei 0</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>Total</th>
                                    <td>Lei 8850</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>

            <div className="row mt-3 no-gutters mx-n2">
                <div className="col-sm-6 col-12 px-2">
                    <div className="card address-card address-card--featured">
                        <div className="address-card__body">
                            <div className="address-card__badge address-card__badge--muted">Adresa de livrare</div>
                            <div className="address-card__name">Radu</div>
                            <div className="address-card__row">
                                Bucuresti
                                <br />
                                Romania
                                <br />
                                Strada Colonel Gheorghe Costescu Nr. 3
                            </div>
                            <div className="address-card__row">
                                <div className="address-card__row-title">Numar Telefon</div>
                                <div className="address-card__row-content">074535612</div>
                            </div>
                            <div className="address-card__row">
                                <div className="address-card__row-title">Adresa E-mail</div>
                                <div className="address-card__row-content">Contact@lpvservice.ro</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-12 px-2 mt-sm-0 mt-3">
                    <div className="card address-card address-card--featured">
                        <div className="address-card__body">
                            <div className="address-card__badge address-card__badge--muted">Adresa Facturare</div>
                            <div className="address-card__name">Radu</div>
                            <div className="address-card__row">
                                Bucuresti
                                <br />
                                Romania
                                <br />
                                Strada Colonel Gheorghe Costescu Nr. 3
                            </div>
                            <div className="address-card__row">
                                <div className="address-card__row-title">Numar Telefon</div>
                                <div className="address-card__row-content">074535612</div>
                            </div>
                            <div className="address-card__row">
                                <div className="address-card__row-title">Adresa E-mail</div>
                                <div className="address-card__row-content">Contact@lpvservice.ro</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
