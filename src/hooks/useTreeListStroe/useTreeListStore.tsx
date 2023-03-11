import { TreeStore } from '@/components/TreeList/TreeList';
import React from 'react';

export const TreeListContext = React.createContext<TreeStore | undefined>(
	undefined
);

const useTreeListStore = () => {
	const store = React.useContext(TreeListContext);
	return { store };
};

export default useTreeListStore;
