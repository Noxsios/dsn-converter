import type { DSN } from '$lib';
import type { ColumnDef } from '@tanstack/table-core';

export const columns: ColumnDef<DSN>[] = [
	{
		accessorKey: 'dsn',
		header: 'DSN'
	},
	{
		accessorKey: 'mask',
		header: 'Phone Number'
	},
	{
		accessorKey: 'location',
		header: 'Location'
	}
];
