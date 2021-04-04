// react
import React from 'react';

// third-party
import { Helmet } from 'react-helmet-async';

// application
import StroykaSlick from '../shared/StroykaSlick';

// data stubs
import theme from '../../data/theme';

const slickSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            },
        },
        {
            breakpoint: 379,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};

function SitePageAboutUs() {
    return (
        <div className="block about-us">
            <Helmet>
                <title>{`Despre Noi — ${theme.name}`}</title>
            </Helmet>

            <div className="about-us__image" style={{ backgroundImage: 'url("images/aboutus.jpg")' }} />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-xl-10">
                        <div className="about-us__body">
                            <h1 className="about-us__title">Despre noi</h1>
                            <div className="about-us__text typography">
                                <p>
                                    LPV Service Consult reprezintă în România unul
                                    dintre cei mai importanți distribuitori
                                    ai mărcilor BUDERUS, VIESSMANN, FERROLI, FUJITSU, SIEMENS,
                                    WILO, DAIKIN, GREE, RIELLO, MOTAN, ESBE, DE DIETRICH în domeniul
                                    instalațiilor termice și de climatizare și cu posibilitatea
                                    de a oferi o gamă variată de produse.
                                </p>
                                <p>
                                    Nu ezitați să ne contactați
                                </p>
                            </div>
                            <div className="about-us__team">
                                <h2 className="about-us__team-title">Echipa LPV</h2>
                                <div className="about-us__teammates teammates">
                                    <StroykaSlick {...slickSettings}>
                                        <div className="teammates__item teammate">
                                            <div className="teammate__avatar">
                                                <img src="images/teammates/teammate-1.jpg" alt="" />
                                            </div>
                                            <div className="teammate__name">Nume 1</div>
                                            <div className="teammate__position text-muted">Chief Executive Officer</div>
                                        </div>
                                        <div className="teammates__item teammate">
                                            <div className="teammate__avatar">
                                                <img src="images/teammates/teammate-2.jpg" alt="" />
                                            </div>
                                            <div className="teammate__name">Nume 2</div>
                                            <div className="teammate__position text-muted">Marketing Officer</div>
                                        </div>
                                        <div className="teammates__item teammate">
                                            <div className="teammate__avatar">
                                                <img src="images/teammates/teammate-3.jpg" alt="" />
                                            </div>
                                            <div className="teammate__name">Nume 3</div>
                                            <div className="teammate__position text-muted">Finance Director</div>
                                        </div>
                                    </StroykaSlick>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SitePageAboutUs;
