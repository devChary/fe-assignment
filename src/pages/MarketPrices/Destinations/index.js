import React, { useState } from 'react';

/* Components */
import { SearchInput } from 'components';

/* utils | assets */
import { useQuery } from 'utils';

import Arrow from '/src/assets/arrow-symbol.png';

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
                isLoading={isLoading}
                query={query1} 
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
                isLoading={isLoading}
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