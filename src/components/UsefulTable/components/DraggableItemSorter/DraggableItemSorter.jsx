import React, {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useState
} from 'react';
import PropTypes from 'prop-types';
import DraggableItem from './DraggableItem';
import { useDrop } from 'react-dnd';
const defualtStyle = {
	width: 'auto'
};
const ItemTypes = {
	CARD: 'item'
};

const DraggableItemSorter = forwardRef(
	(
		{
			onChange,
			value,
			showSelfHistoyTool,
			historyToolRenderer,
			itemStyle,
			style
		},
		ref
	) => {
		const [items, setItems] = useState(value);
		const [historyItem, sethistoryItem] = useState([value]);
		const [currentIndex, setCurrentIndex] = useState(0);

		const allowGoAhead = useCallback(() => {
			return currentIndex < historyItem.length - 1;
		}, [currentIndex, historyItem.length]);

		const revert = useCallback(() => {
			setItems(historyItem[0]);
			setCurrentIndex(0);
		}, [historyItem]);

		const redo = useCallback(() => {
			setItems(historyItem[historyItem.length - 1]);
			setCurrentIndex(historyItem.length - 1);
		}, [historyItem]);

		const goAhead = useCallback(() => {
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
		}, [currentIndex, historyItem]);

		const allowGoBack = useCallback(() => {
			return currentIndex > 0;
		}, [currentIndex]);

		const goBack = useCallback(() => {
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
		}, [historyItem]);

		useImperativeHandle(
			ref,
			() => {
				return {
					revert,
					redo,
					allowGoAhead,
					goAhead,
					allowGoBack,
					goBack
				};
			},
			[allowGoAhead, allowGoBack, goAhead, goBack, redo, revert]
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

		const selfHistoyTool = useMemo(() => {
			return historyToolRenderer({
				allowGoAhead,
				allowGoBack,
				revert,
				redo,
				goAhead,
				goBack
			});
		}, [
			allowGoAhead,
			allowGoBack,
			goAhead,
			goBack,
			historyToolRenderer,
			redo,
			revert
		]);
		return (
			<div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
				{showSelfHistoyTool && selfHistoyTool}
				<div ref={drop} style={style ?? defualtStyle}>
					{items &&
						items
							.filter((item) => {
								if (!item) return false;
								return !!item;
							})
							.map((item) => (
								<DraggableItem
									style={itemStyle}
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
			</div>
		);
	}
);
DraggableItemSorter.defaultProps = {
	showSelfHistoyTool: false,
	historyToolRenderer: ({
		allowGoAhead,
		allowGoBack,
		revert,
		redo,
		goAhead,
		goBack
	}) => {
		return (
			<div style={{ display: 'flex', gap: 8 }}>
				<button disabled={!allowGoAhead()} onClick={goAhead}>
					go ahead
				</button>
				<button disabled={!allowGoBack()} onClick={goBack}>
					go back
				</button>
				<button onClick={revert}>revert</button>
				<button onClick={redo}>redo</button>
			</div>
		);
	}
};

DraggableItemSorter.propTypes = {
	onChange: PropTypes.func,
	value: PropTypes.array,
	showSelfHistoyTool: PropTypes.bool,
	historyToolRenderer: PropTypes.func,
	itemStyle: PropTypes.object,
	style: PropTypes.object
};
DraggableItemSorter.displayName = 'DraggableItemSorter';

export default DraggableItemSorter;
