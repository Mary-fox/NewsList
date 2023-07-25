import React, { useEffect } from "react";
import { observer } from "mobx-react";
import CommentItem from "./CommentItem";

interface HackerNewsCommentsProps {
  comments: number[];
  handleLoadingComments: (id: number) => void;
  refreshFlag: boolean;
}

const Comments: React.FC<HackerNewsCommentsProps> = observer(
  ({ comments, handleLoadingComments, refreshFlag }) => {
    useEffect(() => {
      const intervalId = setInterval(() => {
        comments.forEach((commentId) => handleLoadingComments(commentId));
        console.log("render");
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
            handleLoadingComments={handleLoadingComments}
            refreshFlag={refreshFlag}
          />
        ))}
      </>
    );
  },
);

export default Comments;
