export async function fetcher<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
	return fetch(input, init).then((res) => {
		if (!res.ok) {
			throw new Error('Failed to fetch');
		}
		return res.json();
	});
}
