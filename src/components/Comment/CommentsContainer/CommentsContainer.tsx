import styled from "styled-components";
import {useState, useEffect, useMemo} from "react";

import {
    ModifiedComment,
    ResponseAuthor,
    ResponseCommentPagination,
    ResponseComments,
} from "../../../shared/types/types";
import {CommentItem} from "../CommentItem/CommentItem";
import getAuthorsRequest from "../../../api/authors/getAuthorsRequest";
import getCommentsRequest from "../../../api/comments/getCommentsRequest";
import createCommentTree from "../../../shared/utils/createComentTree";
import {LoadButton} from "../../LoadButton/LoadButton";
import fetchCommentsWithRetry from "../../../shared/utils/fetchCommentsWithRetry";

const Container = styled.div`
    max-width: 562px;
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
`;

export const CommentsContainer = () => {
    const [comments, setComments] = useState<ModifiedComment[]>([]);
    const [pagination, setPagination] = useState<ResponseCommentPagination>();
    const [authors, setAuthors] = useState<ResponseAuthor[]>([]);
    const [buttonProperties, setButtonProperties] = useState({
        isDisabled: false,
        isVisible: false
    });

    const startPage = 1;

    const cachedAuthors = useMemo(() => authors, [authors]);
    const findAuthor = (id: number) =>
        cachedAuthors.find((author) => author.id === id);

    const handleLoadMoreComments = async () => {
        setButtonProperties((state) => ({...state, isDisabled: true}));
        if (pagination) {
            const {page, total_pages} = pagination;
            if (page < total_pages) {
                const nextPage = pagination.page + 1;
                const fetchedComments = await fetchCommentsWithRetry(nextPage);
                if (fetchedComments) {
                    const {data, pagination} = fetchedComments;
                    const modifiedComments = createCommentTree(data);
                    setComments((state) => [...state, ...modifiedComments]);
                    setPagination(pagination);
                    setButtonProperties((state) => ({...state, isDisabled: false}));
                    if (pagination.page === total_pages)
                    setButtonProperties((state) => ({...state, isVisible: false}));
                }
            }
        }
    };

    useEffect(() => {
        const getComments = async () => {
            const commentsReposonse: ResponseComments =
                await getCommentsRequest(startPage);
            const modifiedComments = createCommentTree(commentsReposonse.data);
            setComments(modifiedComments);
            setPagination(commentsReposonse.pagination);
            const {page, total_pages} = commentsReposonse.pagination;
            if (page < total_pages) setButtonProperties((state) => ({...state, isVisible: true}));
            else setButtonProperties((state) => ({...state, isVisible: false}));
        };
        const getAuthors = async () => {
            const authorsResponse = await getAuthorsRequest();
            setAuthors(authorsResponse);
            console.log(authorsResponse);
        };
        getComments();
        getAuthors();
    }, []);

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
            <LoadButton
                isVisible={buttonProperties.isVisible}
                isDisabled={buttonProperties.isDisabled}
                onClick={handleLoadMoreComments}
            />
        </Container>
    );
};
