import React, {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useState
} from 'react';
import PropTypes from 'prop-types';
import DraggableItem from './DraggableItem';
import { useDrop } from 'react-dnd';
const style = {
	width: 400
};
const ItemTypes = {
	CARD: 'item'
};
const ITEMS = [
	{ item: 'Write a cool JS library', id: 'a' },

	{ item: 'Make it generic enough', id: 'b' },

	{ item: 'Write README', id: 'c' },

	{ item: 'Create some examples', id: 'd' },

	{ item: 'Spam in Twitter and IRC to promote it', id: 'e' },

	{ item: '???', id: 'f' },

	{ item: 'PROFIT', id: 'g' }
];
const DraggableItemSorter = forwardRef(({ onChange, value }, ref) => {
	const [items, setItems] = useState(value ?? ITEMS);
	const [historyItem, sethistoryItem] = useState([value ?? ITEMS]);
	const [currentIndex, setCurrentIndex] = useState(0);

	useImperativeHandle(
		ref,
		() => {
			return {
				allowGoAhead() {
					return currentIndex < historyItem.length - 1;
				},
				revert() {
					setItems(historyItem[0]);
					setCurrentIndex(0);
				},
				redo() {
					setItems(historyItem[historyItem.length - 1]);
					setCurrentIndex(historyItem.length - 1);
				},
				goAhead() {
					setCurrentIndex((index) => {
						const newIndex = index + 1;
						const newItems = historyItem[newIndex];
						if (newItems) {
							setItems(newItems);
							return newIndex;
						} else {
							return index;
						}
					});
					const newItems = historyItem[currentIndex + 1];
					if (newItems) setItems(newItems);
				},
				allowGoBack() {
					return currentIndex > 0;
				},
				goBack() {
					setCurrentIndex((index) => {
						const newIndex = index - 1;
						const newItems = historyItem[newIndex];
						if (newItems) {
							setItems(newItems);
							return newIndex;
						} else {
							return index;
						}
					});
				}
			};
		},
		[currentIndex, historyItem]
	);

	useEffect(() => {
		onChange?.(historyItem[currentIndex]);
	}, [historyItem, currentIndex, onChange]);

	const findItem = useCallback(
		(id) => {
			const item = items.filter((c) => `${c.id}` === id)[0];
			return {
				item,
				index: items.indexOf(item)
			};
		},
		[items]
	);
	const moveItem = useCallback(
		(id, atIndex) => {
			const { item, index } = findItem(id);
			const newItems = [...items];
			console.log(newItems, 'newItems');
			if (item) {
				newItems.splice(index, 1);
				newItems.splice(atIndex, 0, item);
			}
			setItems(newItems);
		},
		[findItem, items]
	);

	const removeItem = useCallback(
		(id) => {
			setCurrentIndex((index) => index + 1);
			setItems((preItems) => {
				const newItems = [...preItems];
				const { index } = findItem(id);
				newItems.splice(index, 1);

				const currnthistoryItem = historyItem.slice(0, currentIndex + 1);
				currnthistoryItem.push(newItems);
				sethistoryItem(currnthistoryItem);
				return newItems;
			});
		},
		[findItem, historyItem, currentIndex]
	);
	const [, drop] = useDrop(() => ({
		accept: ItemTypes.CARD
	}));

	const handleItemDragEnd = useCallback(() => {
		setCurrentIndex((index) => {
			const newIndex = index + 1;
			sethistoryItem((preHistoryItem) => {
				const currnthistoryItem = preHistoryItem.slice(0, newIndex);
				currnthistoryItem.push(items);
				return currnthistoryItem;
			});
			return newIndex;
		});
	}, [items]);
	return (
		<div ref={drop} style={style}>
			{items
				.filter((item) => {
					if (!item) return false;
					return !!item;
				})
				.map((item) => (
					<DraggableItem
						key={item.id}
						id={`${item?.id}`}
						item={item.item}
						moveItem={moveItem}
						findItem={findItem}
						removeItem={removeItem}
						// deleteIcon={'x'}
						onDragEnd={handleItemDragEnd}
					/>
				))}
		</div>
	);
});

DraggableItemSorter.propTypes = {
	onChange: PropTypes.func,
	value: PropTypes.array
};
DraggableItemSorter.displayName = 'DraggableItemSorter';

export default DraggableItemSorter;
