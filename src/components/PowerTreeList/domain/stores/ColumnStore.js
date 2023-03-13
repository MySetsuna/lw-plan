import { makeAutoObservable } from 'mobx';

/**
 *
 * @param { number | (columnid:string)=>number} defualtWidth
 * @returns
 */
const widthCfgHandler = (defualtWidth) => {
	return {
		get (target, prop) {
			const defualt =
				typeof defualtWidth === 'function' ? defualtWidth(prop) : defualtWidth;
			return prop in target ? target[prop] : defualt;
		},
		set (target, prop, value) {
			if (typeof value === 'number') {
				// eslint-disable-next-line no-param-reassign
				target[prop] = value;
				return true;
			}
			if (!isNaN(parseInt(value, 10))) {
				// eslint-disable-next-line no-param-reassign
				target[prop] = parseInt(value, 10);
				return true;
			}
			throw new Error('width is a number value!');
		}
	};
};

class ColumnStore {
	/**
	 * @type {{id:string,name:string,element:React.ReactElement}[]}
	 */
	columns = [];

	/**
	 * @type {{}}
	 */
	widthCfg = {};

	/**
	 * @type {number| (string)=>number | null}
	 */
	defualtWidth = null;

	/**
	 * @type {string[]}
	 */
	currentColumns = [];

	/**
	 * @type {{[key]:string,[value]:()=>void}}
	 */
	columnSorter = {};

	/**
	 * @type {{[key]:string,[value]:0|1|-1}}
	 */
	columnSortValues = {};

	/**
	 * @type {{label:string,group?:string,groupKey?:string,element?s:React.ReactElement}[]}
	 */
	columnTitles = [];

	/**
	 *
	 * @param {{
	 *  columns: {id:string,element:React.ReactElement}[],
	 *  widthCfg:{},
	 *  defualtWidth: number | (columnid:string)=>number
	 * }} props
	 */
	constructor (props = {}) {
		const {
			defualtWidth,
			columns = [],
			widthCfg = {},
			currentColumns,
			columnSorter,
			columnSortValues
		} = props;
		makeAutoObservable(this);
		this.columns = columns;
		this.widthCfg = new Proxy(widthCfg, widthCfgHandler(defualtWidth));
		this.currentColumns = currentColumns;
		if (defualtWidth) this.defualtWidth = defualtWidth;
		if (columnSorter) this.columnSorter = columnSorter;
		if (columnSortValues) this.columnSortValues = columnSortValues;
	}

	/**
	 *
	 * @param {{
	 *  currentColumns?: string[],
	 * }} param0
	 */
	setCurrentColumns (currentColumns) {
		if (
			currentColumns instanceof Array &&
			currentColumns.every((item) => typeof item === 'string')
		) {
			this.currentColumns = currentColumns;
		} else {
			console.warn(
				'invaild params,currentColumns require string array',
				currentColumns
			);
		}
	}

	/**
	 *
	 * @param {{
	 * 	columns:{id:string,name:string,element:React.ReactElement}[],
	 * 	action?: 'rename' | 're-element' | 'remove' | 'add',
	 * 	options?: {id:string,name:string,element:React.ReactElement}| React.ReactElement| string | {id:string|name:string}
	 * }} param0
	 */
	setElements ({ columns, action, options }) {
		if (columns instanceof Array) {
			this.columns = columns;
		}
		switch (action) {
		case 'add':
			if (options) this.columns.push(options);
			break;
		case 're-element':
			this.columns.splice(this.columns.findIndex(options?.id), 1, options);
			break;
		case 'remove':
			this.columns.splice(this.columns.findIndex(options?.id ?? options), 1);
			break;
		case 'rename':
			this.columns.map((item) => {
				if (item.id === options?.id) {
					return { ...item, name: options.name };
				}
				return item;
			});
			break;
		default:
			break;
		}
	}

	/**
	 *
	 * @param {{
	 *  widthCfg:{},
	 * 	key:string,
	 * 	value:number
	 * }} param0
	 */
	setWidthCfg ({ widthCfg, key, value }) {
		if (typeof widthCfg === 'object') {
			if (Object.values(widthCfg).every((item) => typeof item === 'number')) {
				this.widthCfg = new Proxy(widthCfg, widthCfgHandler(this.defualtWidth));
			}
		}
		if (key) {
			this.widthCfg[key] = value;
		}
	}

	setDefualtWidth (defualtWidth) {
		this.widthCfg = new Proxy(
			{ ...this.widthCfg },
			widthCfgHandler(defualtWidth)
		);
		this.defualtWidth = defualtWidth;
	}

	setColumnSortValues ({ columnSortValues, key, value }) {
		if (
			typeof columnSortValues === 'object' &&
			Object.values(columnSortValues).every(
				(element) => typeof element === 'number'
			)
		) {
			this.columnSortValues = columnSortValues;
		}
		if (key && typeof value === 'number') {
			this.columnSortValues = value;
		}
	}
}
export default ColumnStore;
