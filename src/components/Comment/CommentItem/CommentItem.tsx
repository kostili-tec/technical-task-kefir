import {FC} from "react";
import styled from "styled-components";

import {ResponseAuthor} from "../../../shared/types/types";
import { LikeIcon } from "../../Icons/LikeIcon";

interface CommentItemProps {
    id: number;
    created: string | Date;
    text: string;
    author: number;
    parent: null | number;
    likes: number;
    getAuthor: (id: number) => ResponseAuthor | undefined;
}

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

const UpContainer = styled.div`
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
`;

const LikesContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 15px;
    font-weight: 700;
    line-height: 150%; /* 22.5px */
`

export const CommentItem: FC<CommentItemProps> = ({
    author,
    text,
    getAuthor,
    created,
    likes,
}) => {
    const authorInfo = getAuthor(author);
    return (
        <div>
            <UpContainer>
                {authorInfo && (
                    <AvatarContainer>
                        {" "}
                        <Avatar src={authorInfo.avatar} />
                    </AvatarContainer>
                )}
                <div style={{flexGrow: 1}}>
                    {authorInfo && <p>{authorInfo.name}</p>}
                    {authorInfo && <p>{String(created)}</p>}
                </div>
                <LikesContainer>
                    <LikeIcon />
                    <span>{likes}</span>
                </LikesContainer>
            </UpContainer>
            <p style={{paddingLeft: 88}}>{text}</p>
        </div>
    );
};
