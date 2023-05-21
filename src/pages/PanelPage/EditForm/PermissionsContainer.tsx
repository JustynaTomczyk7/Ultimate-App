import styled from "styled-components";
import { FormErrors } from "../types";

const Container = styled.div`
  width: 100%;
  display: flex;
  margin-top: 20px;
`;

const Label = styled.label`
  width: calc(100% / 3);
  font-size: 15px;
  font-weight: 200;
  line-height: 24px;

  div {
    display: flex;
    align-items: center;

    input {
      margin: 0 20px 0 0;
      width: 24px;
      height: 24px;
      border-radius: 50%;

      &:checked {
        accent-color: var(--white);
      }
    }

    p {
      margin: 0;
    }
  }
`;

const ValidationMessagePermissions = styled.p`
  color: var(--red);
  font-size: 15px;
  font-weight: 200;
  margin: 0;
  padding-top: 10px;
  margin-left: 44px;
`;

type Props = {
  formErrors?: FormErrors;
  checkboxPrivacyPolicy: boolean;
  onChangeCheckboxPrivacyPolice: (isChecked: boolean) => void;
  checkboxSalesRegulations: boolean;
  onChangeCheckboxSalesRegulations: (isChecked: boolean) => void;
};

export function PermissionsContainer({
  formErrors,
  checkboxPrivacyPolicy,
  onChangeCheckboxPrivacyPolice,
  checkboxSalesRegulations,
  onChangeCheckboxSalesRegulations,
}: Props) {
  return (
    <Container>
      <Label>
        <div>
          <input
            type="checkbox"
            name="checkboxPrivacyPolicy"
            checked={checkboxPrivacyPolicy}
            onChange={(e) => {
              onChangeCheckboxPrivacyPolice(e.target.checked);
            }}
          />
          <p>*Polityka prywatności</p>
        </div>
        {formErrors?.checkboxPrivacyPolicy && (
          <ValidationMessagePermissions>
            {formErrors.checkboxPrivacyPolicy}
          </ValidationMessagePermissions>
        )}
      </Label>
      <Label>
        <div>
          <input type="checkbox" name="marketing" />
          <p>Zgody marketingowe</p>
        </div>
      </Label>
      <Label>
        <div>
          <input
            type="checkbox"
            name="checkboxSalesRegulations"
            checked={checkboxSalesRegulations}
            onChange={(e) => {
              onChangeCheckboxSalesRegulations(e.target.checked);
            }}
          />
          <p>*Regulamin sprzedaży</p>
        </div>
        {formErrors?.checkboxSalesRegulations && (
          <ValidationMessagePermissions>
            {formErrors.checkboxSalesRegulations}
          </ValidationMessagePermissions>
        )}
      </Label>
    </Container>
  );
}
