/* eslint-disable react/prop-types */
import React, { useCallback } from 'react';
// import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
const ItemTypes = {
	CARD: 'card'
};

/**
 * @type {React.CSSProperties}
 */
const style = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	marginBottom: '.5rem',
	backgroundColor: 'white',
	cursor: 'move',
	display: 'flex',
	justifyContent: 'space-between'
};

const DraggableItem = ({
	id,
	item,
	moveItem,
	findItem,
	removeItem,
	deleteIcon,
	onDragEnd
}) => {
	const originalIndex = findItem(id).index;
	const [{ isDragging }, drag] = useDrag(
		() => ({
			type: ItemTypes.CARD,
			item: { id, originalIndex },
			collect: (monitor) => ({
				isDragging: monitor.isDragging()
			}),
			end: (item, monitor) => {
				const { id: droppedId, originalIndex } = item;
				const didDrop = monitor.didDrop();
				if (!didDrop) {
					moveItem(droppedId, originalIndex);
				} else {
					onDragEnd();
				}
			}
		}),
		[id, originalIndex, moveItem]
	);
	const [, drop] = useDrop(
		() => ({
			accept: ItemTypes.CARD,
			hover({ id: draggedId }) {
				if (draggedId !== id) {
					const { index: overIndex } = findItem(id);
					if (overIndex > -1) {
						moveItem(draggedId, overIndex);
					}
				}
			}
		}),
		[findItem, moveItem]
	);

	const remove = useCallback(() => {
		removeItem(id);
	}, [id, removeItem]);
	const opacity = isDragging ? 0 : 1;
	return (
		<div ref={(node) => drag(drop(node))} style={{ ...style, opacity }}>
			{item}
			<div onClick={remove} style={{ cursor: 'pointer' }}>
				{deleteIcon}
			</div>
		</div>
	);
};

DraggableItem.defaultProps = {
	deleteIcon: <button>delete</button>
};

export default DraggableItem;
