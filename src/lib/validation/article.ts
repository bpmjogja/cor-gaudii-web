import Joi from 'joi';
import { Article, ArticleCategory } from '@/generated/prisma';

export const articleCreateSchema: Joi.ObjectSchema<Article> = Joi.object<Article>({
	id: Joi.string().forbidden(),
	title: Joi.string().min(2).max(100).required(),
	content: Joi.string().min(50).required(),
	authorId: Joi.string().required(),
	mainImageId: Joi.string().required(),
	tags: Joi.array().items(Joi.string()).optional(),
	categories: Joi.array()
		.items(Joi.string())
		.valid(...Object.values(ArticleCategory))
		.optional(),
	publishedAt: Joi.date().optional(),
	createdAt: Joi.date().forbidden(),
	updatedAt: Joi.date().forbidden(),
	deletedAt: Joi.date().forbidden(),
});

export const articleUpdateSchema: Joi.ObjectSchema<Article> = Joi.object<Article>({
	id: Joi.string().forbidden(),
	title: Joi.string().min(2).max(100).optional(),
	content: Joi.string().min(50).optional(),
	authorId: Joi.string().optional(),
	mainImageId: Joi.string().optional(),
	tags: Joi.array().items(Joi.string()).optional(),
	categories: Joi.array()
		.items(Joi.string())
		.valid(...Object.values(ArticleCategory))
		.optional(),
	publishedAt: Joi.date().optional(),
	createdAt: Joi.date().forbidden(),
	updatedAt: Joi.date().forbidden(),
	deletedAt: Joi.date().forbidden(),
}).min(1);
