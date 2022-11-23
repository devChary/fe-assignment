import React, { useEffect, useState } from 'react';

/* Components */
import Destinations from './Destinations';
import Timeline from './Timeline';

/* utils */
import { useQuery } from '../../utils';

/* Styles */
import { Wrapper } from './styled';

const MarketPrices = () => {
    const startDate = '20-11-2022';
    const endDate = '25-12-2022';

    const [originPort, setOriginPort] = useState('');
    const [destinationPort, setDestinationPort] = useState('');
    const [isverifiedPortCodes, setIsVerifiedPortCodes] = useState(false);

    const { data: marketRates, error, isError, isLoading } = useQuery({ 
            query: 'rates', 
            params: { origin: originPort?.code, destination: destinationPort?.code }, 
            enabled: isverifiedPortCodes
        });
    
    useEffect(() => {
        if (originPort?.code && destinationPort?.code) setIsVerifiedPortCodes(true);
    }, [originPort, destinationPort])

    return (
        <Wrapper>
            <Destinations
              setOriginPort={setOriginPort} 
              setDestinationPort={setDestinationPort} 
            />
            <Timeline startDate={startDate} endDate={endDate} />
        </Wrapper>
    )
}

export default MarketPrices;