export interface Creatable<T> {
	create(data: T): Promise<T>;
}
