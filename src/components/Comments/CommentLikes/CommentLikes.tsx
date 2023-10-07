import {FC, useState} from "react";
import styled from "styled-components";

import {LikeIcon} from "../../Icons/LikeIcon";
import {LikeIconFilled} from "../../Icons/LikeIconFilled";

interface CommentLikesProps {
    countLikes: number;
}

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

const LikeButton = styled.button`
    background: none;
    border: none;
    width: 32px;
    cursor: pointer;
`;

export const CommentLikes: FC<CommentLikesProps> = ({countLikes}) => {
    const [isLiked, setIsLiked] = useState(false);
    const handleLikeClick = () => {
        setIsLiked(!isLiked);
        countLikes = countLikes + 1;
    };
    return (
        <LikesContainer>
            <LikeButton onClick={handleLikeClick}>
                {isLiked ? <LikeIconFilled /> : <LikeIcon />}
            </LikeButton>
            <LikesSpan>{countLikes}</LikesSpan>
        </LikesContainer>
    );
};
