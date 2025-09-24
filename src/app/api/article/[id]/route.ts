import { dataResponse } from '@/lib/data-response';
import { errorResponse } from '@/lib/error-response';
import { getJsonRequestBody } from '@/lib/get-json-request-body';
import { messageResponse } from '@/lib/message-response';
import { prismaClient } from '@/lib/prisma';
import { articleUpdateSchema } from '@/lib/validation/article';

// Read First
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	const readResult = await prismaClient.article.findFirst({ where: { id: id, deletedAt: null } });
	if (!readResult) {
		return errorResponse('Article not found', 404);
	}

	return dataResponse(readResult);
}

// Delete
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	const deleteResult = await prismaClient.article.update({ data: { deletedAt: new Date() }, where: { id: id } });
	if (!deleteResult) {
		return errorResponse('Article not found', 404);
	}
	return messageResponse(`Article ${deleteResult.title} deleted successfully`);
}

// Update
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	try {
		const rawData = await getJsonRequestBody(request);
		const validatedData = await articleUpdateSchema.validateAsync(rawData);
		const updateResult = await prismaClient.article.update({
			where: { id: id },
			data: validatedData,
		});
		return dataResponse(updateResult);
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		return errorResponse(errorMessage, 400);
	}
}
