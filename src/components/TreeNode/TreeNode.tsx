import React from 'react';
import PropTypes from 'prop-types';
import { TreeListContext } from '../TreeList/TreeList';
import TreeRow from '../TreeRow';
import { observer } from 'mobx-react-lite';

const TreeNode = (props) => {
	const { id } = props;
	const [isExpand, setIsExpand] = React.useState(false);
	const store = React.useContext(TreeListContext);
	const node = store.getNodeById(id);
	const { childIds } = node;

	return (
		<>
			{!!id && (
				// <div style={{ background: 'pink', borderTop: 'red solid 2px' }}>
				// 	type:{node.type}-------------- id:{node.id}---------------- parentId:
				// 	{parentId}
				// </div>
				<div style={{ display: 'flex' }}>
					<div
						style={{
							width: 8,
							transform: isExpand ? 'rotate(90deg)' : 'unset',
							padding: '0 5px'
						}}
						onClick={() => !!childIds.length && setIsExpand((value) => !value)}
					>
						{!!childIds.length && '>'}
					</div>
					<TreeRow node={node} fields={[]} />
				</div>
			)}
			{!!childIds.length && (isExpand || !id) && (
				<div style={{ display: 'flex' }}>
					<div style={{ width: 16 }}></div>
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						{childIds.map((childId) => (
							<TreeNode key={childId} id={childId} parentId={id} />
						))}
					</div>
				</div>
			)}
		</>
	);
};

TreeNode.propTypes = {
	id: PropTypes.number.isRequired,
	parentId: PropTypes.number
};

export default observer(TreeNode);
