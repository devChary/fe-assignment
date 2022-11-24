import React, { useEffect, useState } from 'react';

/* Components */
import Destinations from './Destinations';
import Timeline from './Timeline';
import LineChart from './LineChart';

/* utils */
import { useQuery } from '../../utils';

/* Styles */
import { Wrapper } from './styled';

const MarketPrices = () => {


    const [originPort, setOriginPort] = useState('');
    const [destinationPort, setDestinationPort] = useState('');
    const [isverifiedPortCodes, setIsVerifiedPortCodes] = useState(false);

    const [range, setRange] = useState('high');

    const { data: marketRates, error, isError, isLoading } = useQuery({ 
            query: 'rates', 
            params: { origin: originPort?.code, destination: destinationPort?.code }, 
            enabled: isverifiedPortCodes
        });
    
    const startDate = marketRates?.[0].day;
    const endDate = marketRates?.[marketRates?.length - 1].day;

    useEffect(() => {
        if (originPort?.code && destinationPort?.code) setIsVerifiedPortCodes(true);
    }, [originPort, destinationPort])

    return (
        <Wrapper>
            <Destinations
              setOriginPort={setOriginPort} 
              setDestinationPort={setDestinationPort} 
            />
                <LineChart marketRates={marketRates} range={range} />
                {marketRates?.length > 0 && <Timeline startDate={startDate} endDate={endDate} />}
        </Wrapper>
    )
}

export default MarketPrices;