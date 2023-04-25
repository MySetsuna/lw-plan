import React, { useCallback, useRef, useState } from 'react';
import DraggableItemSorter from '../DraggableItemSorter';
import PropTypes from 'prop-types';
const ITEMS = [
	{
		item: <h1>222</h1>,
		id: 'a1'
	},

	{
		item: (
			<DraggableItemSorter
				showSelfHistoyTool={true}
				value={[
					{ item: 'Write a cool JS library', id: 'a' },

					{ item: 'Make it generic enough', id: 'b' },

					{ item: 'Write README', id: 'c' },

					{ item: 'Create some examples', id: 'd' },

					{ item: 'Spam in Twitter and IRC to promote it', id: 'e' },

					{ item: '???', id: 'f' },

					{ item: 'PROFIT', id: 'g' }
				]}
			/>
		),
		id: 'b1'
	},

	{ item: 'Write README', id: 'c1' },

	{ item: 'Create some examples', id: 'd1' },

	{ item: 'Spam in Twitter and IRC to promote it', id: 'e1' },

	{ item: '???', id: 'f1' },

	{ item: 'PROFIT', id: 'g1' }
];

const ColumnSetting = ({ onChange }) => {
	const stortyRef = useRef(null);
	const [allowGoAhead, setAllowGoAhead] = useState(false);
	const [allowGoBack, setAllowGoBack] = useState(false);

	const handleGoAheadClick = useCallback(() => {
		stortyRef.current.goAhead();
	}, []);

	const handleGoBackClick = useCallback(() => {
		stortyRef.current.goBack();
	}, []);

	const handleSorterChange = useCallback(
		(value) => {
			onChange?.(value);
			if (stortyRef.current) {
				setAllowGoAhead(stortyRef.current.allowGoAhead());
				setAllowGoBack(stortyRef.current.allowGoBack());
			}
		},
		[onChange]
	);

	const handleResetClick = useCallback(() => {
		stortyRef.current.revert();
	}, []);

	const handleRedoClick = useCallback(() => {
		stortyRef.current.redo();
	}, []);

	return (
		<div>
			<div style={{ display: 'flex', gap: 8 }}>
				<button disabled={!allowGoAhead} onClick={handleGoAheadClick}>
					go ahead
				</button>
				<button disabled={!allowGoBack} onClick={handleGoBackClick}>
					go back
				</button>
				<button onClick={handleResetClick}>revert</button>
				<button onClick={handleRedoClick}>redo</button>
			</div>
			<DraggableItemSorter
				ref={stortyRef}
				onChange={handleSorterChange}
				value={ITEMS}
				itemStyle={{ border: 'solid 1px red', display: 'none' }}
			/>
		</div>
	);
};
ColumnSetting.propTypes = {
	onChange: PropTypes.func
};
export default ColumnSetting;
