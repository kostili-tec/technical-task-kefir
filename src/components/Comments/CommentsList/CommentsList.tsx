import styled from "styled-components";
import {useEffect} from "react";
import {observer} from "mobx-react-lite";

import CommentsStore from "src/store/CommentsStore";
import {CommentItem} from "../CommentItem/CommentItem";
import {LoadButton} from "../../LoadButton/LoadButton";
import {CommentsTotal} from "../CommentsTotal/CommentsTotal";
import {PackmanSpinner} from "../../Spinner/PackmanSpinner";

const List = styled.div`
    max-width: ${({theme}) => theme.sizes.dekstopWidth};
    display: flex;
    flex-direction: column;
    margin: 2rem 20px 0;
`;

export const CommentsList = observer(() => {
    useEffect(() => {
        CommentsStore.loadComments();
    }, []);

    return (
        <List>
            <CommentsTotal />
            {CommentsStore.comments.length > 0 ? (
                CommentsStore.comments.map((item) => (
                    <CommentItem key={item.id} {...item} />
                ))
            ) : (
                <PackmanSpinner isAbsolute={true} />
            )}
            <LoadButton />
        </List>
    );
});
