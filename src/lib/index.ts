import index from './dsn-index.json';

export interface DSN {
	prefix: number;
	number: string;
	location: string;
}

export const search = (prefix: number): DSN | undefined => {
	return index.find((item: DSN) => item.prefix === prefix);
};
