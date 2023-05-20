import GlobalStyle from "./globalStyles";
import { Routes, Route, Navigate } from "react-router-dom";
import { StartPage } from "./pages/StartPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { LoginPage } from "./pages/LoginPage";
import { PanelPage } from "./pages/PanelPage/PanelPage";

// function getCookie(name: string) {
//   if (document.cookie.length !== 0) {
//     var array = document.cookie.split("=");
//     return array[1];
//   } else {
//     return false;
//   }
// }

function App() {
  return (
    <>
      <GlobalStyle />

      <Routes>
        <Route index element={<StartPage />} />
        <Route path="rejestracja" element={<RegistrationPage />} />
        <Route path="logowanie" element={<LoginPage />} />
        {/* {getCookie("token") && <Route path="panel" element={<PanelPage />} />} */}
        <Route path="panel" element={<PanelPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
