import Joi, { AnySchema } from 'joi';
import { prismaClient } from '@/lib/prisma';
import { Prisma } from '@/generated/prisma';
import lodash from 'lodash';

export function joiUniqueChecker<T extends AnySchema>(baseSchema: T, model: Prisma.ModelName, field: string, excludeId?: string): T {
	return baseSchema.external(async (value) => {
		if (!value) return value;
		//eslint-disable-next-line @typescript-eslint/no-explicit-any
		const modelClient: any = (prismaClient as any)[lodash.camelCase(model)];
		const exists = await modelClient.findFirst({
			where: { [field]: value, ...(excludeId ? { id: { not: excludeId } } : {}) },
		});
		if (exists) {
			throw new Joi.ValidationError(
				`${lodash.startCase(field)} "${value}" already exists`,
				[
					{
						message: `${lodash.startCase(field)} "${value}" already exists`,
						path: [field],
						type: 'unique',
						context: { value },
					},
				],
				value
			);
		}
		return value;
	}) as T;
}
