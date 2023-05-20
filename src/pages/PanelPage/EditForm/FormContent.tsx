import styled from "styled-components";
import IconCloseImg from "../../../assets/img/icon-close.svg";
import { PermissionsContainer } from "./PermissionsContainer";
import { Bottom } from "./Bottom";

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
  visibility: hidden;
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
  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          onClickSaveButton();
          onClickCloseButton();
        }}
      >
        <Label>
          * E-mail
          <Input type="email" name="email" />
          <ValidationMessage>*pole obowiązkowe</ValidationMessage>
        </Label>
        <Label>
          * Imię
          <Input type="text" name="name" />
          <ValidationMessage>*pole obowiązkowe</ValidationMessage>
        </Label>
        <Label>
          * Nazwisko
          <Input type="text" name="surname" />
          <ValidationMessage>*pole obowiązkowe</ValidationMessage>
        </Label>
        <Label>
          * Data urodzenia
          <Input type="date" name="date" />
          <ValidationMessage>*pole obowiązkowe</ValidationMessage>
        </Label>
        <Label>
          * Telefon
          <TelInput>
            <InputPrefix type="text" name="prefix" value="+48" />
            <InputTel type="tel" name="phone" />
          </TelInput>
          <ValidationMessage>*pole obowiązkowe</ValidationMessage>
        </Label>

        <PermissionsContainer />
        <Bottom onClickCloseButton={() => onClickCloseButton()} />
      </Form>
      <CloseButton onClick={onClickCloseButton}>
        <img src={IconCloseImg} alt="Zamknij okno" />
      </CloseButton>
    </>
  );
}
