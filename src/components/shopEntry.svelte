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

<div class="flex w-full gap-2 pr-5 pl-5 justify-center items-center">
	<button
		class="w-2/3 text-left btn-ghost"
		onclick={() => {
			showModal = true;
			selectedShop = shop.id;
		}}
	>
		{shop.name}
	</button>
	<span class="w-1/3 sm:block hidden">{shop.city.name}</span>
	<button
		class="w-1/7 sm:w-1/10 btn"
		onclick={async () => {
			await removeShop(shop);
		}}>Remove</button
	>
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
					<div class="flex flex-col">
						{#each $items as item}
							<div class="flex gap-2 w-full sm:pl-10 sm:pr-10">
								<span class="sm:w-1/2 w-3/5">{item.name}</span>
								<span class="sm:w-1/2 w-1/5">{item.price}</span>
								<button
									onclick={() => {
										removeItem(item);
									}}
									class="btn">Remove</button
								>
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
