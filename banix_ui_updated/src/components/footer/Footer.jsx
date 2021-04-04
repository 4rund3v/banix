// react
import React from 'react';

// application
import FooterContacts from './FooterContacts';
import FooterLinks from './FooterLinks';
import FooterNewsletter from './FooterNewsletter';
import ToTop from './ToTop';

// data stubs
import theme from '../../data/theme';

export default function Footer() {
    const informationLinks = [
        { title: 'Despre Noi', url: '' },
        { title: 'Blog', url: '' },
        { title: 'Politica de confidentialitate', url: '' },
        { title: 'Contact', url: '' },
        { title: 'Retur', url: '' },
        { title: 'Produse', url: '' },
        { title: 'Site Map', url: '' },
    ];

    const accountLinks = [
        { title: 'To be created', url: '' },
    ];

    return (
        <div className="site-footer">
            <div className="container">
                <div className="site-footer__widgets">
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-4">
                            <FooterContacts />
                        </div>
                        <div className="col-6 col-md-3 col-lg-2">
                            <FooterLinks title="Informatii" items={informationLinks} />
                        </div>
                        <div className="col-6 col-md-3 col-lg-2">
                            <FooterLinks title="Contul Meu" items={accountLinks} />
                        </div>
                        <div className="col-12 col-md-12 col-lg-4">
                            <FooterNewsletter />
                        </div>
                    </div>
                </div>

                <div className="site-footer__bottom">
                    <div className="site-footer__copyright">
                        Powered by
                        {' '}
                        <a href="https://reactjs.org/" rel="noopener noreferrer" target="_blank">React</a>
                        {' '}
                        — Design by
                        {' '}
                        <a href={theme.author.profile_url} target="_blank" rel="noopener noreferrer">
                            {theme.author.name}
                        </a>
                    </div>
                    <div className="site-footer__payments">
                        <img src="images/payments.png" alt="" />
                    </div>
                </div>
            </div>
            <ToTop />
        </div>
    );
}
