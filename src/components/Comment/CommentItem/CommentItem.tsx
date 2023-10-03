import {FC} from "react";

interface CommentItemProps {
    id: number;
    created: string | Date;
    text: string;
    author: number;
    parent: null | number;
    likes: number;
}

export const CommentItem: FC<CommentItemProps> = ({author, text}) => {
    return (
        <div>
            <p>{author}</p>
            <p>{text}</p>
        </div>
    );
};
