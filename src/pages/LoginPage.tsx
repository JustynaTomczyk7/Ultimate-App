import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import IconEmail from "../assets/img/icon-email.svg";
import IconPassword from "../assets/img/icon-password.svg";
import {
  AuthContainer,
  AuthContainerButton,
  AuthContainerHeading,
  AuthContainerImgEmail,
  AuthContainerImgPassword,
  AuthContainerInput,
  AuthContainerInputDiv,
  AuthContainerLabel,
} from "../styles/authContainerStyles/authContainerStyles";

const StyledButton = styled(AuthContainerButton)`
  margin-top: 70px;
`;

export function LoginPage() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/panel");
  };
  return (
    <AuthContainer>
      <AuthContainerHeading>Logowanie</AuthContainerHeading>

      <form>
        <AuthContainerLabel>
          E-mail
          <AuthContainerInputDiv>
            <AuthContainerImgEmail src={IconEmail} alt="Ikona email" />
            <AuthContainerInput
              type="email"
              name="email"
              placeholder="Adres e-mail"
            />
          </AuthContainerInputDiv>
        </AuthContainerLabel>

        <AuthContainerLabel>
          Hasło
          <AuthContainerInputDiv>
            <AuthContainerImgPassword src={IconPassword} alt="Ikona hasła" />
            <AuthContainerInput
              type="password"
              name="password"
              placeholder="Minimum 8 znaków"
              min={8}
            />
          </AuthContainerInputDiv>
        </AuthContainerLabel>
        <StyledButton onClick={handleButtonClick}>Zaloguj się</StyledButton>
      </form>
    </AuthContainer>
  );
}
