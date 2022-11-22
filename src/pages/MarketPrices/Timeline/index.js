import React from 'react';

/* Styles */
import { TimelineWrapper, Date } from './styled';

const Timeline = (props) => {
    debugger
    const { startDate = '', endDate = '' } = props || {};
    return (
        <TimelineWrapper>
            <Date>{startDate}</Date>
            <Date>{endDate}</Date>
        </TimelineWrapper>
    )
}
export default Timeline;