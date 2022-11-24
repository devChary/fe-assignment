import React from 'react';
import styled from 'styled-components';

const EmptyStateWrap = styled.div`
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 360px;
	border: 1px solid #dbdbdb;
	border-radius: 2px;
	margin: 20px 0;
	padding: 0 20px;
	background: rgba(247, 247, 246, 0.5);
	img {
		width: 75px;
		margin: 0 0 24px;
	}
	h3 {
		font-size: 20px;
		font-weight: 400;
		margin: 0 0 8px;
	}
`;

function EmptyState({ icon, title, subTitle, styles }) {
	return (
		<EmptyStateWrap styles={styles}>
			{icon && <img alt="Empty state icon" src={icon} />}
			{title && <h3>{title} </h3>}
			{subTitle && <p>{subTitle}</p>}
		</EmptyStateWrap>
	);
}

export default EmptyState;
