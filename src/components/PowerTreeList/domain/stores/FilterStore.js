class FilterStore {
	/**
	 * @type {{id:string,name:string,element:React.ReactElement}[]}
	 */
	filters = [];
	/**
	 * @type {[{id:string,relateId:string}]}
	 */
	filterRelateFlters = [];

	constructor (props = {}) {
		if (props.filters) this.filters = props.filters || [];
	}

	/**
	 *
	 * @param {{
	 *  currentFlters?: string[],
	 * }} param0
	 */
	setCurrentFlters (currentFlters) {
		if (
			currentFlters instanceof Array &&
			currentFlters.every((item) => typeof item === 'string')
		) {
			this.currentFlters = currentFlters;
		} else {
			console.warn(
				'invaild params,currentFlters require string array',
				currentFlters
			);
		}
	}

	/**
	 *
	 * @type {({
	 * 	filters:{id:string,name:string,element:React.ReactElement}[],
	 * 	action?: 'rename' | 're-element' | 'remove' | 'add',
	 * 	options?: {id:string,name:string,element:React.ReactElement}| React.ReactElement| string | {id:string|name:string}
	 * })=>void}
	 */
	setElements ({ filters, action, options }) {
		if (filters instanceof Array) {
			this.filters = filters;
		}
		switch (action) {
		case 'add':
			if (options) this.filters.push(options);
			break;
		case 're-element':
			this.filters.splice(this.filters.findIndex(options?.id), 1, options);
			break;
		case 'remove':
			this.filters.splice(this.filters.findIndex(options?.id ?? options), 1);
			break;
		case 'rename':
			this.filters.map((item) => {
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
}
export default FilterStore;
