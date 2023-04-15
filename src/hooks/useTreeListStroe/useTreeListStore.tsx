import type { NodesType } from '@/provider/TreeListProvider';
import React from 'react';

export const TreeListContext = React.createContext<
	| {
			state: { nodes: NodesType };
			dispatch: React.Dispatch<{
				type: string;
				payload: {
					[key: string]: any;
					[key: number]: any;
					[key: symbol]: any;
					id: number;
					nodes: {
						id: number;
						parentId: number;
						type: number;
						childIds: number[];
					};
				};
			}>;
	  }
	| undefined
>(undefined);

const useTreeListStore = () => {
	const { state, dispatch } = React.useContext(TreeListContext);
	const getNodeById = (id: number) => {
		return state.nodes[id];
	};
	return { getNodeById, dispatch, state };
};

export default useTreeListStore;
