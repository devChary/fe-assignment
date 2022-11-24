import React, { useState } from 'react';

import SearchInput from 'components/SearchInput';
import Arrow from '/src/assets/arrow-symbol.png';
import GlobeIcon from '/src/assets/globe.png';

/* utils */
import { useQuery } from 'utils';

/* Styles */
import { PortSelectionWrapper, ArrowImg } from './styled';

const Destinations = ({ setOriginPort, setDestinationPort }) => {
    const { data: portsData, error, isError, isLoading } = useQuery({ query : 'ports' });

    const [query1, setQuery1] = useState('');
    const [query2, setQuery2] = useState('');

    return <>
        <PortSelectionWrapper>
           <SearchInput 
                id="origin"    
                name="origin"
                query={query1} 
                icon={GlobeIcon}
                placeholder="Enter Origin"
                data={portsData} 
                handleChange={(event) => setQuery1(event.target.value)} 
                handleClick={(port) => {
                    setQuery1(`${port.name} (${port.code})`)
                    setOriginPort(port)
                }} 
            />
            <ArrowImg alt="arrow" src={Arrow} />
            <SearchInput 
                id="destination"
                name="destination"    
                query={query2} 
                icon={GlobeIcon}
                placeholder="Enter Destination" 
                data={portsData} 
                handleChange={(event) => setQuery2(event.target.value)} 
                handleClick={(port) => {
                    setQuery2(`${port.name} (${port.code})`)
                    setDestinationPort(port)
                }} 
            />
        </PortSelectionWrapper>
       
    </>
}

export default Destinations;