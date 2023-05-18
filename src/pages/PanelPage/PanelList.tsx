import styled from "styled-components";
import IconFilter from "../../assets/img/icon-filter.svg";

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

  &:hover {
    cursor: pointer;
  }
`;

const ListButtonImg = styled.img`
  margin-left: 10px;
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

const ListUserIcon = styled.div`
  width: 53px;
  height: 53px;
  line-height: 53px;
  text-align: center;
  position: absolute;
  font-size: 18px;
  color: var(--cream);
  background-color: var(--dark-green);
  border-radius: 50%;
  margin: 17px 22px;
`;

const ListUserIconGB = styled.div`
  width: 53px;
  height: 53px;
  line-height: 53px;
  text-align: center;
  position: absolute;
  font-size: 18px;
  color: var(--cream);
  background-color: var(--green);
  border-radius: 50%;
  margin: 17px 22px;
`;

export function PanelList() {
  return (
    <div>
      <List>
        <ListItem>
          <ListButton>
            Imię
            <ListButtonImg src={IconFilter} alt="Ikona filtrowania" />
          </ListButton>
        </ListItem>

        <ListItem>
          <ListButton>
            Nazwisko
            <ListButtonImg src={IconFilter} alt="Ikona filtrowania" />
          </ListButton>
        </ListItem>
        <ListItem>
          <ListButton>
            E-mail
            <ListButtonImg src={IconFilter} alt="Ikona filtrowania" />
          </ListButton>
        </ListItem>
        <ListItem>
          <ListButton>
            Data urodzenia
            <ListButtonImg src={IconFilter} alt="Ikona filtrowania" />
          </ListButton>
        </ListItem>
      </List>

      <ListUser>
        <ListUserIcon>NU</ListUserIcon>
        <ListUserItem>Marek</ListUserItem>
        <ListUserItem>Rostowski</ListUserItem>
        <ListUserItem>m.rostowski@mail.pl</ListUserItem>
        <ListUserItem>20.12.1988</ListUserItem>
      </ListUser>

      <ListUser>
        <ListUserIconGB>GB</ListUserIconGB>
        <ListUserItem>Paweł</ListUserItem>
        <ListUserItem>Zawrzykaj</ListUserItem>
        <ListUserItem>p.zawrzykaj@mail.pl</ListUserItem>
        <ListUserItem>11.12.1988</ListUserItem>
      </ListUser>

      <ListUser>
        <ListUserIconGB>GB</ListUserIconGB>
        <ListUserItem>Mirek</ListUserItem>
        <ListUserItem>Bartman</ListUserItem>
        <ListUserItem>m.bartman@mail.pl</ListUserItem>
        <ListUserItem>20.12.1986</ListUserItem>
      </ListUser>
    </div>
  );
}
