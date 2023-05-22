import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import IconCloseImg from "../../../assets/img/icon-close.svg";
import { PermissionsContainer } from "./PermissionsContainer";
import { Bottom } from "./Bottom";
import { FormEvent, useEffect, useState } from "react";
import { FormErrors } from "../types";
import { getToken } from "../../../utils/getToken";
import { getRefreshToken } from "../../../utils/getRefreshToken";

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Label = styled.label`
  width: calc(100% / 3);
  font-size: 15px;
  font-weight: 200;
  margin-top: 30px;
`;

const Input = styled.input`
  display: block;
  padding: 0;
  border: none;
  border-bottom: thin solid var(--gray);
  width: 280px;
  line-height: 25px;
  font-size: 18px;
  font-weight: 200;
  margin-top: 10px;

  &:focus {
    outline: none;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  display: block;
  padding: 0;
  border: none;
  border-bottom: thin solid var(--gray);
  width: 280px;
  line-height: 25px;
  font-size: 18px;
  font-weight: 200;
  margin-top: 10px;

  &:focus {
    outline: none;
  }
`;

const TelInput = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
`;

const InputPrefix = styled.input`
  padding: 0;
  border: none;
  border-bottom: thin solid var(--gray);
  width: 40px;
  line-height: 25px;
  font-size: 18px;
  font-weight: 200;

  &:focus {
    outline: none;
  }
`;

const InputTel = styled.input`
  padding: 0;
  border: none;
  border-bottom: thin solid var(--gray);
  margin-left: 20px;
  width: 220px;
  line-height: 25px;
  font-size: 18px;
  font-weight: 200;

  &:focus {
    outline: none;
  }
`;

const ValidationMessage = styled.p`
  color: var(--red);
  font-size: 15px;
  font-weight: 200;
  margin: 0;
  padding-top: 10px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -15px;
  right: -15px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const checkIsEmailValid = (email: string) => {
  return String(email).match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const checkIsPrefixValid = (prefix: string) => {
  return String(prefix).match(/^(\+?\d{1,3}|0)$/);
};

const checkIsPhoneNamberValid = (phone: string) => {
  return String(phone)
    .toLowerCase()
    .match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/);
};

type Props = {
  onClickCloseButton: () => void;
  onClickSaveButton: () => void;
};

export function FormContent({ onClickCloseButton, onClickSaveButton }: Props) {
  const [emailValue, setEmailValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [surnameValue, setSurnameValue] = useState("");
  const [dateOfBirthValue, setDateOfBirthValue] = useState<Date | null>(
    new Date()
  );
  const [prefixValue, setPrefixValue] = useState("+48");
  const [phoneValue, setPhoneValue] = useState("");
  const [checkboxPrivacyPolicy, setCheckboxPrivacyPolicy] = useState(false);
  const [checkboxMarketing, setCheckboxMarketing] = useState(false);
  const [checkboxSalesRegulations, setcheckboxSalesRegulations] =
    useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>();

  const updateUserData = async () => {
    try {
      const response = await fetch(
        "http://api.ultimate.systems/public/index.php/api/v1/auth/user",
        {
          method: "PATCH",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({
            email: emailValue,
            isBlocked: false,
            isActivated: false,
            name: nameValue,
            surname: surnameValue,
            birthDate: dateOfBirthValue,
            phonePrefix: prefixValue,
            phoneNumber: phoneValue,
            privacyPolicy: true,
            marketingAgreements: checkboxMarketing,
            sellingRegulation: true,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        onClickSaveButton();
        onClickCloseButton();
      }

      if (response.status === 401) {
        console.log("Error", result);
        await refreshToken();
        updateUserData();
      }
    } catch (error) {}
  };

  const refreshToken = async () => {
    try {
      const response = await fetch(
        "http://api.ultimate.systems/public/index.php/api/v1/auth/token/refresh",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refresh_token: getRefreshToken(),
          }),
        }
      );

      const result = await response.json();

      if (result.token) {
        const token = result.token;
        const refreshToken = result.refresh_token;
        document.cookie = `token=${token}`;
        document.cookie = `refreshToken=${refreshToken}`;
      }
    } catch (error) {}
  };

  const getUserData = async () => {
    try {
      const response = await fetch(
        "http://api.ultimate.systems/public/index.php/api/v1/auth/user",
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      const result = await response.json();

      if (result.data) {
        setEmailValue(result.data.email || "");
        setNameValue(result.data.name || "");
        setSurnameValue(result.data.surname || "");
        setDateOfBirthValue(new Date(result.data.birth_date) || null);
        setPrefixValue(result.data.phone_prefix || "+48");
        setPhoneValue(result.data.phone_number || "");
        setCheckboxPrivacyPolicy(result.data.privacy);
        setCheckboxMarketing(result.data.marketing);
        setcheckboxSalesRegulations(result.data.selling);
      } else {
        console.log("Error", result);

        if (response.status === 401) {
          await refreshToken();
          getUserData();
        }
      }
      console.log(result);
    } catch (error) {}
  };

  useEffect(() => {
    getUserData();
  }, []);

  const validateEmail = () => {
    const emailErrorMessage = !checkIsEmailValid(emailValue)
      ? "*pole obowiązkowe"
      : "";

    setFormErrors((state) => ({
      ...state,
      email: emailErrorMessage,
    }));

    return emailErrorMessage;
  };

  const validateName = () => {
    const nameErrorMessage = nameValue.length === 0 ? "*pole obowiązkowe" : "";

    setFormErrors((state) => ({
      ...state,
      name: nameErrorMessage,
    }));

    return nameErrorMessage;
  };

  const validateSurname = () => {
    const surnameErrorMessage =
      surnameValue.length === 0 ? "*pole obowiązkowe" : "";

    setFormErrors((state) => ({
      ...state,
      surname: surnameErrorMessage,
    }));

    return surnameErrorMessage;
  };

  const validateDateOfBirth = () => {
    const dateOfBirthErrorMessage = dateOfBirthValue ? "" : "*pole obowiązkowe";

    setFormErrors((state) => ({
      ...state,
      dateOfBirth: dateOfBirthErrorMessage,
    }));

    return dateOfBirthErrorMessage;
  };

  const validatePrefix = () => {
    const prefixErrorMessage = !checkIsPrefixValid(prefixValue)
      ? "*pole obowiązkowe"
      : "";

    setFormErrors((state) => ({
      ...state,
      prefix: prefixErrorMessage,
    }));

    return prefixErrorMessage;
  };

  const validatePhone = () => {
    let phoneErrorMessage = "";
    if (phoneValue.length === 0) {
      phoneErrorMessage = "*pole obowiązkowe";
    } else if (!checkIsPhoneNamberValid(phoneValue)) {
      phoneErrorMessage = "*podaj 9 cyfr";
    }

    setFormErrors((state) => ({
      ...state,
      phone: phoneErrorMessage,
    }));

    return phoneErrorMessage;
  };

  const validatecheckboxPrivacyPolicy = (isChecked: boolean) => {
    const checkboxErrorMessage = isChecked ? "" : "*pole obowiązkowe";

    setFormErrors((state) => ({
      ...state,
      checkboxPrivacyPolicy: checkboxErrorMessage,
    }));

    return checkboxErrorMessage;
  };

  const validatecheckboxSalesRegulations = (isChecked: boolean) => {
    const checkboxErrorMessage = isChecked ? "" : "*pole obowiązkowe";

    setFormErrors((state) => ({
      ...state,
      checkboxSalesRegulations: checkboxErrorMessage,
    }));

    return checkboxErrorMessage;
  };

  const onChangeCheckboxPrivacyPolice = (isChecked: boolean) => {
    setCheckboxPrivacyPolicy(isChecked);
    validatecheckboxPrivacyPolicy(isChecked);
  };

  const onChangeCheckboxMarketing = (isChecked: boolean) => {
    setCheckboxMarketing(isChecked);
  };

  const onChangeCheckboxSalesRegulations = (isChecked: boolean) => {
    setcheckboxSalesRegulations(isChecked);
    validatecheckboxSalesRegulations(isChecked);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isEmailValid = !validateEmail();
    const isNameValid = !validateName();
    const isSurnameValid = !validateSurname();
    const isDateOfBirthValid = !validateDateOfBirth();
    const isPrefixValid = !validatePrefix();
    const isPhoneValid = !validatePhone();
    const isPrivacyPolicyValid = !validatecheckboxPrivacyPolicy(
      checkboxPrivacyPolicy
    );
    const isSalesRegulationsValid = !validatecheckboxSalesRegulations(
      checkboxSalesRegulations
    );

    if (
      isEmailValid &&
      isNameValid &&
      isSurnameValid &&
      isDateOfBirthValid &&
      isPrefixValid &&
      isPhoneValid &&
      isPrivacyPolicyValid &&
      isSalesRegulationsValid
    ) {
      updateUserData();
    }
  };

  return (
    <>
      <Form onSubmit={handleFormSubmit}>
        <Label>
          * E-mail
          <Input
            type="email"
            name="email"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            onBlur={validateEmail}
          />
          {formErrors?.email && (
            <ValidationMessage>{formErrors.email}</ValidationMessage>
          )}
        </Label>
        <Label>
          * Imię
          <Input
            type="text"
            name="name"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            onBlur={validateName}
          />
          {formErrors?.name && (
            <ValidationMessage>{formErrors.name}</ValidationMessage>
          )}
        </Label>
        <Label>
          * Nazwisko
          <Input
            type="text"
            name="surname"
            value={surnameValue}
            onChange={(e) => setSurnameValue(e.target.value)}
            onBlur={validateSurname}
          />
          {formErrors?.surname && (
            <ValidationMessage>{formErrors.surname}</ValidationMessage>
          )}
        </Label>
        <Label>
          * Data urodzenia
          <StyledDatePicker
            selected={dateOfBirthValue}
            onChange={(date: Date | null) => setDateOfBirthValue(date)}
            onBlur={validateDateOfBirth}
            dateFormat="dd.MM.yyyy"
          />
          {formErrors?.dateOfBirth && (
            <ValidationMessage>{formErrors.dateOfBirth}</ValidationMessage>
          )}
        </Label>
        <Label>
          * Telefon
          <TelInput>
            <InputPrefix
              data-lpignore="true"
              type="text"
              name="prefix"
              value={prefixValue}
              onChange={(e) => setPrefixValue(e.target.value)}
              onBlur={validatePrefix}
            />
            <InputTel
              type="tel"
              name="phone"
              value={phoneValue}
              onChange={(e) => setPhoneValue(e.target.value)}
              onBlur={validatePhone}
            />
          </TelInput>
          {formErrors?.phone && (
            <ValidationMessage>{formErrors.phone}</ValidationMessage>
          )}
          {!formErrors?.phone && formErrors?.prefix && (
            <ValidationMessage>{formErrors.prefix}</ValidationMessage>
          )}
        </Label>

        <PermissionsContainer
          checkboxPrivacyPolicy={checkboxPrivacyPolicy}
          onChangeCheckboxPrivacyPolice={onChangeCheckboxPrivacyPolice}
          checkboxMarketing={checkboxMarketing}
          onChangeCheckboxMarketing={onChangeCheckboxMarketing}
          checkboxSalesRegulations={checkboxSalesRegulations}
          onChangeCheckboxSalesRegulations={onChangeCheckboxSalesRegulations}
          formErrors={formErrors}
        />
        <Bottom onClickCloseButton={() => onClickCloseButton()} />
      </Form>
      <CloseButton onClick={onClickCloseButton}>
        <img src={IconCloseImg} alt="Zamknij okno" />
      </CloseButton>
    </>
  );
}
