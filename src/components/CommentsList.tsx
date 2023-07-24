import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import ArticlesStore from "../ArticlesStore";

interface HackerNewsCommentsProps {
  comments: number[];
  handleLoadingComments: (id: number) => void;
  refreshFlag: boolean;
}

const Comments: React.FC<HackerNewsCommentsProps> = observer(
  ({ comments, handleLoadingComments, refreshFlag }) => {
    const [expandedComments, setExpandedComments] = useState<number[]>([]);

    useEffect(() => {
      const intervalId = setInterval(() => {
        comments.forEach((commentId) => handleLoadingComments(commentId));
      }, 60000);

      return () => {
        clearInterval(intervalId);
      };
    }, [refreshFlag]);

    console.log("render");
    const toggleCommentExpansion = (commentId: number) => {
      setExpandedComments((prevExpanded) =>
        prevExpanded.includes(commentId)
          ? prevExpanded.filter((id) => id !== commentId)
          : [...prevExpanded, commentId],
      );
    };

    return (
      <>
        {comments?.map((commentId) => {
          const comment = ArticlesStore.comments[commentId];
          if (!comment || !comment.text || comment.text === "[dead]")
            return null;

          const isExpanded = expandedComments.includes(commentId);
          const hasKids = comment.kids && comment.kids.length > 0;

          return (
            <div style={{ border: "1px solid white" }} key={comment.id}>
              <div onClick={() => toggleCommentExpansion(commentId)}>
                {isExpanded ? "-" : "+"} {comment.by} {comment.text}
              </div>
              {isExpanded && hasKids && (
                <div>
                  <Comments
                    comments={comment.kids ?? []}
                    handleLoadingComments={handleLoadingComments}
                    refreshFlag={refreshFlag}
                  />
                </div>
              )}
            </div>
          );
        })}
      </>
    );
  },
);

export default Comments;
