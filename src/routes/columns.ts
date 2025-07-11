import type { DSN } from '$lib';
import { renderSnippet } from '$lib/components/ui/data-table';
import type { ColumnDef, Row } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';

const code = (content: string) =>
	`<pre class="bg-zinc-200 dark:bg-zinc-800 px-1 py-1 rounded text-center">${content}</pre>`;

function codeRow(field: string) {
	return ({ row }: { row: Row<DSN> }) => {
		return renderSnippet(
			createRawSnippet<[string]>((get) => {
				return {
					render: () => code(get())
				};
			}),
			row.getValue(field)
		);
	};
}

export const columns: ColumnDef<DSN>[] = [
	{
		accessorKey: 'prefix',
		header: 'DSN',
		cell: codeRow('prefix')
	},
	{
		accessorKey: 'number',
		header: 'Phone Number',
		cell: codeRow('number')
	},
	{
		accessorKey: 'location',
		header: 'Location'
	}
];
