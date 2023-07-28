import React from "react";
import { observer } from "mobx-react";
import { ArticlesList } from "../store/ArticlesStore";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import styled from "styled-components";

const CoverWrapper = styled.div`
  border-bottom: 1px solid white;
  color: white;
  padding: 20px;
`;
const CoverHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StyledLink = styled(Link)`
  color: white;
  font-size: 15px;
  text-decoration: none;
`;

const ArticleCover: React.FC<{ story: ArticlesList }> = observer(
  ({ story }) => {
    return (
      <StyledLink to={`/article/${story.id}`}>
        <CoverWrapper key={story.id}>
          <CoverHeader>
            <p>Author: {story.by}</p>
            <p>{story.time ? new Date(story.time * 1000).toUTCString() : ""}</p>
          </CoverHeader>
          <h2>{story.title}</h2>
          <StarRating rating={story.score || 0} maxRating={5} />
          <p>Comments: {story.descendants}</p>
          {/* <StyledLink to={`/article/${story.id}`}>Read more</StyledLink> */}
        </CoverWrapper>
      </StyledLink>
    );
  },
);
export default ArticleCover;
