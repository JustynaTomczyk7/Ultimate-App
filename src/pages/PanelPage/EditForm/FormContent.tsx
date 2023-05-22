import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import IconCloseImg from "../../../assets/img/icon-close.svg";
import { PermissionsContainer } from "./PermissionsContainer";
import { Bottom } from "./Bottom";
import { FormEvent, useEffect } from "react";
import { getToken } from "../../../utils/getToken";
import { getRefreshToken } from "../../../utils/getRefreshToken";
import { useUserValidate } from "../useUserValidate";

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

type Props = {
  onClickCloseButton: () => void;
  onClickSaveButton: () => void;
};

export function FormContent({ onClickCloseButton, onClickSaveButton }: Props) {
  const {
    emailValue,
    setEmailValue,
    nameValue,
    setNameValue,
    surnameValue,
    setSurnameValue,
    dateOfBirthValue,
    setDateOfBirthValue,
    prefixValue,
    setPrefixValue,
    phoneValue,
    setPhoneValue,
    checkboxPrivacyPolicy,
    setCheckboxPrivacyPolicy,
    checkboxMarketing,
    setCheckboxMarketing,
    checkboxSalesRegulations,
    setcheckboxSalesRegulations,
    formErrors,
    validateEmail,
    validateName,
    validateSurname,
    validateDateOfBirth,
    validatePrefix,
    validatePhone,
    validatecheckboxPrivacyPolicy,
    validatecheckboxSalesRegulations,
    validateForm,
  } = useUserValidate();

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

    if (validateForm()) {
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
