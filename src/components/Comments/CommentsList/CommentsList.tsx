import styled from "styled-components";
import {useEffect} from "react";
import {observer} from "mobx-react-lite";

import CommentsStore from "src/store/CommentsStore";
import {CommentItem} from "../CommentItem/CommentItem";
import {LoadButton} from "../../LoadButton/LoadButton";
import {CommentsTotal} from "../CommentsTotal/CommentsTotal";

const List = styled.div`
    max-width: 562px;
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
`;

export const CommentsList = observer(() => {
    useEffect(() => {
        CommentsStore.loadComments();
    }, []);

    return (
        <List>
            <CommentsTotal />
            {CommentsStore.comments &&
                CommentsStore.comments.map((item) => (
                    <CommentItem key={item.id} {...item} />
                ))}
            <LoadButton />
        </List>
    );
});