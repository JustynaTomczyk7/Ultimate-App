import GlobalStyle from "./globalStyles";
import { Routes, Route } from "react-router-dom";
import { StartPage } from "./pages/StartPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { LoginPage } from "./pages/LoginPage";

function App() {
  return (
    <>
      <GlobalStyle />

      <Routes>
        <Route index element={<StartPage />} />
        <Route path="rejestracja" element={<RegistrationPage />} />
        <Route path="logowanie" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
