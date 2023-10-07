import {FC} from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
import styled from "styled-components";

interface PackmanSpinnerProps {
    isAbsolute?: boolean;
}

const SpinnerAbsolute = styled.div`
    position: absolute;
    height: 100vh;
    width: 100vw;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SpinnerInline = styled.div`
    display: block;
`;

export const PackmanSpinner: FC<PackmanSpinnerProps> = ({isAbsolute}) => {
    return (
        <>
            {isAbsolute ? (
                <SpinnerAbsolute>
                    <PacmanLoader color="#e6eb00" size={40} />
                </SpinnerAbsolute>
            ) : (
                <SpinnerInline>
                    <PacmanLoader color="#e6eb00" size={25} />
                </SpinnerInline>
            )}
        </>
    );
};
