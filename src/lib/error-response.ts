export function errorResponse(message: string, status: number = 400): Response {
	return new Response(JSON.stringify({ error: message }), {
		status,
		headers: { 'Content-Type': 'application/json' },
	});
}
