import React, { useEffect } from "react";
import { ArticlesList } from "../ArticlesStore";
import { observer } from "mobx-react";
import ArticlesStore from "../ArticlesStore";
import Navbar from "../components/Navbar";
import ArticleCover from "../components/ArticleCover";
import Loader from "../components/Loader";

const ArticlesPage: React.FC = observer(() => {
  useEffect(() => {
    ArticlesStore.refreshArticles();

    const intervalId = setInterval(() => {
      ArticlesStore.refreshArticles();
      console.log("render");
    }, 60000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <Navbar />
      {ArticlesStore.loading ? (
        <Loader />
      ) : (
        ArticlesStore.articlesList.map((story: ArticlesList) => (
          <ArticleCover key={story.id} story={story} />
        ))
      )}
    </div>
  );
});

export default ArticlesPage;
