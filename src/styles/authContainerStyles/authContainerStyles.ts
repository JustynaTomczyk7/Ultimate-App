import styled from "styled-components";

export const AuthContainer = styled.div`
  width: 630px;
  background-color: var(--white);
  padding: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 0.5px solid var(--gray);
  border-radius: 11px;
`;

export const AuthContainerButton = styled.button`
  background: transparent;
  color: var(--dark-blue);
  border: 1px solid var(--dark-blue-border);
  border-radius: 7px;
  width: 100%;
  height: 68px;
  font-size: 30px;
  font-weight: 300;

  &:hover {
    cursor: pointer;
    background: var(--dark-blue);
    color: var(--white);
  }
`;

export const AuthContainerHeading = styled.h1`
  font-size: 40px;
  font-weight: 700;
  text-align: center;
  padding-bottom: 50px;
  margin: 0;
`;

export const AuthContainerLabel = styled.label`
  font-size: 18px;
  font-weight: 500;
`;

export const AuthContainerInputDiv = styled.div`
  display: flex;
  border: 0.5px solid var(--gray);
  border-radius: 6px;
  margin-top: 20px;
  margin-bottom: 35px;
`;

export const AuthContainerImgEmail = styled.img`
  width: 34px;
  margin: 15px 17px;
`;

export const AuthContainerImgPassword = styled.img`
  width: 24px;
  margin: 10px 22px;
`;

export const AuthContainerInput = styled.input`
  width: 100%;
  font-size: 22px;
  font-weight: 200;
  border: none;
  outline: none;
`;

export const Alert = styled.p`
  color: red;
  margin-top: -30px;
`;
