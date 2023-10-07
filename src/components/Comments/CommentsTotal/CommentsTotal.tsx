import {FC} from "react";
import styled from "styled-components";
import {observer} from "mobx-react-lite";

import CommentsStore from "src/store/CommentsStore";
import {CommentLikes} from "../CommentLikes/CommentLikes";

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

export const CommentsTotal: FC = observer(() => {
    return (
        <>
            {CommentsStore.comments.length && (
                <TotalContainer>
                    <Comments>{`${CommentsStore.total.totalComments} comments`}</Comments>
                    <CommentLikes countLikes={CommentsStore.total.totalLikes} />
                </TotalContainer>
            )}
        </>
    );
});
