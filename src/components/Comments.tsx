import React, { useEffect } from "react";
import { observer } from "mobx-react";
import CommentItem from "./CommentItem";
import ArticlesStore from "../ArticlesStore";

interface CommentsProps {
  comments: number[];
  refreshFlag: boolean;
}

const Comments: React.FC<CommentsProps> = observer(
  ({ comments, refreshFlag }) => {
    useEffect(() => {
      const intervalId = setInterval(() => {
        comments.forEach(
          (commentId) => ArticlesStore.fetchArticleComments(commentId),
          console.log("render"),
        );
      }, 60000);
      return () => {
        clearInterval(intervalId);
      };
    }, [refreshFlag]);

    return (
      <>
        {comments?.map((commentId) => (
          <CommentItem
            key={commentId}
            commentId={commentId}
            refreshFlag={refreshFlag}
          />
        ))}
      </>
    );
  },
);

export default Comments;
