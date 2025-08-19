import { File } from '@/generated/prisma/client';

export interface FileInterface extends Omit<File, 'createdAt' | 'updatedAt'> {}
