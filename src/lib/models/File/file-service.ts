import { FileInterface } from './file-interface';
import { Creatable } from '@/lib/operation-interfaces/creatable';
import { Readable } from '@/lib/operation-interfaces/readable';
import { Deletable } from '@/lib/operation-interfaces/deletable';
import { prismaClient } from '@/lib/prisma';
import { Validatable } from '@/lib/operation-interfaces/validatable';

class FileService implements Creatable<FileInterface>, Readable<FileInterface>, Deletable<FileInterface>, Validatable<FileInterface> {
	private static instance: FileService;

	private constructor() {}

	public static getInstance(): FileService {
		if (!FileService.instance) {
			FileService.instance = new FileService();
		}
		return FileService.instance;
	}

	public async create(data: FileInterface): Promise<FileInterface> {
		return prismaClient.file.create({
			data: data,
		});
	}

	public async readMany({
		limit,
		fields,
		filter,
		sort,
		pagination,
	}: {
		limit?: number;
		fields?: (keyof FileInterface)[];
		filter?: Partial<Record<keyof FileInterface, FileInterface[keyof FileInterface]>>;
		sort?: { key: keyof FileInterface; order: 'asc' | 'desc' };
		pagination?: { page: number; dataPerPage: number };
	}): Promise<Partial<FileInterface>[]> {
		return prismaClient.file.findMany({
			take: limit,
			select: fields ? Object.fromEntries(fields.map((field) => [field, true])) : undefined,
			where: filter ? Object.fromEntries(Object.entries(filter).map(([key, value]) => [key, { equals: value }])) : undefined,
			orderBy: sort ? { [sort.key]: sort.order } : undefined,
			skip: pagination ? (pagination.page - 1) * pagination.dataPerPage : undefined,
		});
	}

	public async readOne(id: string, { fields }: { fields?: (keyof FileInterface)[] }): Promise<Partial<FileInterface> | null> {
		return prismaClient.file.findUnique({
			where: { id },
			select: fields ? Object.fromEntries(fields.map((field) => [field, true])) : undefined,
		});
	}

	public async delete(id: string): Promise<FileInterface> {
		return prismaClient.file.delete({
			where: { id },
		});
	}

	public validate(data: FileInterface): { isValid: boolean; errors: Partial<Record<keyof FileInterface, string[]>> } {
		const errors: Partial<Record<keyof FileInterface, string[]>> = {};
		if (!data.mimeType) {
			errors.mimeType = ['Mime type is required.'];
		}
		if (!data.byteArray || data.byteArray.length === 0) {
			errors.byteArray = ['Byte array cannot be empty.'];
		}
		return { isValid: Object.keys(errors).length === 0, errors };
	}
}

export default FileService.getInstance();
