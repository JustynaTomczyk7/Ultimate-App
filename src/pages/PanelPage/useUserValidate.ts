import { useState } from "react";
import { FormErrors } from "./types";

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

export function useUserValidate() {
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

  const validateForm = () => {
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

    return (
      isEmailValid &&
      isNameValid &&
      isSurnameValid &&
      isDateOfBirthValid &&
      isPrefixValid &&
      isPhoneValid &&
      isPrivacyPolicyValid &&
      isSalesRegulationsValid
    );
  };

  return {
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
    setFormErrors,
    validateEmail,
    validateName,
    validateSurname,
    validateDateOfBirth,
    validatePrefix,
    validatePhone,
    validatecheckboxPrivacyPolicy,
    validatecheckboxSalesRegulations,
    validateForm,
  };
}
