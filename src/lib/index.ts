import index from './dsn-index.json';

export interface DSN {
	prefix: number;
	number: string;
	location: string;
}

const search = (prefix: number): DSN | undefined => {
	return index.find((item: DSN) => item.prefix === prefix);
};

export { index, search };
