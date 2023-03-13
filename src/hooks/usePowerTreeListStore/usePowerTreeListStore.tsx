import PowerTreeListStore from '@/components/PowerTreeList/domain/stores';
import React from 'react';

export const PowerTreeListContext = React.createContext<
	PowerTreeListStore | undefined
>(undefined);

const usePowerTreeListStore = () => {
	const store = React.useContext(PowerTreeListContext);
	return { store };
};

export default usePowerTreeListStore;
