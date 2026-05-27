import LegalPage from "./LegalPage";
export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" label="Legal">
      <p
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1.2rem",
          color: "var(--color-teal)",
          fontStyle: "italic",
          marginBottom: "2rem",
        }}
      >
        This disclaimer governs the use of the PivotEdge Partners website and
        the information contained herein.
      </p>
      <h2>1. General Disclaimer</h2>
      <p>
        The information provided on this website is for general informational
        purposes only. While PivotEdge Partners endeavours to keep the
        information current and accurate, we make no representations or
        warranties of any kind, express or implied, about the completeness,
        accuracy, reliability, or suitability of the information contained on
        the website.
      </p>
      <h2>2. No Professional Advice</h2>
      <p>
        Content on this website does not constitute professional legal,
        financial, HR, or business advice. All information is provided as
        general guidance only. For specific advice relevant to your
        organisation's circumstances, please engage PivotEdge Partners directly
        or seek appropriate professional counsel.
      </p>
      <h2>3. Third-Party Links</h2>
      <p>
        This website may contain links to third-party websites. These links are
        provided for convenience only. PivotEdge Partners has no control over
        the content of those sites and accepts no responsibility for them or for
        any loss or damage that may arise from your use of them.
      </p>
      <h2>4. Past Performance</h2>
      <p>
        References to past engagements, client outcomes, or market observations
        are illustrative only and should not be taken as indicative of future
        results. Executive search outcomes depend on many factors specific to
        each organisation and mandate.
      </p>
      <h2>5. Market Information</h2>
      <p>
        Any market intelligence, sector commentary, or leadership observations
        published on this website reflect the views of PivotEdge Partners at the
        time of publication. These views may change without notice and should
        not be relied upon as the sole basis for business decisions.
      </p>
      <h2>6. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, PivotEdge Partners excludes all
        liability for any direct, indirect, or consequential loss or damage
        arising from use of this website or reliance on the information
        contained herein.
      </p>
      <h2>7. Accuracy of Information</h2>
      <p>
        PivotEdge Partners makes reasonable efforts to ensure information on
        this website is accurate. However, we cannot warrant that the website
        will be error-free or uninterrupted. We reserve the right to make
        changes to the website at any time without notice.
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
        For enquiries, contact swapna.amin@pivotedgegroup.com.
      </p>
    </LegalPage>
  );
}
