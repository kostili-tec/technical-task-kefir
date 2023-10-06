import {FC} from "react";
import styled from "styled-components";

import {ResponseAuthor, ResponseCommentData} from "../../../shared/types/types";
import {CommentAuthor} from "./CommentAuthor/CommentAuthor";

interface CommentItemProps extends ResponseCommentData {
    getAuthor: (id: number) => ResponseAuthor | undefined;
}

const CommentContainer = styled.div<{$marginleft: string}>`
    margin-top: "32px";
    margin-left: ${(props) => props.$marginleft || 0};
`;

const CommentText = styled.p`
    padding-left: 88px;
`;

export const CommentItem: FC<CommentItemProps> = ({
    author,
    text,
    getAuthor,
    created,
    likes,
    parent,
}) => {
    const marginLeftSize = parent !== null ? 34 : 0;
    return (
        <CommentContainer $marginleft={`${marginLeftSize}px`}>
            <CommentAuthor
                authorId={author}
                created={created}
                getAuthor={getAuthor}
                likes={likes}
            />
            <CommentText>{text}</CommentText>
        </CommentContainer>
    );
};
