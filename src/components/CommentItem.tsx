import React, { useState } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import ArticlesStore from "../ArticlesStore";
import Comments from "./Comments";

const CommentWrapper = styled.div`
  border: 1px solid white;
  padding: 20px;
`;
const CommentHeader = styled.h2`
  display: flex;
  justify-content: space-between;
`;
const CommentAuthor = styled.h2`
  font-size: 20px;
`;
const CommentDate = styled.p`
  font-size: 10px;
`;

interface CommentItemProps {
  commentId: number;
  refreshFlag: boolean;
}

const CommentItem: React.FC<CommentItemProps> = observer(
  ({ commentId, refreshFlag }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleCommentExpansion = () => {
      setExpanded((prevExpanded) => !prevExpanded);
    };

    const comment = ArticlesStore.comments[commentId];
    if (!comment || !comment.text || comment.text === "[dead]") return null;

    const hasKids = comment.kids && comment.kids.length > 0;

    return (
      <CommentWrapper>
        <div onClick={toggleCommentExpansion}>
          {expanded ? "-" : "+"}
          <CommentHeader>
            <CommentAuthor>{comment.by}</CommentAuthor>
            <CommentDate>
              {comment.time ? new Date(comment.time * 1000).toUTCString() : ""}
            </CommentDate>
          </CommentHeader>
          <div dangerouslySetInnerHTML={{ __html: comment.text }} />
        </div>
        {expanded && hasKids && (
          <ul>
            <Comments comments={comment.kids ?? []} refreshFlag={refreshFlag} />
          </ul>
        )}
      </CommentWrapper>
    );
  },
);

export default CommentItem;
