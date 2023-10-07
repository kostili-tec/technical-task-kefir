import {FC} from "react";
import styled from "styled-components";

import {LikeIcon} from "../../../Icons/LikeIcon";
import {baseTheme} from "src/styles/theme";
import {formatData} from "src/shared/utils/dateFormater";
import {ResponseAuthor} from "src/shared/types/types";

interface CommentAuthorProps {
    authorId: number;
    created: Date | string;
    likes: number;
    getAuthor: (id: number) => ResponseAuthor | undefined;
}

const AuthorInfoContainer = styled.div`
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
`;

const AvatarContainer = styled.div`
    width: 68px;
    height: 68px;
    position: relative;
    border-radius: 50%;
    overflow: hidden;
`;

const Avatar = styled.img`
    width: 100%;
    height: auto;
`;

const CommentHeader = styled.div`
    flex-grow: 1;
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

const LikesContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 15px;
    font-weight: 700;
    line-height: 150%; /* 22.5px */
`;

const LikesSpan = styled.span`
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; /* 22.5px */
`;

export const CommentAuthor: FC<CommentAuthorProps> = ({
    authorId,
    getAuthor,
    created,
    likes,
}) => {
    const authorInfo = getAuthor(authorId);
    const authorName = authorInfo ? authorInfo.name : "Unknown";
    const authorAvatar = authorInfo ? authorInfo.avatar : "Unknown";

    const formatedData = formatData(created);
    return (
        <AuthorInfoContainer>
            <AvatarContainer>
                <Avatar src={authorAvatar} alt={authorName} />
            </AvatarContainer>
            <CommentHeader>
                <AuthorTitle>{authorName}</AuthorTitle>
                <Date>{formatedData}</Date>
            </CommentHeader>
            <LikesContainer>
                <LikeIcon />
                <LikesSpan>{likes}</LikesSpan>
            </LikesContainer>
        </AuthorInfoContainer>
    );
};
