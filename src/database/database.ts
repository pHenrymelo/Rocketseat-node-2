import { type Knex, knex as knexSetup } from 'knex';
import { env } from '../env/index';

export const config: Knex.Config = {
	client: 'sqlite3',
	connection: {
		filename: env.DATABASE_URL,
	},
	useNullAsDefault: true,
	migrations: {
		extension: 'ts',
		directory: './db/migrations',
	},
};

export const knex = knexSetup(config);
