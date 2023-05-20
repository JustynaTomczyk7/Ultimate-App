import styled from "styled-components";
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
  Alert,
} from "../styles/authContainerStyles/authContainerStyles";
import { FormEvent, useState } from "react";

const StyledButton = styled(AuthContainerButton)`
  margin-top: 70px;
`;

const checkIsEmailValid = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

type FormErrors = {
  email?: string;
  password?: string;
  repeatPassword?: string;
};

export function RegistrationPage() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [repeatPasswordValue, setRepeatPasswordValue] = useState("");
  const [formErrors, setFormErrors] = useState<FormErrors>();

  const validateEmail = () => {
    const emailErrorMessage = !checkIsEmailValid(emailValue)
      ? "*niepoprawny adres e-mail"
      : "";

    setFormErrors((state) => ({
      ...state,
      email: emailErrorMessage,
    }));

    return emailErrorMessage;
  };

  const checkPasswordsAreEqual = () => {
    const passwordsErrorMessage =
      passwordValue !== repeatPasswordValue ? "*różne hasła" : "";

    setFormErrors((state) => ({
      ...state,
      password: passwordsErrorMessage,
      repeatPassword: passwordsErrorMessage,
    }));

    return passwordsErrorMessage;
  };

  const validatePassword = () => {
    const passwordErrorMessage =
      passwordValue.length < 8 ? "*zbyt mała ilość znaków" : "";

    setFormErrors((state) => ({
      ...state,
      password: passwordErrorMessage,
    }));

    if (repeatPasswordValue.length) {
      return checkPasswordsAreEqual();
    }

    return passwordErrorMessage;
  };

  const validateRepeatPassword = () => {
    const passwordErrorMessage =
      passwordValue.length < 8 ? "*zbyt mała ilość znaków" : "";

    setFormErrors((state) => ({
      ...state,
      repeatPassword: passwordErrorMessage,
    }));

    if (passwordValue.length) {
      return checkPasswordsAreEqual();
    }

    return passwordErrorMessage;
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isEmailValid = !validateEmail();
    const isPasswordValid = !validatePassword();
    const isRepeatPasswordValid = !validateRepeatPassword();

    if (isEmailValid && isPasswordValid && isRepeatPasswordValid) {
      console.log("poprawne");
    }
  };

  return (
    <AuthContainer>
      <AuthContainerHeading>Zaczynamy!</AuthContainerHeading>

      <form onSubmit={handleFormSubmit}>
        <AuthContainerLabel>
          E-mail
          <AuthContainerInputDiv>
            <AuthContainerImgEmail src={IconEmail} alt="Ikona email" />
            <AuthContainerInput
              type="text"
              name="email"
              placeholder="Adres e-mail"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              onBlur={validateEmail}
            />
          </AuthContainerInputDiv>
          {formErrors?.email && <Alert>{formErrors.email}</Alert>}
        </AuthContainerLabel>

        <AuthContainerLabel>
          Hasło
          <AuthContainerInputDiv>
            <AuthContainerImgPassword src={IconPassword} alt="Ikona hasła" />
            <AuthContainerInput
              type="password"
              name="password"
              placeholder="Minimum 8 znaków"
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              onBlur={validatePassword}
            />
          </AuthContainerInputDiv>
          {formErrors?.password && <Alert>{formErrors.password}</Alert>}
        </AuthContainerLabel>

        <AuthContainerLabel>
          Powtórz hasło
          <AuthContainerInputDiv>
            <AuthContainerImgPassword src={IconPassword} alt="Ikona hasła" />
            <AuthContainerInput
              type="password"
              name="repeatPassword"
              placeholder="Minimum 8 znaków"
              value={repeatPasswordValue}
              onChange={(e) => setRepeatPasswordValue(e.target.value)}
              onBlur={validateRepeatPassword}
            />
          </AuthContainerInputDiv>
          {formErrors?.repeatPassword && (
            <Alert>{formErrors.repeatPassword}</Alert>
          )}
        </AuthContainerLabel>
        <StyledButton type="submit">Zarejestruj się</StyledButton>
      </form>
    </AuthContainer>
  );
}
