import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import ArticlesStore from "../ArticlesStore";
import Navbar from "../components/Navbar/Navbar";

const ArticlePage: React.FC = observer(() => {
  const { storyId } = useParams<{ storyId: string }>();

  useEffect(() => {
    const id = Number(storyId);
    ArticlesStore.fetchStory(id);
    ArticlesStore.fetchComments(id);
  }, [storyId]);

  const story = ArticlesStore.articlesList.find(
    (item) => item.id === Number(storyId),
  );

  if (!story) {
    return <div> Статья не найдена. Можно добавить страницу об ошибке еще</div>;
  }
  return (
    <div>
      <Navbar />
      {ArticlesStore.loading ? (
        <div>Загрузка статей...</div>
      ) : (
        <h1>{story.title}</h1>
      )}
    </div>
  );
});

export default ArticlePage;
