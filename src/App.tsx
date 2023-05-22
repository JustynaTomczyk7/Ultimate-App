import GlobalStyle from "./globalStyles";
import { Routes, Route, Navigate } from "react-router-dom";
import { StartPage } from "./pages/StartPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { LoginPage } from "./pages/LoginPage";
import { PanelPage } from "./pages/PanelPage/PanelPage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useEffect, useState } from "react";
import { getToken } from "./utils/getToken";
import { login } from "./redux/authSlice";

function App() {
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const isUserAuthenticated = useSelector(
    (state: RootState) => state.auth.isUserAuthenticated
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (getToken()) {
      dispatch(login());
    }

    setIsAppLoaded(true);
  }, []);

  if (!isAppLoaded) return <></>;

  return (
    <>
      <GlobalStyle />

      <Routes>
        <Route index element={<StartPage />} />
        <Route path="rejestracja" element={<RegistrationPage />} />
        <Route path="logowanie" element={<LoginPage />} />
        {isUserAuthenticated && <Route path="panel" element={<PanelPage />} />}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
