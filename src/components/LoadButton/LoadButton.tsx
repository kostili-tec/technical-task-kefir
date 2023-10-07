import styled from "styled-components";
import {observer} from "mobx-react-lite";

import CommentsStore from "src/store/CommentsStore";
import {baseTheme} from "src/styles/theme";
import {FC} from "react";
import {LoadingState} from "../../shared/types/types";

interface LoadButtonStyledProps {
    $isVisible: boolean;
}

const Button = styled.button<LoadButtonStyledProps>`
    width: 234px;
    height: 36px;
    border: none;
    border-radius: 4px;
    background: ${baseTheme.colors.gray};
    backdrop-filter: blur(13.5px);
    color: ${baseTheme.colors.primary};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
    margin: 60px auto 64px;
    cursor: pointer;
    display: ${({$isVisible}) => ($isVisible ? "block" : "none")};
`;

export const LoadButton: FC = observer(() => {
    return (
        <Button
            $isVisible={CommentsStore.comments.length ? true : false}
            disabled={
                CommentsStore.stateData === LoadingState.DONE ? false : true
            }
            onClick={() => CommentsStore.handleLoadComments()}
        >
            Load more
        </Button>
    );
});
