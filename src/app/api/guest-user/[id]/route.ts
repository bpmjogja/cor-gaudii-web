import { Prisma } from '@/generated/prisma';
import { dataResponse } from '@/lib/data-response';
import { errorResponse } from '@/lib/error-response';
import { getArgsFromRequest } from '@/lib/get-args-from-request';
import { getJsonRequestBody } from '@/lib/get-json-request-body';
import { messageResponse } from '@/lib/message-response';
import { prismaClient } from '@/lib/prisma';
import { guestUserUpdateSchema } from '@/lib/validation/guest-user';

// Read First
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	const readResult = await prismaClient.guestUser.findFirst({ where: { id: id, deletedAt: null } });
	if (!readResult) {
		return errorResponse('Guest User not found', 404);
	}

	return dataResponse(readResult);
}

// Delete
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	const deleteResult = await prismaClient.guestUser.update({ data: { deletedAt: new Date() }, where: { id: id } });
	if (!deleteResult) {
		return errorResponse('Guest User not found', 404);
	}
	return messageResponse(`Guest User ${deleteResult.name} deleted successfully`);
}

// Update
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	try {
		const rawData = await getJsonRequestBody(request);
		const validatedData = await guestUserUpdateSchema.validateAsync(rawData);
		const updateResult = await prismaClient.guestUser.update({
			where: { id: id },
			data: validatedData,
		});
		return dataResponse(updateResult);
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		return errorResponse(errorMessage, 400);
	}
}
