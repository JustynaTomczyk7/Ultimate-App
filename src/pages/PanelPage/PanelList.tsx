import styled, { css } from "styled-components";
import IconFilter from "../../assets/img/icon-filter.svg";
import { User } from "./types";
import { Sort } from "./PanelPage";

const List = styled.ul`
  width: 100%;
  display: flex;
  margin-bottom: 20px;
  padding: 0;
`;

const ListItem = styled.li`
  width: 25%;
  list-style: none;

  &:first-child {
    padding-left: 130px;
  }
`;

const ListButton = styled.button`
  font-size: 18px;
  font-weight: 600;
  border: none;
  background-color: transparent;
  padding: 0;
  height: 50px;
  cursor: pointer;
`;

const ListButtonImg = styled.img<{ direction?: "asc" | "desc" }>`
  margin-left: 10px;

  ${({ direction }) =>
    direction === "asc" &&
    css`
      transform: rotate(180deg);
    `}
`;

const ListUser = styled.ul`
  width: 100%;
  line-height: 87px;
  display: flex;
  background-color: var(--white);
  border: 0.25px solid var(--gray);
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 0;
`;

const ListUserItem = styled.li`
  width: 25%;
  list-style: none;

  &:nth-child(2) {
    padding-left: 130px;
  }
`;

const ListUserIcon = styled.div<{ isActive: boolean }>`
  width: 53px;
  height: 53px;
  line-height: 53px;
  text-align: center;
  position: absolute;
  font-size: 18px;
  color: var(--cream);
  background-color: ${({ isActive }) =>
    isActive ? "var(--dark-green)" : " var(--green)"};
  border-radius: 50%;
  margin: 17px 22px;
`;

type Props = {
  users: User[];
  sort: Sort;
  setSort: (newSort: Sort) => void;
};

export function PanelList({ users, sort, setSort }: Props) {
  const changeSortValue = (param: keyof Sort) => {
    if (sort[param] === "asc") {
      setSort({ [param]: "desc" });
    } else {
      setSort({ [param]: "asc" });
    }
  };

  return (
    <div>
      <List>
        <ListItem>
          <ListButton onClick={() => changeSortValue("name")}>
            Imię
            <ListButtonImg
              direction={sort["name"]}
              src={IconFilter}
              alt="Ikona filtrowania"
            />
          </ListButton>
        </ListItem>

        <ListItem>
          <ListButton onClick={() => changeSortValue("surname")}>
            Nazwisko
            <ListButtonImg
              direction={sort["surname"]}
              src={IconFilter}
              alt="Ikona filtrowania"
            />
          </ListButton>
        </ListItem>
        <ListItem>
          <ListButton onClick={() => changeSortValue("email")}>
            E-mail
            <ListButtonImg
              direction={sort["email"]}
              src={IconFilter}
              alt="Ikona filtrowania"
            />
          </ListButton>
        </ListItem>
        <ListItem>
          <ListButton onClick={() => changeSortValue("birth_date")}>
            Data urodzenia
            <ListButtonImg
              direction={sort["birth_date"]}
              src={IconFilter}
              alt="Ikona filtrowania"
            />
          </ListButton>
        </ListItem>
      </List>

      {users.map((user) => (
        <ListUser key={user.id}>
          <ListUserIcon isActive={user.is_activated}>
            {user.is_activated ? "NU" : "GB"}
          </ListUserIcon>
          <ListUserItem>{user.name || "-"}</ListUserItem>
          <ListUserItem>{user.surname || "-"}</ListUserItem>
          <ListUserItem>{user.email || "-"}</ListUserItem>
          <ListUserItem>{user.birth_date || "-"}</ListUserItem>
        </ListUser>
      ))}
    </div>
  );
}
