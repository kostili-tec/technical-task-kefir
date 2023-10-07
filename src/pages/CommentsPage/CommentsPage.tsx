import styled from "styled-components";

import {CommentsList} from "src/components/Comments/CommentsList/CommentsList";

const Page = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const CommentsPage = () => {
    return (
        <Page>
            <CommentsList />
        </Page>
    );
};
