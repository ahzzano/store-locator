<script lang="ts">
	import AddShop from '../components/addShop.svelte';
	import AddCity from '../components/addCity.svelte';

	import { liveQuery } from 'dexie';
	import { db } from '../db';
	import type { Shop } from '../types';
	import ShopEntry from '../components/shopEntry.svelte';

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
</script>

{#if $shops}
	<div class="flex flex-col w">
		<div class="flex w-full gap-2 p-2 bg-base-300">
			<span class="w-2/3"> Shop </span>
			<span class="w-1/3 sm:block hidden">City</span>
		</div>

		{#each $shops as shop}
			<ShopEntry {shop} />
		{/each}
	</div>
{:else}
	No Shops Available
{/if}
