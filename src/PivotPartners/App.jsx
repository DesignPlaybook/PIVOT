import { useState } from "react";
import { css } from "./tokens";
import { Cursor } from "./utils";
import Nav from "./Nav";
import Footer from "./Footer";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import ServicesPage from "./ServicesPage";
import DomainsPage from "./DomainsPage";
import InsightsPage from "./InsightsPage";
import ContactPage from "./ContactPage";

export default function App() {
  const [page, setPage] = useState("Home");

  const pageMap = {
    Home: <HomePage setPage={setPage} />,
    "About Us": <AboutPage setPage={setPage} />,
    Services: <ServicesPage setPage={setPage} />,
    Domains: <DomainsPage setPage={setPage} />,
    Insights: <InsightsPage setPage={setPage} />,
    Contact: <ContactPage />,
  };

  return (
    <>
      <style>{css}</style>
      <Cursor />
      <Nav page={page} setPage={setPage} />
      <main style={{ paddingTop: 0 }}>{pageMap[page] || pageMap["Home"]}</main>
      <Footer setPage={setPage} />
    </>
  );
}
