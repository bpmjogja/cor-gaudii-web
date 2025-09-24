import { defineConfig } from 'prisma/config';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
export default defineConfig({
	schema: path.join('prisma', 'schema.prisma'),
	migrations: {
		path: path.join('prisma', 'migrations'),
		seed: 'tsx prisma/seed.ts',
	},
});
