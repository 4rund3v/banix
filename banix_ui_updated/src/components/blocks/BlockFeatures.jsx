// react
import React from 'react';

// third-party
import PropTypes from 'prop-types';

// application
import {
    Fi24Hours48Svg,
    FiFreeDelivery48Svg,
    FiPaymentSecurity48Svg,
    FiTag48Svg,
} from '../../svg';

export default function BlockFeatures(props) {
    const { layout } = props;

    return (
        <div className={`block block-features block-features--layout--${layout}`}>
            <div className="container">
                <div className="block-features__list">
                    <div className="block-features__item">
                        <div className="block-features__icon">
                            <FiFreeDelivery48Svg />
                        </div>
                        <div className="block-features__content">
                            <div className="block-features__title">Transport Gratuit</div>
                            <div className="block-features__subtitle">Pentru toate produsele</div>
                        </div>
                    </div>
                    <div className="block-features__divider" />
                    <div className="block-features__item">
                        <div className="block-features__icon">
                            <Fi24Hours48Svg />
                        </div>
                        <div className="block-features__content">
                            <div className="block-features__title">Support 24/7</div>
                            <div className="block-features__subtitle">021.xxx.xxx</div>
                        </div>
                    </div>
                    <div className="block-features__divider" />
                    <div className="block-features__item">
                        <div className="block-features__icon">
                            <FiPaymentSecurity48Svg />
                        </div>
                        <div className="block-features__content">
                            <div className="block-features__title">Securizat 100%</div>
                            <div className="block-features__subtitle">Pentru platile online</div>
                        </div>
                    </div>
                    <div className="block-features__divider" />
                    <div className="block-features__item">
                        <div className="block-features__icon">
                            <FiTag48Svg />
                        </div>
                        <div className="block-features__content">
                            <div className="block-features__title">Oferte</div>
                            <div className="block-features__subtitle">Discount de pana la 30%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

BlockFeatures.propTypes = {
    layout: PropTypes.oneOf(['classic', 'boxed']),
};

BlockFeatures.defaultProps = {
    layout: 'classic',
};
