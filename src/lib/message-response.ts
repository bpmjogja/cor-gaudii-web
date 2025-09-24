export function messageResponse(message: string, status: number = 200): Response {
	return new Response(JSON.stringify({ message: message }), {
		status,
		headers: { 'Content-Type': 'application/json' },
	});
}
