import { ColumnStore, FilterStore } from './index';

class PowerTreeListStore {
	columnStore;
	filterStroe;
	constructor () {
		this.columnStore = new ColumnStore();
		this.filterStroe = new FilterStore();
	}
}
export default PowerTreeListStore;
