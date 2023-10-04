import {FC} from "react";
import styled from "styled-components";

import {ModifiedComment, ResponseAuthor} from "../../../shared/types/types";
import {CommentAuthor} from "./CommentAuthor/CommentAuthor";

interface CommentItemProps extends ModifiedComment {
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
    replies,
    depth,
}) => {
    const marginLeftSize = depth === 1 ? 34 : 0;
    return (
        <CommentContainer $marginleft={`${marginLeftSize}px`}>
            <CommentAuthor
                authorId={author}
                created={created}
                getAuthor={getAuthor}
                likes={likes}
            />
            <CommentText>{text}</CommentText>
            {replies &&
                replies.map((reply) => (
                    <CommentItem
                        key={reply.id}
                        getAuthor={getAuthor}
                        {...reply}
                    />
                ))}
        </CommentContainer>
    );
};
