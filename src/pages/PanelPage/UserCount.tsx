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
  cursor: pointer;
`;

type Props = {
  perPage: number;
  setPerPage: (pageNumber: number) => void;
};

export function UserCount({ perPage, setPerPage }: Props) {
  return (
    <Container>
      Pokaż na stronie:
      <li>
        <Button onClick={() => setPerPage(3)} isActive={perPage === 3}>
          3
        </Button>
      </li>
      <li>
        <Button onClick={() => setPerPage(5)} isActive={perPage === 5}>
          5
        </Button>
      </li>
      <li>
        <Button onClick={() => setPerPage(10)} isActive={perPage === 10}>
          10
        </Button>
      </li>
    </Container>
  );
}
