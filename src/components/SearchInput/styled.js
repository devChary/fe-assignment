
import styled, { css, keyframes } from 'styled-components';

export const commonPlaceholderStyles = css`
    font-size: 1rem;
    color: var(--grayscale-200);
`;

export const InputComponent = styled.input`
    padding: 16px;
    margin-bottom: 40px;
    border: none;
    font-size: 1rem;
    color: var(--grayscale-1000);
    border-bottom: 2px solid var(--grayscale-200);
    width: ${props => props.width || '100%'};
    height: ${props => props.height || '50px'};
    &:focus {
        outline: none;
        border-bottom: 2px solid var(--primary-color);
    }
    ::placeholder,
    ::-webkit-input-placeholder {
        ${commonPlaceholderStyles}
    }
    :-ms-input-placeholder {
        ${commonPlaceholderStyles}
    }
`;

export const PortName = styled.div`
    z-index: 10;
    padding: 2px;
    cursor: pointer;
    width: 100%;
    text-align: left;
    padding: 12px 16px;
    font-size: 0.875rem;
`;

const dropDownAnimation = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export const DropDownOptions = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    background: #fff;
    padding: 12px 0px 4px;
    box-shadow: 0px 0px 60px rgba(83, 87, 101, 0.1);
    border-radius: 0 0 4px 4px;
    width: 100%;
    max-height: 250px;
    overflow: auto;
    animation: ${dropDownAnimation} 200ms ease-in-out;
    animation-fill-mode: forwards;
    top: 50px;
    z-index: 1;
`;

export const DropDownOption = styled.div`
    cursor: pointer;
    width: 100%;
    text-align: left;
    border-bottom: 1px solid #eae9e9;
    padding: 12px 16px;
    font-size: 0.875rem;
    &:hover {
        color: #00828a;
    }
    &:active,
    &:focus {
        outline: none;
    }
    &:last-child {
        border-bottom: none;
    }
`;

export const SearchInputWrapper = styled.div`
    width: 100%;
    margin: 20px;
    position: relative;
`;
