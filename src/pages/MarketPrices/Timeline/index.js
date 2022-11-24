import React from 'react';

/* Styles */
import { TimelineWrapper, Date, Line } from './styled';

const Timeline = ({ startDate = '', endDate = '' }) => {
    return (
        <TimelineWrapper>
            <Date>{startDate}</Date>
            <Line />
            <Date>{endDate}</Date>
        </TimelineWrapper>
    )
}
export default Timeline;