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
		const res = db.items.orderBy('category').uniqueKeys();
		return res;
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

<div class="flex w-full gap-2">
	<button
		class="w-2/3"
		onclick={() => {
			showModal = true;
			selectedShop = shop.id;
		}}
	>
		{shop.name}
	</button>
	<span class="w-1/3">{shop.city.name}</span>
	<button
		class="w-1/10"
		onclick={async () => {
			await removeShop(shop);
		}}>Remove</button
	>
</div>

<Modal bind:showModal>
	{#snippet header()}
		<span>
			{shop.name}
		</span>
	{/snippet}

	Items
	<div class="flex">
		<div class="w-2/3">
			<div class="flex gap-2">
				{#if $items && $items.length > 0}
					{#if $categories && $categories.length != 0}
						<button
							onclick={() => {
								selectedCategory = 'all';
							}}>all</button
						>
						{#each $categories as cat}
							<button
								onclick={() => {
									selectedCategory = cat;
								}}
							>
								{cat}
							</button>
						{/each}
					{/if}
				{/if}
			</div>
			<div class="flex flex-col">
				{#if $items && $items.length > 0}
					<div class="flex flex-col">
						{#each $items as item}
							<div class="flex gap-2 w-full">
								<span class="w-3/5">{item.name}</span>
								<span class="w-1/5">{item.price}</span>
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
					<span class="w-full text-center pt-5"> No items </span>
				{/if}
			</div>
		</div>
		<div class="border-l-gray-500 border-1 ml-2 mr-4 border-dashed" />
		<div class="w-1/3">
			Add Item
			<AddItem itemShop={shop.id} />
		</div>
	</div>

	<!-- Books -->
	<div class="justify-center items-center w-full">
		<button onclick={() => (showModal = false)} class="btn w-1/4">Close</button>
	</div>
</Modal>
