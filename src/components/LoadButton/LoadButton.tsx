import styled from "styled-components";

import {baseTheme} from "src/styles/theme";
import {FC} from "react";

interface LoadButtonProps {
    onClick: () => Promise<void>;
}

const Button = styled.button`
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
`;

export const LoadButton: FC<LoadButtonProps> = ({onClick}) => {
    return <Button onClick={onClick}>Load more</Button>;
};
