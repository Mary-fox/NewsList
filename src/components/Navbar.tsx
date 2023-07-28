import React from "react";
import { action } from "mobx";
import { observer } from "mobx-react";
import { Link, useLocation } from "react-router-dom";
import ArticlesStore from "../store/ArticlesStore";
import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";

const NavbarWrapper = styled.div`
  padding: 20px;
  background-color: #cdcd3cd1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 20px;
`;
const Button = styled.button`
  background-color: white;
  color: #cdcd3cd1;
  font-size: 21px;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Navbar: React.FC = observer(() => {
  const location = useLocation();

  // Проверяем, что текущий маршрут соответствует странице статьи
  const isArticlePage = location.pathname.includes("/article/");

  const handleRefresh = action(() => {
    if (isArticlePage) {
      // Выполняем обновление только одной статьи
      const storyId = location.pathname.split("/article/")[1];
      const id = Number(storyId);
      ArticlesStore.refreshArticle(id);
    } else {
      // Выполняем обновление всех статей
      ArticlesStore.refreshArticles();
    }
  });
  return (
    <NavbarWrapper>
      <div>
        {isArticlePage && (
          <Link to="/">
            <FaArrowLeft />
          </Link>
        )}
        <StyledLink to={"/"}>HACKER NEWS</StyledLink>
      </div>

      <Button onClick={handleRefresh}> refresh </Button>
    </NavbarWrapper>
  );
});
export default Navbar;
