import { TreeListContext } from '@/hooks/useTreeListStroe/useTreeListStore';
import React, { useMemo, useReducer } from 'react';
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

export type NodesType = {
	[key: number]: {
		id: number;
		parentId: number | null;
		type: number;
		childIds: number[];
	};
};
const TreeListProvider = ({ children }: { children: React.ReactNode }) => {
	const nodes: NodesType = generateTree();
	const reducer = (
		state: { nodes: NodesType },
		action: {
			type: string;
			payload: {
				[key: string | symbol | number]: any;
				id: number;
				nodes: {
					id: number;
					parentId: number | null;
					type: number;
					childIds: number[];
				};
			};
		}
	) => {
		let tempNodes: NodesType;
		switch (action.type) {
		// case 'getNodeById':
		// 	return state.nodes[action.payload.id];
		// case 'filteredNodes':
		// 	return state.nodes;
		case 'addNodes':
			return {
				nodes: {
					...state.nodes,
					[Object.keys(state.nodes).length]: action.payload.nodes
				}
			};
		case 'removeNodes':
			tempNodes = state.nodes;
			Reflect.deleteProperty(tempNodes, action.payload.id);
			return {
				nodes: tempNodes
			};
		default:
			return state;
		}
	};
	const [state, dispatch] = useReducer(reducer, { nodes });
	const contextValue = useMemo(
		() => ({
			state,
			dispatch
		}),
		[state, dispatch]
	);
	return (
		<TreeListContext.Provider value={contextValue}>
			{children}
		</TreeListContext.Provider>
	);
};

export default TreeListProvider;
