import LegalPage from "./LegalPage";
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" label="Legal">
      <p
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1.2rem",
          color: "var(--color-teal)",
          fontStyle: "italic",
          marginBottom: "2rem",
        }}
      >
        PivotEdge Partners is committed to protecting the privacy and
        confidentiality of all individuals whose information we process.
      </p>
      <h2>1. Introduction</h2>
      <p>
        This Privacy Policy explains how PivotEdge Partners collects, uses,
        stores, and protects personal information in the course of providing
        executive search and leadership advisory services. We are committed to
        handling all personal data with the highest standards of confidentiality
        and in compliance with applicable data protection laws.
      </p>
      <h2>2. Information We Collect</h2>
      <h3>2.1 Client Information</h3>
      <p>
        We collect contact details, organisational information, and
        mandate-related information from client organisations and their
        representatives in order to deliver our services.
      </p>
      <h3>2.2 Candidate Information</h3>
      <p>
        In the course of executive search engagements, we collect professional
        information about candidates including career history, qualifications,
        references, and assessment outputs. All candidate information is handled
        with strict confidentiality.
      </p>
      <h3>2.3 Website Information</h3>
      <p>
        When you visit our website or submit an enquiry, we may collect contact
        information, the nature of your enquiry, and basic usage data for the
        purpose of responding to you and improving our services.
      </p>
      <h2>3. How We Use Information</h2>
      <p>
        Information collected is used solely for the purpose of delivering
        executive search and advisory services, responding to enquiries,
        maintaining professional relationships, and improving our services. We
        do not use personal information for unsolicited marketing purposes.
      </p>
      <h2>4. Confidentiality and Data Security</h2>
      <p>
        PivotEdge Partners treats all client and candidate information as
        strictly confidential. We implement appropriate technical and
        organisational measures to protect personal data against unauthorised
        access, loss, or disclosure. Access to personal data is restricted to
        those who require it to deliver our services.
      </p>
      <h2>5. Data Sharing</h2>
      <p>
        We do not sell, rent, or share personal data with third parties for
        commercial purposes. In the course of executive search engagements,
        candidate information may be shared with client organisations with the
        candidate's knowledge and as necessary to execute the mandate. We do not
        share information beyond what is necessary for the engagement.
      </p>
      <h2>6. Data Retention</h2>
      <p>
        We retain personal information for as long as necessary to deliver our
        services and maintain appropriate professional records. Candidate
        profiles may be retained for the purpose of future relevant mandates,
        subject to the individual's right to request deletion.
      </p>
      <h2>7. Your Rights</h2>
      <p>
        Individuals have the right to access, correct, or request deletion of
        their personal information held by PivotEdge Partners. To exercise these
        rights, please contact us directly at swapna.amin@pivotedgegroup.com. We
        will respond to all requests within 30 days.
      </p>
      <h2>8. Cookies</h2>
      <p>
        Our website may use basic session cookies to support website export
        default functionality. We do not use tracking cookies for advertising or
        behavioural profiling purposes.
      </p>
      <h2>9. Changes to This Policy</h2>
      <p>
        PivotEdge Partners reserves the right to update this Privacy Policy at
        any time. Material changes will be communicated via our website.
        Continued use of our services following any update constitutes
        acceptance of the revised policy.
      </p>
      <h2>10. Contact</h2>
      <p>
        For privacy-related enquiries or to exercise your data rights, please
        contact Swapna Amin, Principal & Advisor, at
        swapna.amin@pivotedgegroup.com or +91 98207 79053.
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
        Last updated: 2025. © PivotEdge Partners. All rights reserved.
      </p>
    </LegalPage>
  );
}
