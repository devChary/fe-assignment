import React, { useEffect, useState } from 'react';

/* Components */
import LineChart from 'components/LineChart';
import Destinations from './Destinations';
import Timeline from './Timeline';

/* utils */
import { useQuery } from 'utils';

/* Styles */
import { Wrapper, HeaderWrapper, DateWrap, InnerWrap, FiltersWrap, DataPoints } from './styled';

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

    const marketRatesArrLength = marketRates?.length

    useEffect(() => {
        if (originPort?.code && destinationPort?.code) setIsVerifiedPortCodes(true);
    }, [originPort, destinationPort])

    return (
        <Wrapper>
            <Destinations
              setOriginPort={setOriginPort} 
              setDestinationPort={setDestinationPort} 
            />
            {/* Keeping it as a header as no data for trends available or else it would be a tab item */}
            <HeaderWrapper>
                <h2>Benchmarks</h2>
            </HeaderWrapper>

           {marketRatesArrLength > 0 && 
                <>
                        {/* This will essentially be a date picker, just adding for visual ref */}
                        <DateWrap>{startDate} - {endDate}</DateWrap>
                        <InnerWrap>
                            <LineChart marketRates={marketRates} range={range} />
                            <FiltersWrap>
                                <DataPoints>{marketRatesArrLength} points</DataPoints>
                            </FiltersWrap>
                        </InnerWrap>
                        <Timeline startDate={startDate} endDate={endDate} />
                </>
            }
        </Wrapper>
    )
}

export default MarketPrices;