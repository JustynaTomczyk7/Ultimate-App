import styled from "styled-components";
import { Pagination } from "./Pagination";
import { UserCount } from "./UserCount";
import { PanelList } from "./PanelList";
import { FilterContainer } from "./FilterContainer";
import { FormContent } from "./EditForm/FormContent";
import { useEffect, useState } from "react";
import { User } from "./types";
import { buildQueryParams } from "../../utils/buildQueryParams";

const PanelContainer = styled.div`
  width: 1400px;
  background-color: transparent;
  margin: auto;
`;

const EditButton = styled.button`
  width: 228px;
  line-height: 49px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  border: 1px solid var(--dark-blue-border);
  border-radius: 14px;
  background-color: var(--white);
  margin: 80px 0 80px auto;
  display: block;

  &:hover {
    cursor: pointer;
    background-color: var(--dark-blue-border);
    color: var(--white);
  }
`;

const BottomNavigation = styled.div`
  width: 100%;
  margin: 80px 0;
`;

const BgOpacity = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #00000043;
  position: fixed;
  top: 0;
  left: 0;
`;

const EditForm = styled.div`
  width: 1100px;
  background-color: var(--white);
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);
  border: 0.25px solid var(--gray);
  border-radius: 8px;
  padding: 50px;
`;

const EditFormHeader = styled.div`
  width: 100%;
  height: 40px;
  font-size: 15px;
  font-weight: 200;
  border-bottom: thin solid var(--gray);
  margin-bottom: 20px;
`;

const BgOpacityConfirmContainer = styled.div<{ isDisplayed?: boolean }>`
  display: ${({ isDisplayed }) => (isDisplayed ? `block` : `none`)};
  width: 100vw;
  height: 100vh;
  background-color: #00000043;
  position: fixed;
  top: 0;
  left: 0;
`;

const ConfirmContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  background-color: var(--white);
  padding: 115px 0;
  border: 0.25px solid var(--gray);
  border-radius: 8px;

  p {
    font-size: 36px;
    font-weight: 500;
    color: var(--light-green);
    text-align: center;
    margin: 0;
    margin-bottom: 80px;
  }

  button {
    width: 315px;
    font-size: 21px;
    font-weight: 500;
    text-align: center;
    line-height: 57px;
    background-color: transparent;
    border: 1px solid var(--light-green);
    border-radius: 16px;
    display: block;
    margin: auto;

    &:hover {
      cursor: pointer;
      background-color: var(--light-green);
      color: var(--white);
    }
  }
`;

type SortValue = "asc" | "desc";

export type Sort = {
  id?: SortValue;
  name?: SortValue;
  surname?: SortValue;
  email?: SortValue;
  birth_date?: SortValue;
};

export type PaginationData = {
  more: boolean;
  total: number;
};

export function PanelPage() {
  const [isEditFormActive, setIsEditFormActive] = useState(false);
  const [isInfoBoxDisplayed, setIsInfoBoxDisplayed] = useState(false);
  const [search, setSearch] = useState("");
  const [isActivated, setIsActivated] = useState("ACTIVE,INACTIVE");
  const [perPage, setPerPage] = useState(5);
  const [users, setUsers] = useState<User[]>([]);
  const [sort, setSort] = useState<Sort>({ id: "asc" });
  const [page, setPage] = useState(1);
  const [paginationData, setPaginationData] = useState<PaginationData>();

  const getUsers = async () => {
    try {
      const params = {
        filter: { is_activated: isActivated },
        sort: sort,
        search: search,
        page: page,
        perPage: perPage,
      };

      const queryParams = buildQueryParams(params);
      const queryString = queryParams.join("&");

      const response = await fetch(
        "http://api.ultimate.systems/public/index.php/api/v1/auth/users?" +
          queryString
      );

      const result = await response.json();

      if (result.data) {
        setUsers(result.data);
        setPaginationData({
          more: result.more,
          total: result.total,
        });
      } else {
        console.log("Error");
      }
      console.log(result);
    } catch (error) {}
  };

  useEffect(() => {
    getUsers();
  }, [isActivated, perPage, sort, page]);

  return (
    <>
      <PanelContainer>
        <FilterContainer
          setSearch={setSearch}
          getUsers={getUsers}
          setIsActivated={setIsActivated}
        />
        <EditButton onClick={() => setIsEditFormActive(true)}>
          Edytuj swoje konto
        </EditButton>
        <PanelList users={users} sort={sort} setSort={setSort} />
        <BottomNavigation>
          <Pagination
            page={page}
            setPage={setPage}
            paginationData={paginationData}
            perPage={perPage}
          />
          <UserCount perPage={perPage} setPerPage={setPerPage} />
        </BottomNavigation>
      </PanelContainer>

      {isEditFormActive && (
        <>
          <BgOpacity>
            <EditForm>
              <EditFormHeader>Edycja danych</EditFormHeader>
              <FormContent
                onClickCloseButton={() => setIsEditFormActive(false)}
                onClickSaveButton={() => setIsInfoBoxDisplayed(true)}
              />
            </EditForm>
          </BgOpacity>
        </>
      )}

      <BgOpacityConfirmContainer isDisplayed={isInfoBoxDisplayed}>
        <ConfirmContainer>
          <p>Pomyślnie zapisanio dane</p>
          <button
            onClick={() => {
              setIsInfoBoxDisplayed(false);
            }}
          >
            Powrót do strony głównej
          </button>
        </ConfirmContainer>
      </BgOpacityConfirmContainer>
    </>
  );
}
