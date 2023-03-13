import React from 'react';
import PropTypes from 'prop-types';
import { PowerTreeListContext } from '@/hooks/usePowerTreeListStore/usePowerTreeListStore';
import PowerTreeListStore from '@/components/PowerTreeList/domain/stores';

const PowerTreeListProvider = ({ children, store: pStroe }) => {
	const [store] = React.useState(() =>
		pStroe && pStroe instanceof PowerTreeListStore
			? pStroe
			: new PowerTreeListStore()
	);

	if (pStroe && !(pStroe instanceof PowerTreeListStore)) {
		throw new Error('请提供正确的store');
	}

	return (
		<PowerTreeListContext.Provider value={store}>
			{children}
		</PowerTreeListContext.Provider>
	);
};

PowerTreeListProvider.Propes = {};

PowerTreeListProvider.propTypes = {
	children: PropTypes.node,
	store: PropTypes.object
};

export default PowerTreeListProvider;
