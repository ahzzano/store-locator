<script lang="ts">
	import { liveQuery } from 'dexie';
	import { db } from '../db';
	import type { Shop, Item } from '../types';
	import Modal from './modal.svelte';
	import AddItem from './addItem.svelte';

	let { shop } = $props();

	let selectedShop = $state(shop.id);
	let showModal = $state(false);

	let categories = liveQuery(async () => {
		const res = await db.items.toArray();
		const filtered = res.filter((item) => {
			return item.shop == shop.id;
		});

		const categories = new Set(filtered.map((items) => items.category));
		console.log(categories);

		return categories;
	});

	let selectedCategory = $state('all');

	let items = liveQuery(async () => {
		if (selectedCategory == 'all') {
			const res = await db.items.toArray();
			const filtered = res.filter((item) => {
				return item.shop == shop.id;
			});
			return filtered;
		} else {
			const res = await db.items.where('category').equalsIgnoreCase(selectedCategory).toArray();
			const filtered = res.filter((item) => {
				return item.shop == shop.id;
			});
			return filtered;
		}
	});

	async function removeShop(shop: Shop) {
		try {
			await db.shops.delete(shop.id);
		} catch {}
	}

	async function removeItem(item: Item) {
		try {
			await db.items.delete(item.id);
		} catch {}
	}
</script>

<div class="list-row gap-4 w-full">
	<div class="w-full">
		<div class="w-full text-lg" role="button" onclick={() => (showModal = true)}>{shop.name}</div>
		<div class="text-xs">{shop.city.name}</div>
	</div>

	<button
		class="ml-auto btn-ghost ml-10"
		onclick={async () => {
			await removeShop(shop);
		}}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 448 512"
			class="stroke-white fill-white size-[1.5em]"
			><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path
				d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"
			/>
		</svg>
	</button>
</div>

<Modal bind:showModal>
	{#snippet header()}
		<span class="text-3xl font-bold">
			{shop.name}
		</span>
	{/snippet}

	<span class="text-xl mb-2">Items</span>
	<div class="flex flex-col sm:flex-row">
		<div class="w-full sm:w-2/3">
			<div class="flex flex-col overflow-auto max-h-9/10">
				{#if $items && $items.length > 0}
					<div class="list">
						{#each $items as item}
							<div class="list-row gap-2 w-full sm:pl-10 sm:pr-10">
								<div class="w-full">
									<div class="font-bold">{item.name}</div>
									<div class="text-xs">{item.price}</div>
								</div>
								<button
									onclick={() => {
										removeItem(item);
									}}
									class="btn btn-ghost ml-auto"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 448 512"
										class="stroke-white fill-white size-[1.5em]"
										><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path
											d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"
										/>
									</svg>
								</button>
							</div>
						{/each}
					</div>
				{:else}
					<span class="w-full text-center pt-5 pb-10 sm:pb-0"> No items </span>
				{/if}
			</div>
		</div>
		<div class="hidden sm:block border-l-gray-500 border-1 ml-2 mr-4 border-dashed" />
		<div class="w-full sm:w-1/3">
			<AddItem itemShop={shop.id} />
		</div>
	</div>

	<!-- Books -->
	<div class="justify-center items-center w-full">
		<button onclick={() => (showModal = false)} class="btn w-1/4">Close</button>
	</div>
</Modal>
