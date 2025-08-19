import fileService from '@/lib/models/File/file-service';
import { Validatable } from '@/lib/operation-interfaces/validatable';

export async function GET(request: Request) {
	let validatable: Validatable<any>;
	let resource = 'file';
	switch (resource) {
		case 'file': {
			validatable = fileService;
		}
	}
	const users = [
		{ id: 1, name: 'Alice' },
		{ id: 2, name: 'Bob' },
	];
	return new Response(JSON.stringify(users), {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
	});
}