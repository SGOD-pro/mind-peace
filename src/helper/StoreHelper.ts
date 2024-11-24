export default class StoreHelper<T extends { _id: string }> {
	private items: T[] = [];

	constructor(initialItems: T[] = []) {
		this.items = initialItems;
	}

	addItem(item: T): T[] {
		this.items = [item, ...this.items];
		return this.items;
	}

	removeItem(id: string): T[] {
		this.items = this.items.filter((item: T) => item._id !== id);
		return this.items;
	}

	updateItem(updatedItem: T): T[] {
		const index = this.items.findIndex(
			(item: T) => item._id === updatedItem._id
		);
		if (index !== -1) {
			this.items[index] = updatedItem;
		}
		return this.items;
	}

	setItems(items: T[]): T[] {
		this.items = items;
		return this.items;
	}

	getItems(): T[] {
		return this.items;
	}
}
