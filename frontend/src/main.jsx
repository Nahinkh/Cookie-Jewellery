import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext.jsx";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppContextProvider>
      
      <HelmetProvider>
<App />     
      </HelmetProvider>
      <Toaster />
    </AppContextProvider>
  </BrowserRouter>
);
