import styled from "styled-components";
import {useState, useEffect} from "react";
import {ResponseAuthor, ResponseCommentData} from "../../../shared/types/types";
import {CommentItem} from "../CommentItem/CommentItem";
import getAuthorsRequest from "../../../api/authors/getAuthorsRequest";
import getCommentsRequest from "../../../api/comments/getCommentsRequest";

const Container = styled.div`
    max-width: 562px;
    display: flex;
    flex-direction: column;
`;

export const CommentsContainer = () => {
    const [comments, setComments] = useState<ResponseCommentData[]>([]);
    const [authors, setAuthors] = useState<ResponseAuthor[]>([]);
    let page = 1;
    useEffect(() => {
        const getComments = async () => {
            const commentsReposonse = await getCommentsRequest(page);
            setComments(commentsReposonse.data);
            console.log(commentsReposonse);
        };
        const getAuthors = async () => {
            const authorsResponse = await getAuthorsRequest();
            setAuthors(authorsResponse);
            console.log(authorsResponse);
        }
        getComments();
        getAuthors();
    }, []);
    return (
        <Container>
            {comments &&
                comments.map((item) => <CommentItem key={item.id} {...item} />)}
        </Container>
    );
};
