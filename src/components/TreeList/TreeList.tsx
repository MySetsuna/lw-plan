import React from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import TreeNode from '../TreeNode/TreeNode';
export function generateTree() {
	const tree = {
		0: {
			id: 0,
			type: Math.floor(Math.random() * 3) % 3,
			childIds: []
		}
	};

	for (let i = 1; i < 1000; i++) {
		const parentId = Math.floor(Math.pow(Math.random(), 2) * i);
		tree[i] = {
			id: i,
			type: Math.floor(Math.random() * 3) % 3,
			childIds: []
		};
		tree[parentId].childIds.push(i);
	}

	return tree;
}
interface Node {
	id: number;
	type: number;
	childIds: number[];
}

interface TreeStore {
	nodes: object;
	getNodeById(id: number): Node;
}
export const TreeListContext = React.createContext<TreeStore | undefined>(
	undefined
);

const TreeList = () => {
	const nodes = generateTree();
	const store = useLocalObservable(() => ({
		nodes,
		getNodeById(id: number) {
			return this.nodes[id];
		}
	}));
	return (
		<TreeListContext.Provider value={store}>
			<TreeNode id={0} />
		</TreeListContext.Provider>
	);
};

export default TreeList;
