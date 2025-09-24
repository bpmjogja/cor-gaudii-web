export function getJsonRequestBody<T = unknown>(request: Request): Promise<T> {
	return request.json() as Promise<T>;
}
