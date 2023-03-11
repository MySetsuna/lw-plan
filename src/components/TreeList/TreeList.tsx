import React from 'react';
import { observer } from 'mobx-react-lite';
import TreeNode from '../TreeNode';
import TreeListProvider from '@/provider/TreeListProvider';

export interface TreeNodeType {
	id: number;
	type: number;
	childIds: number[];
	parentId?: number;
}

export interface TreeStore {
	nodes: object;
	getNodeById(id: number): TreeNodeType;
}

const TreeList = observer(() => {
	return (
		<TreeListProvider>
			<div
				style={{
					textAlign: 'start'
				}}
			>
				<TreeNode id={0} />
			</div>
		</TreeListProvider>
	);
});

export { TreeList as default };
