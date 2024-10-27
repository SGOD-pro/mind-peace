class StoreHelper<T> {
    private array: T[] = [];

    constructor(initialData: T[] = []) {
        this.array = initialData;
    }

    setItems(items: T[]): void {
        this.array = items;
    }

    addItem(item: T): void {
        this.array.push(item);
    }

    removeItem(index: number): void {
        if (index >= 0 && index < this.array.length) {
            this.array.splice(index, 1);
        }
    }

    updateItem(index: number, newItem: T): void {
        if (index >= 0 && index < this.array.length) {
            this.array[index] = newItem;
        }
    }

    getItems(): T[] {
        return this.array;
    }

    clear(): void {
        this.array = [];
    }
}

export default StoreHelper