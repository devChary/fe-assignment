import styled from 'styled-components';

export const TimelineWrapper = styled.div`
    width: 100%;
    max-width: 1100px;
    display: flex;
    justify-content: space-between;
    align-items: center;    
    margin: 36px 48px;
`;

export const Date = styled.div`
    border: 2px solid var(--grayscale-800);
    padding: 4px 8px;
    border-radius: 4px;
`;

export const Line = styled.div`
    background-color: var(--grayscale-800);
    height: 4px;
    flex: 1
`