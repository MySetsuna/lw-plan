import React from 'react';
import PropTypes from 'prop-types';
import type { TreeNodeType } from '../TreeList';
import { observer } from 'mobx-react-lite';
const TreeRow = (props: { node: TreeNodeType }) => {
	const { node } = props;
	return (
		<>
			<div>
				id: {node.id}-------------type: {node.type}-------------parentId:{' '}
				{node.parentId}
			</div>
		</>
	);
};

TreeRow.propTypes = {
	node: PropTypes.shape({
		id: PropTypes.number,
		type: PropTypes.number,
		childIds: PropTypes.arrayOf(PropTypes.number),
		parentId: PropTypes.number
	}),
	fields: PropTypes.array
};

export default observer(TreeRow);
