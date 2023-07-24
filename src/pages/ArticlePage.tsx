import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import ArticlesStore from "../ArticlesStore";

import Navbar from "../components/Navbar/Navbar";
import Comments from "../components/CommentsList";

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
  if (!story) {
    return <div> Статья не найдена. Можно добавить страницу об ошибке еще</div>;
  }

  const handleRefreshComments = () => {
    ArticlesStore.refreshComments(); // Обновляем все комментарии
    setRefreshFlag(!refreshFlag); // Toggle the refreshFlag to trigger re-render of Comments component
  };

  return (
    <div>
      <Navbar />
      {ArticlesStore.loading ? (
        <div>Загрузка статей...</div>
      ) : (
        <div>
          <div>
            <p>Author: {story.by}</p>
            <p>{story.time ? new Date(story.time * 1000).toUTCString() : ""}</p>
          </div>
          <h1>{story.title}</h1>
          <a href={story.url} target="_blank" rel="noopener noreferrer">
            Read the article
          </a>
          <p>Comments: {story.descendants}</p>
          <button onClick={handleRefreshComments}>Обновить комментарии</button>
          <Comments
            comments={story.kids ?? []}
            handleLoadingComments={(id) => ArticlesStore.fetchStory(id)}
            refreshFlag={refreshFlag}
          />
        </div>
      )}
    </div>
  );
});

export default ArticlePage;
