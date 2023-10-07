import {FC} from "react";
import styled from "styled-components";

import {baseTheme} from "src/styles/theme";
import {formatData} from "src/shared/utils/dateFormater";
import {ResponseAuthor} from "src/shared/types/types";
import {CommentLikes} from "../../CommentLikes/CommentLikes";

interface CommentAuthorProps {
    created: Date | string;
    likes: number;
    authorInfo: ResponseAuthor | undefined;
    commentId: number;
}

const AuthorInfoContainer = styled.div`
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
`;

const Avatar = styled.img`
    width: 68px;
    height: 68px;
    object-fit: cover;
    border-radius: 50%;
    @media ${({theme}) => theme.media.medium} {
        width: 40px;
        height: 40px;
    }
`;

const CommentHeader = styled.div`
    flex-grow: 1;
    margin-left: 20px;
`;

const AuthorTitle = styled.p`
    font-style: normal;
    font-weight: 700;
    line-height: 22px; /* 137.5% */
    margin: 0;
`;

const Date = styled.p`
    color: ${baseTheme.colors.secondary};
    margin-top: 4px;
    margin-bottom: 0;
`;

export const CommentAuthor: FC<CommentAuthorProps> = ({
    created,
    likes,
    authorInfo,
    commentId,
}) => {
    const authorName = authorInfo ? authorInfo.name : "Unknown";
    const authorAvatar = authorInfo ? authorInfo.avatar : "Unknown";

    const formatedData = formatData(created);
    return (
        <AuthorInfoContainer>
            <Avatar src={authorAvatar} alt={authorName} />
            <CommentHeader>
                <AuthorTitle>{authorName}</AuthorTitle>
                <Date>{formatedData}</Date>
            </CommentHeader>
            <CommentLikes countLikes={likes} commentId={commentId} />
        </AuthorInfoContainer>
    );
};
