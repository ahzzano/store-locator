<script lang="ts">
	import AddShop from '../components/addShop.svelte';
	import AddCity from '../components/addCity.svelte';

	import { liveQuery } from 'dexie';
	import { db } from '../db';
	import type { Shop } from '../types';

	let shops = liveQuery(async () => {
		const shops = await db.shops.toArray();
		const resolvedShops = await Promise.all(
			shops.map(async (shop) => {
				const city = await db.cities.get(shop.city);
				return { ...shop, city };
			})
		);

		return resolvedShops;
	});

	async function removeShop(shop: Shop) {
		try {
			await db.shops.delete(shop.id);
		} catch {}
	}
</script>

<AddCity />
<AddShop />

Shops
{#if $shops}
	<div class="flex flex-col w">
		{#each $shops as shop}
			<div class="flex w-full gap-2">
				<span class="w-1/2">{shop.name}</span>
				<span class="w-1/3">{shop.city.name}</span>
				<button
					class="w-1/10"
					on:click={async () => {
						await removeShop(shop);
					}}>Remove</button
				>
			</div>
		{/each}
	</div>
{:else}
	No Shops Available
{/if}
