import React from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import TreeNode from '../TreeNode';
export function generateTree () {
	const tree = {
		0: {
			id: 0,
			parentId: null,
			type: Math.floor(Math.random() * 3) % 3,
			childIds: []
		}
	};

	for (let i = 1; i < 1000; i++) {
		const parentId = Math.floor(Math.pow(Math.random(), 2) * i);
		tree[i] = {
			id: i,
			parentId,
			type: Math.floor(Math.random() * 3) % 3,
			childIds: []
		};
		tree[parentId].childIds.push(i);
	}

	return tree;
}
interface TreeNodeType {
	id: number;
	type: number;
	childIds: number[];
	parentId?: number;
}

interface TreeStore {
	nodes: object;
	getNodeById(id: number): TreeNodeType;
}
export const TreeListContext = React.createContext<TreeStore | undefined>(
	undefined
);

const TreeList = observer(() => {
	const nodes = generateTree();
	const store = useLocalObservable(() => ({
		nodes,
		getNodeById (id: number) {
			return this.filteredNodes[id];
		},
		get filteredNodes () {
			const { nodes } = this;
			return nodes;
		}
	}));
	return (
		<TreeListContext.Provider value={store}>
			<div
				style={{
					textAlign: 'start'
				}}
			>
				<TreeNode id={0} />
			</div>
		</TreeListContext.Provider>
	);
});

export { TreeList as default };
export type { TreeNodeType };
