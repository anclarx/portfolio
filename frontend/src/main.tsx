import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";

import { LanguageProvider } from "./context/languageContext.tsx";

createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </LanguageProvider>,
);
