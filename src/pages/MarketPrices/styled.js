import styled from 'styled-components';

export const Wrapper = styled.div`
    background-color: var(--grayscale-0);

`;

export const HeaderWrapper = styled.div`
    width: 100%;
    padding-left: 48px;
    border-bottom: 1px solid var(--grayscale-200);
    h2 {
        text-transform: uppercase;
        display: inline-block;
        color: var(--grayscale-1000);
        font-size: 1.25rem;
        border-bottom: 3px solid var(--primary-color);
    }
`;

export const DateWrap = styled.div`
    display: inline-block;
    color: var(--grayscale-800);
    border: 1px solid var(--grayscale-400);
    padding: 6px 12px;
    margin: 36px 48px;
`;

export const InnerWrap = styled.div`
    display: flex;
    justify-content: space-between;
`;
export const FiltersWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-right: 36px;
`;

export const DataPoints = styled.div`
    background-color: var(--primary-button-color);
    border-radius: 4px;
    width: 100%;
    max-width: 216px;
    padding: 12px 0;
    color: white;
    text-align: center;
    font-size: 0.875rem;
`;