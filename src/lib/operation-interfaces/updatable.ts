export interface Updatable<T> {
	update(id: string, data: Partial<T>): Promise<T>;
}
