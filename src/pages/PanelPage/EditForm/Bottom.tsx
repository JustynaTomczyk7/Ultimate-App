import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  margin: 50px 0 0 0;
`;

const Information = styled.p`
  width: 60%;
  padding-left: 44px;
  margin: 0;
  font-size: 15px;
  font-weight: 200;
`;

const CancelButton = styled.button`
  width: 20%;
  background-color: transparent;
  border: none;
  line-height: 38px;
  font-size: 15px;
  color: var(--blue);
  cursor: pointer;
`;

const SaveButton = styled.button`
  width: 20%;
  background-color: transparent;
  border: 0.25px solid var(--dark-blue-border);
  border-radius: 14px;
  line-height: 38px;
  text-align: center;
  font-size: 15px;

  &:hover {
    cursor: pointer;
    background-color: var(--dark-blue-border);
    color: var(--white);
  }
`;

type Props = {
  onClickCloseButton: () => void;
};

export function Bottom({ onClickCloseButton }: Props) {
  return (
    <Container>
      <Information>*Pola obowiązkowe</Information>
      <CancelButton onClick={onClickCloseButton}>Anuluj</CancelButton>
      <SaveButton type="submit">Zapisz</SaveButton>
    </Container>
  );
}
