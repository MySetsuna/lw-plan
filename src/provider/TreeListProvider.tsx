import { TreeListContext } from '@/hooks/useTreeListStroe/useTreeListStore';
import { useLocalObservable } from 'mobx-react-lite';
import React from 'react';
export function generateTree() {
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
const TreeListProvider = ({ children }: { children: React.ReactNode }) => {
	const nodes = generateTree();
	const store = useLocalObservable(() => ({
		nodes,
		getNodeById(id: number) {
			return this.filteredNodes[id];
		},
		get filteredNodes() {
			const { nodes } = this;
			return nodes;
		}
	}));
	return (
		<TreeListContext.Provider value={store}>
			{children}
		</TreeListContext.Provider>
	);
};

export default TreeListProvider;
