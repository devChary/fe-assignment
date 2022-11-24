import React, { useState } from 'react';

import SearchInput from '../../../components/SearchInput';

/* utils */
import { useQuery } from '../../../utils';

/* Styles */
import { PortSelectionWrapper } from './styled';

const Destinations = ({ setOriginPort, setDestinationPort }) => {
    const { data: portsData, error, isError, isLoading } = useQuery({ query : 'ports' });

    const [query1, setQuery1] = useState('');
    const [query2, setQuery2] = useState('');

    return <>
        <h1>Destinations</h1>
        <PortSelectionWrapper>
           <SearchInput 
                id="origin"    
                query={query1} 
                placeholder="Enter Origin"
                data={portsData} 
                handleChange={(event) => setQuery1(event.target.value)} 
                handleClick={(port) => {
                    setQuery1(`${port.name} (${port.code})`)
                    setOriginPort(port)
                }} 
            />
            <SearchInput 
                id="destination"    
                query={query2} 
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