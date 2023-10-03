import styled from "styled-components";
import {CommentsContainer} from "../../components/Comment/CommentsContainer/CommentsContainer";

const Page = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const CommentsPage = () => {
    return (
        <Page>
            <CommentsContainer />
        </Page>
    );
};
