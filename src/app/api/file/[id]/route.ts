import { dataResponse } from '@/lib/data-response';
import { errorResponse } from '@/lib/error-response';
import { getJsonRequestBody } from '@/lib/get-json-request-body';
import { messageResponse } from '@/lib/message-response';
import { prismaClient } from '@/lib/prisma';
import { fileUpdateSchema } from '@/lib/validation/file';

// Read First
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	const readResult = await prismaClient.file.findFirst({ where: { id: id, deletedAt: null } });
	if (!readResult) {
		return errorResponse('File not found', 404);
	}

	return new Response(readResult.byteArray as Buffer, {
		status: 200,
		headers: {
			'Content-Type': readResult.mimeType,
		},
	});
}

// Delete
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	const deleteResult = await prismaClient.file.update({ data: { deletedAt: new Date() }, where: { id: id } });
	if (!deleteResult) {
		return errorResponse('File not found', 404);
	}
	return messageResponse(`File deleted successfully`);
}

// Update
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	try {
		const rawData = await getJsonRequestBody(request);
		const validatedData = await fileUpdateSchema.validateAsync(rawData);
		const updateResult = await prismaClient.file.update({
			where: { id: id },
			data: validatedData,
		});
		return dataResponse(updateResult);
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		return errorResponse(errorMessage, 400);
	}
}
