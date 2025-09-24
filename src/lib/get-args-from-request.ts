import { decodeBase64Json } from './decode-base64-json';

export function getArgsFromRequest<T = unknown>(request: Request): T {
	const argsString = new URL(request.url).searchParams.get('args');
	let parsedArgs: T = {} as T;
	if (argsString) {
		parsedArgs = decodeBase64Json<T>(argsString);
	}
	return parsedArgs;
}
