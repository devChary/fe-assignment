import React, { useEffect, useState } from 'react';

/* Components */
import { LineChart, EmptyState } from 'components';
import Destinations from './Destinations';
import Timeline from './Timeline';

/* utils | Assets */
import { useQuery } from 'utils';
import EmptyFolderIcon from '/src/assets/empty_folder.png';

/* Styles */
import { Wrapper, HeaderWrapper, DateWrap, InnerWrap, EmptyStateWrap } from './styled';

const MarketPrices = () => {
    const [originPort, setOriginPort] = useState('');
    const [destinationPort, setDestinationPort] = useState('');
    const [isverifiedPortCodes, setIsVerifiedPortCodes] = useState(false);
    const [emptyState, setShowEmptyState] = useState(false);
    const [range, setRange] = useState('high'); /* Can further extend funtionality where multiple ranges can be selected which leads to the graph changes */

    const { data: marketRates, error, isError, isLoading, refetch } = useQuery({ 
            query: 'rates', 
            params: { origin: originPort?.code, destination: destinationPort?.code }, 
            enabled: isverifiedPortCodes
        });
    
    const startDate = marketRates?.[0]?.day;
    const endDate = marketRates?.[marketRates?.length - 1]?.day;

    const marketRatesArrLength = marketRates?.length;

    useEffect(() => {
        if (marketRates?.length > 0) {
            const hasNoMarketRates = marketRates?.every(item => !item.high && !item.low && !item.mean); 
            if (hasNoMarketRates) setShowEmptyState(true);
        }
    }, [marketRates]);

    useEffect(() => {
        const bothPortsSelected = originPort?.code && destinationPort?.code;
        if (bothPortsSelected) {
            refetch();
            setIsVerifiedPortCodes(true);
        }
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

           {!emptyState && marketRatesArrLength > 0 && 
                <>
                    {/* This will essentially be a date picker, just adding for visual ref */}
                    <DateWrap>{startDate} - {endDate}</DateWrap>
                    <InnerWrap>
                        <LineChart marketRates={marketRates} emptyState={emptyState} range={range} />
                    </InnerWrap>
                    <Timeline startDate={startDate} endDate={endDate} />
                </>
            }
            
            {((!marketRatesArrLength || emptyState) && isverifiedPortCodes && !isLoading) && <EmptyStateWrap>
                <EmptyState 
                    icon={EmptyFolderIcon} 
                    title="No data found!"
                    subTitle="No market prices avaialable for the selected ports. Please try again selecting different ports."
                />
            </EmptyStateWrap>}
        </Wrapper>
    )
}

export default MarketPrices;