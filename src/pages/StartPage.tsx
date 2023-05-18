import { Link } from "react-router-dom";
import {
  AuthContainer,
  AuthContainerButton,
} from "../styles/authContainerStyles/authContainerStyles";
import styled from "styled-components";

const StyledButton = styled(AuthContainerButton)`
  margin-top: 10px;
`;

export function StartPage() {
  return (
    <AuthContainer>
      <Link to="rejestracja">
        <AuthContainerButton>Zarejestruj się</AuthContainerButton>
      </Link>

      <Link to="logowanie">
        <StyledButton>Zaloguj się</StyledButton>
      </Link>
    </AuthContainer>
  );
}
