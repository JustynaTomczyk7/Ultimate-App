import styled from "styled-components";

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
  visibility: hidden;
`;

export function PermissionsContainer() {
  return (
    <Container>
      <Label>
        <div>
          <input type="checkbox" name="privacyPolicy" />
          <p>*Polityka prywatności</p>
        </div>
        <ValidationMessagePermissions>
          *pole obowiązkowe
        </ValidationMessagePermissions>
      </Label>
      <Label>
        <div>
          <input type="checkbox" name="marketing" />
          <p>Zgody marketingowe</p>
        </div>
      </Label>
      <Label>
        <div>
          <input type="checkbox" name="salesRegulations" />
          <p>*Regulamin sprzedaży</p>
        </div>
        <ValidationMessagePermissions>
          *pole obowiązkowe
        </ValidationMessagePermissions>
      </Label>
    </Container>
  );
}
