import {FC} from "react";
import styled from "styled-components";

import {CommentLikes} from "../CommentLikes/CommentLikes";

interface CommentsTotalProps {
    countComments: number;
    countLikes: number;
}

const TotalContainer = styled.div`
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    border-bottom: 1px solid #767676;
    padding-bottom: 10px;
    margin-bottom: 32px;
`;
const Comments = styled.span`
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px; /* 137.5% */
`;

export const CommentsTotal: FC<CommentsTotalProps> = ({
    countComments,
    countLikes,
}) => {
    return (
        <TotalContainer>
            <Comments>{`${countComments} comments`}</Comments>
            <CommentLikes countLikes={countLikes} />
        </TotalContainer>
    );
};
