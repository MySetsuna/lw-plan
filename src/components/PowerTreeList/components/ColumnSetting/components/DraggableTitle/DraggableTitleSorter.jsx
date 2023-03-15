import React, { useCallback, useState } from 'react';
// import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import DraggableTitle from './DraggableTitle';
import { useDrop } from 'react-dnd';
const style = {
	width: 400
};
const ItemTypes = {
	CARD: 'title'
};
const ITEMS = [
	{ title: 'Write a cool JS library', id: 'a' },

	{ title: 'Make it generic enough', id: 'b' },

	{ title: 'Write README', id: 'c' },

	{ title: 'Create some examples', id: 'd' },

	{ title: 'Spam in Twitter and IRC to promote it', id: 'e' },

	{ title: '???', id: 'f' },

	{ title: 'PROFIT', id: 'g' }
];
const DraggableTitleSorter = () => {
	const [titles, setTitles] = useState(ITEMS);
	const findTitle = useCallback(
		(id) => {
			const title = titles.filter((c) => `${c.id}` === id)[0];
			return {
				title,
				index: titles.indexOf(title)
			};
		},
		[titles]
	);
	const moveTitle = useCallback(
		(id, atIndex) => {
			const { title, index } = findTitle(id);
			const tls = [...titles];
			tls.splice(index, 1);
			tls.splice(atIndex, 0, title);
			setTitles(tls);
		},
		[findTitle, setTitles, titles]
	);
	const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }));
	return (
		<div ref={drop} style={style}>
			{titles.map((title) => (
				<DraggableTitle
					key={title.id}
					id={`${title.id}`}
					title={title.title}
					moveTitle={moveTitle}
					findTitle={findTitle}
				/>
			))}
		</div>
	);
};

DraggableTitleSorter.propTypes = {};

export default observer(DraggableTitleSorter);
