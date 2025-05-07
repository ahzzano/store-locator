<script lang="ts">
	import AddShop from '../components/addShop.svelte';
	import AddCity from '../components/addCity.svelte';

	import { liveQuery } from 'dexie';
	import { db } from '../db';
	import type { Shop } from '../types';
	import ShopEntry from '../components/shopEntry.svelte';
	import AddItem from '../components/addItem.svelte';

	let shops = liveQuery(async () => {
		const shops = await db.shops.toArray();
		const resolvedShops = await Promise.all(
			shops.map(async (shop) => {
				const city = await db.cities.get(shop.city);
				const fixedShop: Shop = { ...shop, city };
				return fixedShop;
			})
		);

		return resolvedShops;
	});

	let items = liveQuery(async () => db.items.toArray());

	async function removeShop(shop: Shop) {
		try {
			await db.shops.delete(shop.id);
		} catch {}
	}
</script>

<AddCity />
<AddShop />
<AddItem />

Shops
{#if $shops}
	<div class="flex flex-col w">
		{#each $shops as shop}
			<ShopEntry {shop} />
		{/each}
	</div>
{:else}
	No Shops Available
{/if}

{#if $items}
	{#each $items as item}
		{item.name}
		{item.shop}
	{/each}
{/if}
