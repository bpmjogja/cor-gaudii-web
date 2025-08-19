export interface Readable<T> {
	readMany({
		limit,
		fields,
		filter,
		sort,
		pagination,
	}: {
		limit?: number;
		fields?: (keyof T)[];
		filter?: Partial<Record<keyof T, T[keyof T]>>;
		sort?: { key: keyof T; order: 'asc' | 'desc' };
		pagination?: { page: number; dataPerPage: number };
	}): Promise<Partial<T>[]>;
	readOne(id: string, fields: { fields?: (keyof T)[] }): Promise<Partial<T> | null>;
}
