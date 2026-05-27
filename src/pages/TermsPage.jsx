import LegalPage from "./LegalPage";
export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" label="Legal">
      <p
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1.2rem",
          color: "var(--color-teal)",
          fontStyle: "italic",
          marginBottom: "2rem",
        }}
      >
        Please read these Terms and Conditions carefully before using PivotEdge
        Partners' services or website.
      </p>
      <h2>1. Introduction</h2>
      <p>
        These Terms and Conditions govern your use of the PivotEdge Partners
        website located at PivotEdgeGroup.com and the professional services
        provided by PivotEdge Partners. By accessing our website or engaging our
        services, you agree to be bound by these terms.
      </p>
      <h2>2. Services</h2>
      <p>
        PivotEdge Partners provides specialist executive search, leadership
        advisory, board governance advisory, succession planning, interim
        management, career transition, and diversity advisory services. All
        services are delivered on a retained, confidential basis.
      </p>
      <h3>2.1 Engagement Terms</h3>
      <p>
        All executive search and advisory engagements are subject to a separate
        written agreement between PivotEdge Partners and the client
        organisation. The terms of each engagement, including fees, scope,
        timelines, and confidentiality obligations, are set out in that
        agreement.
      </p>
      <h3>2.2 Professional Standards</h3>
      <p>
        PivotEdge Partners operates in accordance with the highest professional
        standards of the executive search industry. We are committed to
        integrity, confidentiality, and the responsible handling of all
        information entrusted to us.
      </p>
      <h2>3. Confidentiality</h2>
      <p>
        All information shared with PivotEdge Partners in the course of an
        engagement or enquiry is treated as strictly confidential. We do not
        disclose client or candidate information to third parties without
        explicit consent, except as required by law.
      </p>
      <h2>4. Intellectual Property</h2>
      <p>
        All content on this website, including text, graphics, methodology
        frameworks, and branding, is the intellectual property of PivotEdge
        Partners. No content may be reproduced, distributed, or used
        commercially without prior written consent.
      </p>
      <h2>5. Limitation of Liability</h2>
      <p>
        PivotEdge Partners provides advisory services in good faith and with
        professional diligence. However, we cannot guarantee specific outcomes
        from executive search engagements. Our liability is limited to the fees
        paid under the specific engagement agreement.
      </p>
      <h2>6. Website Use</h2>
      <p>
        This website is provided for informational purposes. PivotEdge Partners
        makes no representations or warranties regarding the accuracy or
        completeness of the information provided. We reserve the right to modify
        website content at any time.
      </p>
      <h2>7. Governing Law</h2>
      <p>
        These Terms and Conditions are governed by the laws of the Republic of
        India. Any disputes arising under or in connection with these terms
        shall be subject to the exclusive jurisdiction of the courts of Mumbai,
        Maharashtra.
      </p>
      <h2>8. Contact</h2>
      <p>
        For questions regarding these Terms and Conditions, please contact
        Swapna Amin at swapna.amin@pivotedgegroup.com.
      </p>
      <p
        style={{
          fontSize: "0.875rem",
          color: "#9ca3af",
          marginTop: "3rem",
          borderTop: "1px solid rgba(15,76,92,0.1)",
          paddingTop: "1.5rem",
        }}
      >
        Last updated: 2025. PivotEdge Partners reserves the right to update
        these terms at any time.
      </p>
    </LegalPage>
  );
}
