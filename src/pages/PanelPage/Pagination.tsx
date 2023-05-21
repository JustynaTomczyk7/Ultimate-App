import { useState } from "react";
import styled from "styled-components";
import { PaginationData } from "./PanelPage";

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
  cursor: pointer;
`;

type Props = {
  page: number;
  setPage: (pageNumber: number) => void;
  paginationData?: PaginationData;
  perPage: number;
};

export function Pagination({ page, setPage, paginationData, perPage }: Props) {
  if (!paginationData?.total) return <></>;
  const totalPages = Math.ceil(paginationData?.total / perPage);

  return (
    <Container>
      <li>
        <Button onClick={() => setPage(1)} isActive={page === 1}>
          1
        </Button>
      </li>

      {page - 1 > 3 && (
        <li>
          <span>...</span>
        </li>
      )}

      {page - 2 > 1 && (
        <li>
          <Button onClick={() => setPage(page - 2)}>{page - 2}</Button>
        </li>
      )}

      {page - 1 > 1 && (
        <li>
          <Button onClick={() => setPage(page - 1)}>{page - 1}</Button>
        </li>
      )}

      {page > 1 && page < totalPages && (
        <li>
          <Button onClick={() => setPage(page)} isActive>
            {page}
          </Button>
        </li>
      )}

      {page + 1 < totalPages && (
        <li>
          <Button onClick={() => setPage(page + 1)}>{page + 1}</Button>
        </li>
      )}

      {page + 2 < totalPages && (
        <li>
          <Button onClick={() => setPage(page + 2)}>{page + 2}</Button>
        </li>
      )}

      {page + 3 < totalPages && (
        <li>
          <span>...</span>
        </li>
      )}

      {totalPages > 3 && (
        <li>
          <Button
            onClick={() => setPage(totalPages)}
            isActive={page === totalPages}
          >
            {totalPages}
          </Button>
        </li>
      )}
    </Container>
  );
}
