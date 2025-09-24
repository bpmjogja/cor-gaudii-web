import Joi from 'joi';
import { File } from '@/generated/prisma';

export const fileCreateSchema: Joi.ObjectSchema<File> = Joi.object<File>({
	id: Joi.string().forbidden(),
	byteArray: Joi.binary().required(),
	mimeType: Joi.string().valid('image/jpeg', 'image/png', 'application/pdf').required(),
	createdAt: Joi.date().forbidden(),
	updatedAt: Joi.date().forbidden(),
	deletedAt: Joi.date().forbidden(),
});

export const fileUpdateSchema: Joi.ObjectSchema<Partial<File>> = fileCreateSchema;
