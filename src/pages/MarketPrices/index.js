import React from 'react';

/* Components */
import Destinations from './Destinations';
import Timeline from './Timeline';

/* Styles */
import { Wrapper } from './styled';

const MarketPrices = () => {
    const startDate = '20-11-2022';
    const endDate = '25-12-2022';

    return (
        <Wrapper>
            <Destinations />
            <Timeline startDate={startDate} endDate={endDate} />
        </Wrapper>
    )
}

export default MarketPrices;