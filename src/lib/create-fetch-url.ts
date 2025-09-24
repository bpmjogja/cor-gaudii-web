import { encodeJsonBase64 } from '@/lib/encode-json-base64';

export function createFetchUrl<T>(path: string, args?: T) {
	if (typeof window === 'undefined') {
		return path;
	}
	const url = new URL(path, window.location.origin);
	if (args) {
		url.searchParams.append('args', encodeJsonBase64(args));
	}
	return url.toString();
}
