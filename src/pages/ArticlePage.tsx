import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { action } from "mobx";
import { observer } from "mobx-react";
import styled from "styled-components";
import ArticlesStore from "../ArticlesStore";
import Navbar from "../components/Navbar";
import Comments from "../components/Comments";
import Loader from "../components/Loader";
import ErrorPage from "./ErrorPage";

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

const ArticlePage: React.FC = observer(() => {
  const { storyId } = useParams<{ storyId: string }>();
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    const id = Number(storyId);
    ArticlesStore.fetchStory(id);
  }, [storyId]);

  const story = ArticlesStore.articlesList.find(
    (item) => item.id === Number(storyId),
  );
  if (ArticlesStore.loading) {
    return <Loader />;
  } else if (ArticlesStore.error) {
    return <ErrorPage />;
  }

  if (!story) {
    return <ErrorPage />;
  }
  const handleRefreshComments = action(() => {
    ArticlesStore.fetchArticleComments(story.id); // Обновляем все комментарии
    setRefreshFlag(!refreshFlag);
  });

  return (
    <div>
      <Navbar />
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
    </div>
  );
});

export default ArticlePage;
