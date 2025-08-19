export interface Validatable<T> {
	validate(data: T): { isValid: boolean; errors: Partial<Record<keyof T, string[]>> };
}
