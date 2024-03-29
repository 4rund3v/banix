// react
import React from "react";

// third-party
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// application
import PageHeader from "../shared/PageHeader";

// data stubs
import theme from "../../data/theme";
const SitePagePrivacyPolicy = () => {
  const breadcrumb = [
    { title: "Home", url: "/" },
    { title: "Privacy Policy", url: "/site/privacy-policy" },
  ];

  return (
    <React.Fragment>
      <Helmet>
        <title>{`Privacy Policy — ${theme.name}`}</title>
      </Helmet>

      <PageHeader breadcrumb={breadcrumb} />

      <div className="block">
        <div className="container">
          <div className="document">
            <div className="document__header">
              <h1 className="document__title">Privacy Policy</h1>
              <div className="document__subtitle">
                This Agreement was last modified on 26 March 2021.
              </div>
            </div>
            <div className="document__content typography">
              <p>
                Banix Online Marketing India Ltd (Banix) operates banix.in and
                may operate other websites. It is Banix's policy to respect your
                privacy regarding any information we may collect while operating
                our websites.
              </p>
              <h3>Website Visitors</h3>
              <p>
                Like most website operators, Banix collects
                non-personally-identifying information of the sort that web
                browsers and servers typically make available, such as the
                browser type, language preference, referring site, and the date
                and time of each visitor request. Banix purpose in collecting
                non-personally identifying information is to better understand
                how Banix visitors use its website. From time to time, Banix may
                release non-personally-identifying information in the aggregate,
                e.g., by publishing a report on trends in the usage of its
                website. Banix also collects potentially personally-identifying
                information like Internet Protocol (IP) addresses for logged in
                users and for users leaving comments on banix.in blogs/sites.
                Banix only discloses logged in user and commenter IP addresses
                under the same circumstances that it uses and discloses
                personally-identifying information as described below, except
                that commenter IP addresses and email addresses are visible and
                disclosed to the administrators of the blog/site where the
                comment was left.
              </p>
              <h3>Gathering of Personally-Identifying Information</h3>
              <p>
                Certain visitors to Banix's websites choose to interact with
                Banix in ways that require Banix to gather
                personally-identifying information. The amount and type of
                information that Banix gathers depends on the nature of the
                interaction. For example, we ask visitors who sign up at
                banix.in to provide a username and email address. Those who
                engage in transactions with Banix are asked to provide
                additional information, including as necessary the personal and
                financial information required to process those transactions. In
                each case, Banix collects such information only insofar as is
                necessary or appropriate to fulfill the purpose of the visitor’s
                interaction with Banix. Banix does not disclose
                personally-identifying information other than as described
                below. And visitors can always refuse to supply
                personally-identifying information, with the caveat that it may
                prevent them from engaging in certain website-related
                activities.
              </p>
              <h3>Aggregated Statistics</h3>
              <p>
                Banix may collect statistics about the behavior of visitors to
                its websites. Banix may display this information publicly or
                provide it to others. However, Banix does not disclose
                personally-identifying information other than as described
                below.
              </p>
              <h3>Protection of Certain Personally-Identifying Information</h3>
              <p>
                Banix discloses potentially personally-identifying and
                personally-identifying information only to those of its
                employees, contractors and affiliated organizations that (i)
                need to know that information in order to process it on Banix's
                behalf or to provide services available at Banix’s websites, and
                (ii) that have agreed not to disclose it to others. Some of
                those employees, contractors and affiliated organizations may be
                located outside of your home country; by using Banix’s websites,
                you consent to the transfer of such information to them. Banix
                will not rent or sell potentially personally-identifying and
                personally-identifying information to anyone. Other than to its
                employees, contractors and affiliated organizations, as
                described above, Banix discloses potentially
                personally-identifying and personally-identifying information
                only in response to a subpoena, court order or other
                governmental request, or when Banix believes in good faith that
                disclosure is reasonably necessary to protect the property or
                rights of Banix, third parties or the public at large. If you
                are a registered user of an Banix website and have supplied your
                email address, Banix may occasionally send you an email to tell
                you about new features, solicit your feedback, or just keep you
                up to date with what’s going on with Banix and our products. If
                you send us a request (for example via email or via one of our
                feedback mechanisms), we reserve the right to publish it in
                order to help us clarify or respond to your request or to help
                us support other users. Banix takes all measures reasonably
                necessary to protect against the unauthorized access, use,
                alteration or destruction of potentially personally-identifying
                and personally-identifying information.
              </p>
              <h3>Cookies</h3>
              <p>
                A cookie is a string of information that a website stores on a
                visitor’s computer, and that the visitor’s browser provides to
                the website each time the visitor returns. Banix uses cookies to
                help Banix identify and track visitors, their usage of Banix
                website, and their website access preferences. Banix visitors
                who do not wish to have cookies placed on their computers should
                set their browsers to refuse cookies before using Banix’s
                websites, with the drawback that certain features of Banix’s
                websites may not function properly without the aid of cookies.
              </p>
              <h3>Business Transfers</h3>
              <p>
                If Banix, or substantially all of its assets, were acquired, or
                in the unlikely event that Banix goes out of business or enters
                bankruptcy, user information would be one of the assets that is
                transferred or acquired by a third party. You acknowledge that
                such transfers may occur, and that any acquirer of Banix may
                continue to use your personal information as set forth in this
                policy.{" "}
              </p>
              <h3>Ads</h3>
              <p>
                Ads appearing on any of our websites may be delivered to users
                by advertising partners, who may set cookies. These cookies
                allow the ad server to recognize your computer each time they
                send you an online advertisement to compile information about
                you or others who use your computer. This information allows ad
                networks to, among other things, deliver targeted advertisements
                that they believe will be of most interest to you. This Privacy
                Policy covers the use of cookies by Banix and does not cover the
                use of cookies by any advertisers.
              </p>
              <h3>Privacy Policy Changes </h3>
              <p>
                Although most changes are likely to be minor, Banix may change
                its Privacy Policy from time to time, and in Banix’s sole
                discretion. Banix encourages visitors to frequently check this
                page for any changes to its Privacy Policy. If you have a
                banix.in account, you might also receive an alert informing you
                of these changes. Your continued use of this site after any
                change in this Privacy Policy will constitute your acceptance of
                such change.
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SitePagePrivacyPolicy;
