export interface Deletable<T> {
	delete(id: string): Promise<T>;
}
