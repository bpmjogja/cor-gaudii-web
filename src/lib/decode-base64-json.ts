export function decodeBase64Json<T = unknown>(base64String: string): T {
	let base64 = base64String.replace(/-/g, '+').replace(/_/g, '/');
	const pad = base64.length % 4;
	if (pad) base64 += '='.repeat(4 - pad);
	let jsonString: string;
	if (typeof Buffer !== 'undefined' && typeof Buffer.from === 'function') {
		jsonString = Buffer.from(base64, 'base64').toString('utf-8');
	} else if (typeof atob !== 'undefined') {
		const binary = atob(base64);
		const bytes = new Uint8Array(binary.length);
		for (let i = 0; i < binary.length; i++) {
			bytes[i] = binary.charCodeAt(i);
		}
		if (typeof TextDecoder !== 'undefined') {
			jsonString = new TextDecoder('utf-8').decode(bytes);
		} else {
			jsonString = decodeURIComponent(
				Array.from(bytes)
					.map((b) => '%' + b.toString(16).padStart(2, '0'))
					.join('')
			);
		}
	} else {
		throw new Error('No base64 decoding method available');
	}
	return JSON.parse(jsonString) as T;
}
