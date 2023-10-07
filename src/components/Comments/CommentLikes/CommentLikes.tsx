import {FC, useState} from "react";
import styled from "styled-components";
import {observer} from "mobx-react-lite";

import CommentsStore from "src/store/CommentsStore";
import {ReactComponent as heartFillSVG} from "src/assets/svg/heartSvgfill.svg";
import {ReactComponent as heartSVG} from "src/assets/svg/heartSvg.svg";

interface CommentLikesProps {
    countLikes: number;
    commentId?: number;
}

const LikesContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 15px;
    font-weight: 700;
    line-height: 150%; /* 22.5px */
    @media ${({theme}) => theme.media.medium} {
        font-size: 14px;
    }
`;

const LikesSpan = styled.span`
    font-style: normal;
    font-weight: 700;
    line-height: 150%; /* 22.5px */
`;

const LikeButton = styled.button<{$commentId: number | undefined}>`
    background: none;
    border: none;
    width: 32px;
    cursor: ${({$commentId}) => ($commentId ? "pointer" : "auto")};
`;

const StyledLikeIconFilled = styled(heartFillSVG)`
    width: 22px;
    height: 22px;
    @media ${({theme}) => theme.media.medium} {
        width: 20px;
        height: 20px;
    }
`;
const StyledLikeIcon = styled(heartSVG)`
    width: 22px;
    height: 22px;
    @media ${({theme}) => theme.media.medium} {
        width: 20px;
        height: 20px;
    }
`;

export const CommentLikes: FC<CommentLikesProps> = observer(
    ({countLikes, commentId}) => {
        const [isLiked, setIsLiked] = useState(false);
        const handleLikeClick = () => {
            if (commentId) {
                if (!isLiked) {
                    const isSuccesLike = CommentsStore.likeComment(commentId);
                    setIsLiked(isSuccesLike);
                } else {
                    const isSuccesUnlike =
                        CommentsStore.unlikeComment(commentId);
                    setIsLiked(!isSuccesUnlike);
                }
            }
        };
        return (
            <LikesContainer>
                <LikeButton $commentId={commentId} onClick={handleLikeClick}>
                    {isLiked ? <StyledLikeIconFilled /> : <StyledLikeIcon />}
                </LikeButton>
                <LikesSpan>{countLikes}</LikesSpan>
            </LikesContainer>
        );
    },
);
