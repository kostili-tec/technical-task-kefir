import {FC} from "react";
import styled, {css} from "styled-components";
import {observer} from "mobx-react-lite";

import CommentsStore from "src/store/CommentsStore";
import {ResponseCommentData} from "src/shared/types/types";
import {CommentAuthor} from "./CommentAuthor/CommentAuthor";

const CommentContainer = styled.div<{$marginleft: string}>`
    margin-top: 16px;
    margin-left: ${({$marginleft}) => $marginleft};

    @media (max-width: 720px) {
        ${({$marginleft}) =>
            $marginleft === "34px"
                ? css`
                      margin-left: 20px;
                  `
                : ""};
    }
`;

const CommentText = styled.p`
    padding-left: 88px;
    word-break: break-word;
    @media ${({theme}) => theme.media.medium} {
        padding-left: 60px;
    }
`;

export const CommentItem: FC<ResponseCommentData> = observer(
    ({author, text, created, likes, parent, id}) => {
        const marginValue = parent ? "34px" : "0";
        const isHaveMargin = !!parent;
        console.log(id, isHaveMargin);
        const authorInfo = CommentsStore.getAuthor(author);
        return (
            <CommentContainer $marginleft={marginValue}>
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
