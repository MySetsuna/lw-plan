/* eslint-disable react/prop-types */
import React from 'react';
// import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import { useDrag, useDrop } from 'react-dnd';
const ItemTypes = {
	CARD: 'card'
};

const style = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	marginBottom: '.5rem',
	backgroundColor: 'white',
	cursor: 'move'
};

const DraggableTitle = ({ id, title, moveTitle, findTitle }) => {
	const originalIndex = findTitle(id).index;
	const [{ isDragging }, drag] = useDrag(
		() => ({
			type: ItemTypes.CARD,
			item: { id, originalIndex },
			collect: (monitor) => ({
				isDragging: monitor.isDragging()
			})
			// end: (item, monitor) => {
			// 	const { id: droppedId, originalIndex } = item;
			// 	const didDrop = monitor.didDrop();
			// 	// if (!didDrop) {
			// 	// 	moveTitle(droppedId, originalIndex);
			// 	// }
			// }
		}),
		[id, originalIndex, moveTitle]
	);
	const [, drop] = useDrop(
		() => ({
			accept: ItemTypes.CARD,
			hover ({ id: draggedId }) {
				if (draggedId !== id) {
					const { index: overIndex } = findTitle(id);
					moveTitle(draggedId, overIndex);
				}
			}
		}),
		[findTitle, moveTitle]
	);
	const opacity = isDragging ? 0 : 1;
	return (
		<div ref={(node) => drag(drop(node))} style={{ ...style, opacity }}>
			{title}
		</div>
	);
};

DraggableTitle.propTypes = {};

export default observer(DraggableTitle);
