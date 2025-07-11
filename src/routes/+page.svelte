<script lang="ts">
	import { search, index } from '$lib';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as InputOTP from '$lib/components/ui/input-otp/index.js';
	import DataTable from './data-table.svelte';
	import { columns } from './columns';
	import * as Tabs from '$lib/components/ui/tabs/index.js';

	let query = $state('');

	let base = $state<string[]>([]);

	function copy() {
		navigator.clipboard.writeText(base.join(''));
	}

	function telURI(): string {
		return `tel:${base.join('')}`;
	}

	$effect(() => {
		const cleanQuery = query.replace(/\D/g, '');
		if (cleanQuery.length === 7) {
			const prefix = parseInt(cleanQuery.slice(0, 3), 10);
			if (!isNaN(prefix)) {
				const result = search(prefix);
				if (result) {
					base = [result.number, cleanQuery.slice(3)];
					return;
				}
			}
		}
		base = [];
	});
</script>

<div
	class="mx-auto flex h-screen w-full max-w-[95vw] flex-col gap-4 py-4 md:max-w-2xl lg:max-w-3xl xl:max-w-4xl"
>
	<div class="flex flex-1 flex-col">
		<Tabs.Root value="convert" class="w-full">
			<Tabs.List class="grid w-full grid-cols-2">
				<Tabs.Trigger value="convert">Dialer</Tabs.Trigger>
				<Tabs.Trigger value="reference">Phonebook</Tabs.Trigger>
			</Tabs.List>

			<Tabs.Content value="convert">
				<form>
					<p class="text-muted-foreground mb-4 py-2 text-center text-sm font-medium">
						Enter a 7-digit DSN number to dial
					</p>
					<div
						class="flex justify-center transition-transform duration-300 sm:scale-110 md:scale-125 lg:scale-140"
					>
						<InputOTP.Root
							maxlength={7}
							bind:value={query}
							pattern="[0-9]"
							aria-invalid={query.length >= 3 && base.length === 0}
						>
							{#snippet children({ cells })}
								<InputOTP.Group>
									{#each cells.slice(0, 3) as cell, i (i)}
										<InputOTP.Slot {cell} />
									{/each}
								</InputOTP.Group>
								<InputOTP.Separator />
								<InputOTP.Group>
									{#each cells.slice(3, 7) as cell, i (i + 3)}
										<InputOTP.Slot {cell} />
									{/each}
								</InputOTP.Group>
							{/snippet}
						</InputOTP.Root>
					</div>
				</form>

				{#if base.length > 0}
					<div class="mx-auto mt-10 w-full max-w-md">
						<div class="bg-card rounded-xl border p-6 shadow-sm">
							<div class="flex flex-col space-y-1.5 pb-4">
								<h3 class="text-card-foreground text-center text-lg font-semibold">
									Commercial Number
								</h3>
								<p class="text-muted-foreground text-center text-sm">Your converted DSN number</p>
							</div>
							<div class="bg-muted flex items-center justify-center rounded-lg p-4 text-center">
								<div class="text-center text-3xl font-bold tracking-wider md:text-4xl">
									<span class="text-amber-500">{base[0]}</span>
									<span class="text-cyan-500">{base[1]}</span>
								</div>
							</div>
							<div class="mt-6 grid grid-cols-2 gap-4">
								<Button size="lg" variant="outline" class="gap-2 font-medium" onclick={copy}>
									<svg
										class="h-4 w-4"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
										<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
									</svg>
									Copy
								</Button>
								<Button variant="default" size="lg" class="gap-2 font-medium" href={telURI()}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 16 16"
										fill="currentColor"
										class="h-4 w-4"
									>
										<path
											d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
										/>
									</svg>
									Call
								</Button>
							</div>
						</div>
					</div>
				{/if}
			</Tabs.Content>

			<Tabs.Content value="reference">
				<DataTable data={index} {columns} />
			</Tabs.Content>
		</Tabs.Root>
	</div>
	<small class="mt-2 text-center text-sm text-orange-500"
		>(former) SSgt Harry "razzle" Randazzo</small
	>
</div>
