// react
import React from "react";

// application
import SocialLinks from "../shared/SocialLinks";

export default function FooterNewsletter() {
  return (
    <div className="site-footer__widget footer-newsletter">
      <h5 className="footer-newsletter__title">Newsletter</h5>
      <div className="footer-newsletter__text">
        Subscibe to out Newsletter to get the latest updates!{" "}
      </div>

      <form action="" className="footer-newsletter__form">
        <label className="sr-only" htmlFor="footer-newsletter-address">
          Email Address
        </label>
        <input
          type="text"
          className="footer-newsletter__form-input form-control"
          id="footer-newsletter-address"
          placeholder="Email Address..."
        />
        <button
          type="submit"
          className="footer-newsletter__form-button btn btn-primary"
        >
          Subscribe
        </button>
      </form>

      <div className="footer-newsletter__text footer-newsletter__text--social">
        Check us out !
      </div>

      <SocialLinks className="footer-newsletter__social-links" shape="circle" />
    </div>
  );
}
