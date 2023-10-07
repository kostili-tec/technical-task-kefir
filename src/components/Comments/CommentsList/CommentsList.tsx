import styled from "styled-components";
import {useState, useEffect, useMemo} from "react";

import {CommentItem} from "../CommentItem/CommentItem";
import {LoadButton} from "../../LoadButton/LoadButton";
import {CommentsTotal} from "../CommentsTotal/CommentsTotal";
import getAuthorsRequest from "src/api/authors/getAuthorsRequest";
import getCommentsRequest from "src/api/comments/getCommentsRequest";
import fetchCommentsWithRetry from "src/shared/utils/fetchCommentsWithRetry";
import {sortCommentsByParent} from "src/shared/utils/sortComments";
import {
    ResponseAuthor,
    ResponseCommentData,
    ResponseCommentPagination,
    ResponseComments,
} from "src/shared/types/types";

const List = styled.div`
    max-width: 562px;
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
`;

export const CommentsList = () => {
    const [comments, setComments] = useState<ResponseCommentData[]>([]);
    const [pagination, setPagination] = useState<ResponseCommentPagination>();
    const [authors, setAuthors] = useState<ResponseAuthor[]>([]);
    const [buttonProperties, setButtonProperties] = useState({
        isDisabled: false,
        isVisible: false,
    });
    const [total, setTotal] = useState({
        totalComments: 0,
        totalLikes: 0,
    });

    const startPage = 1;

    const cachedAuthors = useMemo(() => authors, [authors]);
    const findAuthor = (id: number) =>
        cachedAuthors.find((author) => author.id === id);

    const calculateLikes = (comments: ResponseCommentData[]) => {
        const currentCountLikes = comments.reduce(
            (total, comment) => total + comment.likes,
            0,
        );
        const prevCountLikes = total.totalLikes;
        setTotal((state) => ({
            ...state,
            totalLikes: currentCountLikes + prevCountLikes,
        }));
    };
    const calculateComments = (comments: ResponseCommentData[]) => {
        const currentCountComments = comments.length;
        const prevCountComments = total.totalComments;
        setTotal((state) => ({
            ...state,
            totalComments: currentCountComments + prevCountComments,
        }));
    };

    const handleLoadMoreComments = async () => {
        setButtonProperties((state) => ({...state, isDisabled: true}));
        if (pagination) {
            const {page, total_pages} = pagination;
            if (page < total_pages) {
                const nextPage = pagination.page + 1;
                const fetchedComments = await fetchCommentsWithRetry(nextPage);

                if (fetchedComments) {
                    const {data, pagination} = fetchedComments;
                    const sortedComments = sortCommentsByParent(data);

                    setComments((state) => [...state, ...sortedComments]);
                    calculateComments(data);
                    calculateLikes(data);
                    setPagination(pagination);
                    setButtonProperties((state) => ({
                        ...state,
                        isDisabled: false,
                    }));

                    if (pagination.page === total_pages)
                        setButtonProperties((state) => ({
                            ...state,
                            isVisible: false,
                        }));
                }
            }
        }
    };

    useEffect(() => {
        const getComments = async () => {
            const commentsReposonse: ResponseComments =
                await getCommentsRequest(startPage);
            const sortedComments = sortCommentsByParent(commentsReposonse.data);

            setComments(sortedComments);
            setPagination(commentsReposonse.pagination);

            const currentCountLikes = commentsReposonse.data.reduce(
                (total, comment) => total + comment.likes,
                0,
            );
            setTotal({
                totalComments: commentsReposonse.data.length,
                totalLikes: currentCountLikes,
            });

            const {page, total_pages} = commentsReposonse.pagination;
            if (page < total_pages)
                setButtonProperties((state) => ({...state, isVisible: true}));
            else setButtonProperties((state) => ({...state, isVisible: false}));
        };
        const getAuthors = async () => {
            const authorsResponse = await getAuthorsRequest();
            setAuthors(authorsResponse);
        };
        getComments();
        getAuthors();
    }, []);

    return (
        <List>
            <CommentsTotal
                countComments={total.totalComments}
                countLikes={total.totalLikes}
            />
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
        </List>
    );
};
