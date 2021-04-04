// react
import React from 'react';

// third-party
import { Link } from 'react-router-dom';

// application
import Indicator from './Indicator';
import { Person20Svg } from '../../svg';

export default function IndicatorAccount() {
    const dropdown = (
        <div className="account-menu">
            <form className="account-menu__form">
                <div className="account-menu__form-title">Logare</div>
                <div className="form-group">
                    <label htmlFor="header-signin-email" className="sr-only">Adresa Email</label>
                    <input
                        id="header-signin-email"
                        type="email"
                        className="form-control form-control-sm"
                        placeholder="Adresa Email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="header-signin-password" className="sr-only">Parola</label>
                    <div className="account-menu__form-forgot">
                        <input
                            id="header-signin-password"
                            type="password"
                            className="form-control form-control-sm"
                            placeholder="Parola"
                        />
                        <Link to="/account/login" className="account-menu__form-forgot-link">Ai uitat parola?</Link>
                    </div>
                </div>
                <div className="form-group account-menu__form-button">
                    <button type="submit" className="btn btn-primary btn-sm">Logare</button>
                </div>
                <div className="account-menu__form-link">
                    <Link to="/account/login">Creaza Cont</Link>
                </div>
            </form>
            <div className="account-menu__divider" />
            <Link to="/account/dashboard" className="account-menu__user">
                <div className="account-menu__user-avatar">
                    <img src="images/avatars/avatar-3.jpg" alt="" />
                </div>
                <div className="account-menu__user-info">
                    <div className="account-menu__user-name">Radu</div>
                    <div className="account-menu__user-email">contact@lpvservice.ro</div>
                </div>
            </Link>
            <div className="account-menu__divider" />
            <ul className="account-menu__links">
                <li><Link to="/account/profile">Editeaza Profil</Link></li>
                <li><Link to="/account/orders">Istoric Comenzi</Link></li>
                <li><Link to="/account/addresses">Adrese</Link></li>
                <li><Link to="/account/password">Parola</Link></li>
            </ul>
            <div className="account-menu__divider" />
            <ul className="account-menu__links">
                <li><Link to="/account/login">Logout</Link></li>
            </ul>
        </div>
    );

    return (
        <Indicator url="/account" dropdown={dropdown} icon={<Person20Svg />} />
    );
}
