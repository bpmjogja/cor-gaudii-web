import { Prisma } from '@/generated/prisma';
import { prismaClient } from '@/lib/prisma';
import { articleCreateSchema } from '@/lib/validation/article';
import { dataResponse } from '@/lib/data-response';
import { errorResponse } from '@/lib/error-response';
import { getJsonRequestBody } from '@/lib/get-json-request-body';
import { getArgsFromRequest } from '@/lib/get-args-from-request';

// Create
export async function POST(request: Request) {
	try {
		const rawData = await getJsonRequestBody(request);
		const validatedData = await articleCreateSchema.validateAsync(rawData);
		const createdData = await prismaClient.article.create({
			data: validatedData,
		});
		return dataResponse(createdData, 201);
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		return errorResponse(errorMessage, 400);
	}
}

// Read All
export async function GET(request: Request) {
	const args = getArgsFromRequest<Prisma.ArticleFindManyArgs>(request);
	const readAllResult = await prismaClient.article.findMany({ where: { ...args.where, deletedAt: null }, ...args });
	return dataResponse(readAllResult);
}
