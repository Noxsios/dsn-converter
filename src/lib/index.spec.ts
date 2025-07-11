import { describe, it, expect } from 'vitest';
import { search } from './index';

describe('DSN Search', () => {
	it('should find a known DSN prefix', () => {
		const result = search(226);
		expect(result).toBeDefined();
		expect(result?.location).toBe('RAF Lakenheath');
	});

	it('should not find an unknown DSN prefix', () => {
		const result = search(999);
		expect(result).toBeUndefined();
	});

	it('should handle non-numeric input gracefully', () => {
		// @ts-expect-error - Testing invalid input
		const result = search('abc');
		expect(result).toBeUndefined();
	});
});
