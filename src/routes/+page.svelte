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
		<div class="flex w-full gap-2 p-2 pl-4 pt-2 bg-base-300 justify-center items-center">
			<div class="flex items-center w-2/3">
				<span>Shops</span>
				<div class="w-2/3">
					<div class="dropdown dropdown-start ml-5">
						<button tabindex="0" class="btn btn-soft">Add</button>
						<div
							tabindex="1"
							class="menu dropdown-content bg-base-300 rounded-box z-1 mt-4 w-52 p-2 shadow-sm"
						>
							<AddShop />
						</div>
					</div>
				</div>
			</div>
			<div class="items-center flex w-1/3 justify-center items-center gap-4 sm:block hidden">
				<span class="">City</span>
				<div class="dropdown dropdown-start dropdown-hover">
					<button tabindex="0" class="btn btn-soft rounded-field">Add</button>
					<div
						tabindex="1"
						class="menu dropdown-content bg-base-300 rounded-box z-1 mt-4 w-52 p-2 shadow-sm"
					>
						<AddCity />
					</div>
				</div>
			</div>
		</div>

		{#each $shops as shop}
			<ShopEntry {shop} />
		{/each}
	</div>
{:else}
	No Shops Available
{/if}
