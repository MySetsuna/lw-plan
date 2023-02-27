import React from 'react';
import PropTypes from 'prop-types';
import { TreeListContext } from '../TreeList/TreeList';

const TreeNode = (props) => {
	const { id, parentId } = props;

	const store = React.useContext(TreeListContext);
	const node = store.getNodeById(id);
	const { childIds } = node;

	return (
		<div>
			{!!id && (
				<div style={{ background: 'pink', borderTop: 'red solid 2px' }}>
					type:{node.type}-------------- id:{node.id}---------------- parentId:
					{parentId}
				</div>
			)}
			{!!childIds.length && (
				<ul>
					{childIds.map((childId) => (
						<li key={childId}>
							<TreeNode id={childId} parentId={id} />
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

TreeNode.propTypes = {
	id: PropTypes.number.isRequired,
	parentId: PropTypes.number
};

export default TreeNode;
