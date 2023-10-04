import styled from "styled-components";
import {useState, useEffect, useMemo} from "react";

import {ModifiedComment, ResponseAuthor} from "../../../shared/types/types";
import {CommentItem} from "../CommentItem/CommentItem";
import getAuthorsRequest from "../../../api/authors/getAuthorsRequest";
import getCommentsRequest from "../../../api/comments/getCommentsRequest";
import createCommentTree from "../../../shared/utils/createComentTree";
import { LoadButton } from "../../LoadButton/LoadButton";

const Container = styled.div`
    max-width: 562px;
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
`;

export const CommentsContainer = () => {
    const [comments, setComments] = useState<ModifiedComment[]>([]);
    const [authors, setAuthors] = useState<ResponseAuthor[]>([]);

    const cachedAuthors = useMemo(() => authors, [authors]);
    const findAuthor = (id: number) =>
        cachedAuthors.find((author) => author.id === id);
    let page = 1;
    useEffect(() => {
        const getComments = async () => {
            const commentsReposonse = await getCommentsRequest(page);
            const modifiedComments = createCommentTree(commentsReposonse.data);
            setComments(modifiedComments);
        };
        const getAuthors = async () => {
            const authorsResponse = await getAuthorsRequest();
            setAuthors(authorsResponse);
            console.log(authorsResponse);
        };
        getComments();
        getAuthors();
    }, [page]);
    return (
        <Container>
            {comments &&
                comments.map((item) => (
                    <CommentItem
                        key={item.id}
                        {...item}
                        getAuthor={findAuthor}
                    />
                ))}
                <LoadButton />
        </Container>
    );
};
