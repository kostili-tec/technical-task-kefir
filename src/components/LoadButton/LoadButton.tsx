import styled from "styled-components";
import {observer} from "mobx-react-lite";

import CommentsStore from "src/store/CommentsStore";
import {baseTheme} from "src/styles/theme";
import {FC} from "react";
import {LoadingState} from "../../shared/types/types";
import {PackmanSpinner} from "../Spinner/PackmanSpinner";

interface LoadButtonStyledProps {
    $isVisible: boolean;
}

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 60px 0 64px;
`;

const Button = styled.button<LoadButtonStyledProps>`
    width: 234px;
    height: 36px;
    border: none;
    border-radius: 4px;
    background: ${baseTheme.colors.grayButton};
    backdrop-filter: blur(13.5px);
    color: ${baseTheme.colors.primary};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
    cursor: pointer;
    display: ${({$isVisible}) => ($isVisible ? "block" : "none")};
    transition: ease-in 0.2s;
    &:hover {
        background: ${baseTheme.colors.grayButtonHover};
    }
`;

export const LoadButton: FC = observer(() => {
    return (
        <ButtonContainer>
            {CommentsStore.stateData === LoadingState.PENDING &&
            CommentsStore.comments.length ? (
                <PackmanSpinner />
            ) : (
                <Button
                    $isVisible={CommentsStore.comments.length ? true : false}
                    disabled={
                        CommentsStore.stateData === LoadingState.DONE
                            ? false
                            : true
                    }
                    onClick={() => CommentsStore.handleLoadComments()}
                >
                    Load more
                </Button>
            )}
        </ButtonContainer>
    );
});
