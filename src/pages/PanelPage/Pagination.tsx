import { useState } from "react";
import styled from "styled-components";

const Container = styled.ul`
  display: flex;
  list-style-type: none;
  justify-content: center;
  padding: 0;
  align-items: baseline;

  li {
    margin-right: 8px;
  }
`;

const Button = styled.button<{ isActive?: boolean }>`
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  font-size: 18px;
  font-weight: 600;
  background-color: transparent;
  background: ${({ isActive }) => isActive && `black`};
  color: ${({ isActive }) => isActive && `white`};

  &:hover {
    cursor: pointer;
  }
`;

export function Pagination() {
  const [selectedNumber, setSelectedNumber] = useState(1);

  return (
    <Container>
      <li>
        <Button
          onClick={() => setSelectedNumber(1)}
          isActive={selectedNumber === 1}
        >
          1
        </Button>
      </li>
      <li>
        <Button
          onClick={() => setSelectedNumber(2)}
          isActive={selectedNumber === 2}
        >
          2
        </Button>
      </li>
      <li>
        <Button
          onClick={() => setSelectedNumber(3)}
          isActive={selectedNumber === 3}
        >
          3
        </Button>
      </li>
      <li>
        <span>...</span>
      </li>
      <li>
        <Button
          onClick={() => setSelectedNumber(12)}
          isActive={selectedNumber === 12}
        >
          12
        </Button>
      </li>
    </Container>
  );
}
