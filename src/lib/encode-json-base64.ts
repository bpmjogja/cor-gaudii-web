export function encodeJsonBase64<T = unknown>(obj: T): string {
	const jsonString = JSON.stringify(obj);
	let base64: string;
	if (typeof Buffer !== 'undefined' && typeof Buffer.from === 'function') {
		base64 = Buffer.from(jsonString, 'utf-8').toString('base64');
	} else if (typeof btoa !== 'undefined') {
		const utf8Bytes = new TextEncoder().encode(jsonString);
		let binary = '';
		for (let i = 0; i < utf8Bytes.length; i++) {
			binary += String.fromCharCode(utf8Bytes[i]);
		}
		base64 = btoa(binary);
	} else {
		throw new Error('No base64 encoding method available');
	}
	return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
