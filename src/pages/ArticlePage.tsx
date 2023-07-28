import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import ArticlesStore from "../store/ArticlesStore";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import ErrorPage from "./ErrorPage";
import ArticleItem from "../components/ArticleItem";

const ArticlePage: React.FC = observer(() => {
  const { storyId } = useParams<{ storyId: string }>();

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

  return (
    <div>
      <Navbar />
      <ArticleItem story={story} />
    </div>
  );
});

export default ArticlePage;
