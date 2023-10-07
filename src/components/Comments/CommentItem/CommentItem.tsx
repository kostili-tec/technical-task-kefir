import {FC} from "react";
import styled from "styled-components";
import {observer} from "mobx-react-lite";

import CommentsStore from "src/store/CommentsStore";
import {ResponseCommentData} from "src/shared/types/types";
import {CommentAuthor} from "./CommentAuthor/CommentAuthor";

const CommentContainer = styled.div<{$marginleft: string}>`
    margin-top: "32px";
    margin-left: ${({$marginleft}) => $marginleft || 0};
`;

const CommentText = styled.p`
    padding-left: 88px;
`;

export const CommentItem: FC<ResponseCommentData> = observer(
    ({author, text, created, likes, parent, id}) => {
        const marginLeftSize = parent !== null ? 34 : 0;
        const authorInfo = CommentsStore.getAuthor(author);
        return (
            <CommentContainer $marginleft={`${marginLeftSize}px`}>
                <CommentAuthor
                    created={created}
                    likes={likes}
                    authorInfo={authorInfo}
                    commentId={id}
                />
                <CommentText>{text}</CommentText>
            </CommentContainer>
        );
    },
);
