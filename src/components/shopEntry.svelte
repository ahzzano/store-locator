<script lang="ts">
	import { liveQuery } from 'dexie';
	import { db } from '../db';
	import type { Shop } from '../types';
	import Modal from './modal.svelte';
	import AddItem from './addItem.svelte';

	let { shop } = $props();

	let selectedShop = $state(shop.id);
	let showModal = $state(false);

	let items = liveQuery(async () => {
		const res = await db.items.toArray();
		const filtered = res.filter((item) => {
			return item.shop == shop.id;
		});
		return filtered;
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
		{shop.name}
	{/snippet}

	Items
	<div class="flex flex-col">
		{#if $items}
			<div class="flex flex-col">
				{#each $items as item}
					<div class="flex gap-2">
						<span>{item.name}</span>
						<span>{item.category}</span>
						<button
							onclick={() => {
								removeItem(item);
							}}>Remove</button
						>
					</div>
				{/each}
			</div>
		{:else}
			No items
		{/if}

		<AddItem itemShop={shop.id} />

		<button onclick={() => (showModal = false)} class="">Close</button>
	</div>

	Books
</Modal>
