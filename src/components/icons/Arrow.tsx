import { CustomIcon } from '@src/types/icons';
import React from 'react';

const Arrow: React.FC<CustomIcon> = ({
	width = 12,
	height = 8,
	viewBox = '0 0 12 8',
	className = '',
	fill = 'var(--primary-color)'
}) => {
	return (
		<svg width={width}
		height={height}
		viewBox={viewBox}
		className={className}
		fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M2.12539 1.00002L6.00539 4.88002L9.88539 1.00002C10.2754 0.610019 10.9054 0.61002 11.2954 1.00002C11.6854 1.39002 11.6854 2.02002 11.2954 2.41002L6.70539 7.00002C6.31539 7.39002 5.68539 7.39002 5.29539 7.00002L0.705392 2.41002C0.315391 2.02002 0.315392 1.39002 0.705392 1.00002C1.09539 0.620019 1.73539 0.610019 2.12539 1.00002Z" fill={fill} />
		</svg>
	);
};

export default Arrow;
