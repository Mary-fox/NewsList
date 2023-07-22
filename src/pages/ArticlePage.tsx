import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import ArticlesStore from "../ArticlesStore";

const ArticlePage: React.FC = observer(() => {
  const { storyId } = useParams<{ storyId: string }>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = Number(storyId);
    ArticlesStore.fetchStory(id).then(() => setLoading(false)); //загружаем данные и ставим false лоадеру
    ArticlesStore.fetchComments(id);
  }, [storyId]);

  const story = ArticlesStore.articlesList.find(
    (item) => item.id === Number(storyId),
  );
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!story) {
    return <div> Статья не найдена. Можно добавить страницу об ошибке еще</div>;
  }
  return (
    <div>
      <h1>{story.title}</h1>
    </div>
  );
});

export default ArticlePage;
