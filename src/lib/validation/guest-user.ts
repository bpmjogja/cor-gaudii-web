import Joi from 'joi';
import { GuestUser } from '@/generated/prisma';

export const guestUserCreateSchema: Joi.ObjectSchema<GuestUser> = Joi.object<GuestUser>({
	id: Joi.string().forbidden(),
	phone: Joi.string().alphanum().min(10).max(15).required(),
	name: Joi.string().min(2).max(100).required(),
	createdAt: Joi.date().forbidden(),
	updatedAt: Joi.date().forbidden(),
	deletedAt: Joi.date().forbidden(),
});

export const guestUserUpdateSchema: Joi.ObjectSchema<GuestUser> = Joi.object<GuestUser>({
	id: Joi.string().forbidden(),
	phone: Joi.string().alphanum().min(10).max(15).optional(),
	name: Joi.string().min(2).max(100).optional(),
	createdAt: Joi.date().forbidden(),
	updatedAt: Joi.date().forbidden(),
	deletedAt: Joi.date().forbidden(),
}).min(1);
