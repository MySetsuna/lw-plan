import React from 'react';
import PropTypes from 'prop-types';
import TreeRow from '../TreeRow';
import useTreeListStore from '@/hooks/useTreeListStroe/useTreeListStore';

const TreeNode = (props) => {
	const { id, level = 1 } = props;
	const [isExpand, setIsExpand] = React.useState(false);
	const { getNodeById } = useTreeListStore();
	const node = getNodeById(id);
	const { childIds } = node;

	return (
		<>
			{!!id && (
				<TreeRow
					node={node}
					fields={[]}
					level={level}
					isExpand={isExpand}
					childIds={childIds}
					onIconClick={() =>
						!!childIds.length && setIsExpand((value) => !value)
					}
				/>
			)}
			{!!childIds.length &&
				(isExpand || !id) &&
				childIds.map((childId) => (
					<TreeNode
						key={childId}
						id={childId}
						parentId={id}
						level={level + 1}
					/>
				))}
		</>
	);
};

TreeNode.propTypes = {
	id: PropTypes.number.isRequired,
	parentId: PropTypes.number,
	level: PropTypes.number
};

export default TreeNode;
