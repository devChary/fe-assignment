import React, { useState, useEffect, useRef } from 'react';

/* Utils */
import { useOutsideClick } from 'utils/hooks/useOutsideClick';

/* Styles */
import { PortName, DropDownOptions, DropDownOption, InputComponent, SearchInputWrapper } from './styled';

const SearchInput = ({ id, name, query, data, handleChange, handleClick, placeholder, onKeyDown, icon, isLoading }) => {

	const refDropdownContainer = useRef(null);
	const isClickedOutside = useOutsideClick(refDropdownContainer);

	useEffect(() => {
		if (isClickedOutside) {
			setIsOpen(false);
		}
	}, [isClickedOutside]);

    const [isOpen, setIsOpen] = useState(false);

    function onChangeInternal(e, data) {
		if (!isOpen) {
			setIsOpen(true);
		}
		setIsOpen(true);
		if (handleChange) {
			handleChange(e);
		}
	}

    const filterPorts = ({ port, query }) => {
        const isActivePort = port.name.toLowerCase().includes(query.toLowerCase());
        if (isActivePort || query === '') {
            return true;
        } 
        return false;
    }

    const filteredResultsLength = data?.filter(port => filterPorts({ port, query }))?.length;

    const showResults = query?.length > 0 &&  filteredResultsLength > 0;
    const showEmptyMessage =  query?.length > 0 && filteredResultsLength === 0;

    return (
        <SearchInputWrapper>
            <InputComponent
                name={name}
                value={query} 
                id={id}
                placeholder={placeholder}
                onChange={onChangeInternal}
                onKeyDown={onKeyDown}
            />
            <DropDownOptions>
                {showResults && isOpen && data
                    ?.filter(port => filterPorts({ port, query }))
                    ?.map(port =>(<PortName key={port.code} onClick={() => {
                        if (isOpen) {
							setIsOpen(false);
						}
                        handleClick(port)}
                    }>{port.name} ({port.code})
                </PortName>))
                }
                { showEmptyMessage && isOpen && <DropDownOption>No Matching Result Found</DropDownOption> }
            </DropDownOptions>
            
        </SearchInputWrapper>
        
    )
}

export default SearchInput;