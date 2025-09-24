import Joi from 'joi';
import { joiUniqueChecker } from '@/lib/joi-unique-checker';
import { InternalUser } from '@/generated/prisma';

export const internalUserCreateSchema: Joi.ObjectSchema<InternalUser> = Joi.object<InternalUser>({
	id: Joi.string().forbidden(),
	email: joiUniqueChecker(Joi.string().email().required(), 'InternalUser', 'email'),
	phone: joiUniqueChecker(Joi.string().alphanum().min(10).max(15).required(), 'InternalUser', 'phone'),
	password: Joi.string().min(8).required(),
	name: Joi.string().min(2).max(100).required(),
	role: Joi.string().forbidden(),
	imageFileId: Joi.string().optional(),
	bio: Joi.string().max(500).optional(),
	birthDate: Joi.date().optional(),
	lastSessionRevocationAt: Joi.date().forbidden(),
	createdAt: Joi.date().forbidden(),
	updatedAt: Joi.date().forbidden(),
	deletedAt: Joi.date().forbidden(),
});

export function internalUserUpdateSchema(id: string): Joi.ObjectSchema<InternalUser> {
	return Joi.object<InternalUser>({
		id: Joi.string().forbidden(),
		email: joiUniqueChecker(Joi.string().email().optional(), 'InternalUser', 'email', id),
		phone: joiUniqueChecker(Joi.string().alphanum().min(10).max(15).optional(), 'InternalUser', 'phone', id),
		password: Joi.string().min(8).optional(),
		name: Joi.string().min(2).max(100).optional(),
		role: Joi.string().forbidden(),
		imageFileId: Joi.string().optional(),
		bio: Joi.string().max(500).optional(),
		birthDate: Joi.date().optional(),
		lastSessionRevocationAt: Joi.date().forbidden(),
		createdAt: Joi.date().forbidden(),
		updatedAt: Joi.date().forbidden(),
		deletedAt: Joi.date().forbidden(),
	}).min(1);
}
