import React from 'react';
import PropTypes from 'prop-types';
import PowerTreeListProvider from '../../provider/PowerTreeListProvider';
import PowerTreeListStore from './domain/stores';

const PowerTreeList = (props) => {
	return (
		<PowerTreeListProvider store={new MyStore()}>
			{props.children}
		</PowerTreeListProvider>
	);
};

PowerTreeList.propTypes = {
	children: PropTypes.node
};

PowerTreeList.defualtProps = {
	children: 'test'
};

class MyStore extends PowerTreeListStore {}
export default PowerTreeList;
