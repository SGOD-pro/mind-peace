// StoreHelper.ts
export default class StoreHelper<T extends { _id: string }> {
	private items: T[] = [];
  
	constructor(initialItems: T[] = []) {
	  this.items = initialItems;
	}
  
	addItem(item: T): void {
	  this.items.push(item);
	}
  
	removeItem(id: string): void {
	  this.items = this.items.filter((item: any) => item._id !== id); // Assumes items have an `id` field
	}
  
	updateItem(updatedItem: T): void {
	  const index = this.items.findIndex((item: any) => item._id === updatedItem._id);
	  if (index !== -1) this.items[index] = updatedItem;
	}
  
	setItems(items: T[]): void {
	  this.items = items;
	}
  
	getItems(): T[] {
	  return this.items;
	}
  }
  