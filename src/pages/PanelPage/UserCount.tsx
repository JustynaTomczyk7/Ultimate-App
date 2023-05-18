import { useState } from "react";
import styled from "styled-components";

const Container = styled.ul`
  display: flex;
  list-style-type: none;
  padding: 0;
  font-size: 18px;
  font-weight: 500;

  li {
    margin-left: 8px;
  }
`;

const Button = styled.button<{ isActive?: boolean }>`
  border: none;
  font-size: 18px;
  font-weight: 500;
  background-color: transparent;
  text-decoration: ${({ isActive }) => isActive && `underline`};
  font-weight: ${({ isActive }) => isActive && `600`};

  &:hover {
    cursor: pointer;
  }
`;

export function UserCount() {
  const [selectedNumber, setSelectedNumber] = useState(3);

  return (
    <Container>
      Pokaż na stronie:
      <li>
        <Button
          onClick={() => setSelectedNumber(3)}
          isActive={selectedNumber === 3}
        >
          3
        </Button>
      </li>
      <li>
        <Button
          onClick={() => setSelectedNumber(5)}
          isActive={selectedNumber === 5}
        >
          5
        </Button>
      </li>
      <li>
        <Button
          onClick={() => setSelectedNumber(10)}
          isActive={selectedNumber === 10}
        >
          10
        </Button>
      </li>
    </Container>
  );
}
