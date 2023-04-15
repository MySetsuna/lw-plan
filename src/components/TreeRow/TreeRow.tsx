import React from 'react';
import PropTypes from 'prop-types';
import type { TreeNodeType } from '../TreeList';

type TreeRowProps = {
	node: TreeNodeType;
	fields: string[];
	childIds: number[];
	onIconClick(): void;
	isExpand: boolean;
	level?: number;
};

const TreeRow = (props: TreeRowProps) => {
	const { node, childIds, onIconClick, isExpand, level } = props;
	return (
		<div style={{ display: 'flex' }}>
			<div style={{ width: level * 16 }}></div>
			<div
				style={{
					width: 8,
					transform: isExpand ? 'rotate(90deg)' : 'unset',
					padding: '0 5px'
				}}
				onClick={onIconClick}
			>
				{!!childIds.length && '>'}
			</div>
			id: <input disabled value={node.id}></input>
			type:
			<select disabled value={node.type}>
				<option key={0}>0</option>
				<option key={1}>1</option>
				<option key={2}>2</option>
			</select>
			parentId:<input disabled value={node.parentId}></input>
		</div>
	);
};

TreeRow.propTypes = {
	node: PropTypes.shape({
		id: PropTypes.number,
		type: PropTypes.number,
		childIds: PropTypes.arrayOf(PropTypes.number),
		parentId: PropTypes.number
	}),
	fields: PropTypes.array,
	childIds: PropTypes.arrayOf(PropTypes.number),
	onIconClick: PropTypes.func,
	isExpand: PropTypes.bool,
	level: PropTypes.number
};

export default TreeRow;
