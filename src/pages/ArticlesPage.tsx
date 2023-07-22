import React, { useEffect } from "react";
import { ArticlesList } from "../ArticlesStore";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import ArticlesStore from "../ArticlesStore";
import Navbar from "../components/Navbar/Navbar";

const ArticlesPage: React.FC = observer(() => {
  useEffect(() => {
    ArticlesStore.refreshArticles();

    const intervalId = setInterval(() => {
      ArticlesStore.refreshArticles();
      console.log("render"); // Обновляем новости каждую минуту
    }, 60000);

    return () => {
      clearInterval(intervalId); // Очищаем интервал
    };
  }, []);
  console.log("ArticlesPage rendered");
  return (
    <div>
      <Navbar />
      <h1>News</h1>
      {ArticlesStore.loading ? (
        <div>Загрузка статей...</div>
      ) : (
        ArticlesStore.articlesList.map((story: ArticlesList) => (
          <div key={story.id}>
            <h2>{story.title}</h2>
            <p>Author: {story.by}</p>
            <p>Rating: {story.score}</p>

            <p>
              Date:{" "}
              {story.time ? new Date(story.time * 1000).toUTCString() : ""}
            </p>
            <p>Comments: {story.descendants}</p>
            <Link to={`/article/${story.id}`}>Read more</Link>
            <hr />
          </div>
        ))
      )}
    </div>
  );
});

export default ArticlesPage;
