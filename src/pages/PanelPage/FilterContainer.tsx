import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 45px;
  margin-top: 40px;
  background-color: var(--white);
  border: 0.25px solid var(--gray);
  border-radius: 8px;
  display: flex;
  padding: 40px 0;
`;

const Search = styled.div`
  width: 50%;
  display: flex;
`;

const SearchInput = styled.input`
  width: 425px;
  padding-left: 50px;
  margin-left: 30px;
  font-size: 15px;
  border: 0.25px solid var(--gray);
  border-radius: 12px;

  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  width: 156px;
  line-height: 45px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  background-color: var(--white);
  border: 1px solid var(--dark-blue-border);
  border-radius: 12px;
  margin-left: -120px;

  &:hover {
    cursor: pointer;
    background-color: var(--dark-blue-border);
    color: var(--white);
  }
`;

const Activity = styled.div`
  width: 50%;
  display: flex;
`;

const ActivityButton = styled.div`
  width: 152px;
  line-height: 45px;
  text-align: center;
  font-size: 15px;
  border: 1px solid var(--gray);
  border-radius: 12px;
  margin-left: 25px;

  &:hover {
    cursor: pointer;
    background-color: var(--dark-blue-border);
    color: var(--white);
  }
`;

type Props = {
  setSearch: (text: string) => void;
  setIsActivated: (state: string) => void;
  getUsers: () => Promise<void>;
};

export function FilterContainer({
  setSearch,
  setIsActivated,
  getUsers,
}: Props) {
  return (
    <Container>
      <Search>
        <SearchInput
          type="text"
          placeholder="Filtruj po imię, nazwisko"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <SearchButton onClick={getUsers}>Szukaj</SearchButton>
      </Search>
      <Activity>
        <ActivityButton
          onClick={() => {
            setIsActivated("ACTIVE,INACTIVE");
          }}
        >
          Wszyscy
        </ActivityButton>
        <ActivityButton
          onClick={() => {
            setIsActivated("ACTIVE");
          }}
        >
          Aktywni
        </ActivityButton>
        <ActivityButton
          onClick={() => {
            setIsActivated("INACTIVE");
          }}
        >
          Nieaktywni
        </ActivityButton>
      </Activity>
    </Container>
  );
}
