import React, { useState } from "react";
import { action } from "mobx";
import { observer } from "mobx-react";
import styled from "styled-components";
import ArticlesStore, { ArticlesList } from "../store/ArticlesStore";
import Comments from "../components/Comments";

const ArticleWrapper = styled.div`
  color: white;
  padding: 20px;
`;
const ArticleHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ArticleLink = styled.a`
  color: white;
  font-size: 20px;
  background-color: rgba(57, 57, 57, 0.5);
  border-radius: 10%;
  padding: 5px;
  &:hover {
    color: #cdcd3cd1;
    cursor: pointer;
  }
`;

const ArticleItem: React.FC<{ story: ArticlesList }> = observer(({ story }) => {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const handleRefreshComments = action(() => {
    ArticlesStore.fetchArticleComments(story.id); // Обновляем все комментарии
    setRefreshFlag(!refreshFlag);
  });

  return (
    <ArticleWrapper>
      <ArticleHeader>
        <p>Author: {story.by}</p>
        <p>{story.time ? new Date(story.time * 1000).toUTCString() : ""}</p>
      </ArticleHeader>
      <h1>{story.title}</h1>
      <ArticleLink href={story.url} target="_blank" rel="noopener noreferrer">
        Open the article
      </ArticleLink>
      <p>Comments: {story.descendants}</p>
      <button onClick={handleRefreshComments}>Обновить комментарии</button>
      <Comments comments={story.kids ?? []} refreshFlag={refreshFlag} />
    </ArticleWrapper>
  );
});

export default ArticleItem;
