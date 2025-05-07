<script lang="ts">
	import AddShop from '../components/addShop.svelte';
	import AddCity from '../components/addCity.svelte';

	import { liveQuery } from 'dexie';
	import { db } from '../db';
	import type { Shop } from '../types';
	import ShopEntry from '../components/shopEntry.svelte';
	import CityEntry from '../components/cityEntry.svelte';
	import Navbar from '../components/navbar.svelte';

	let shops = liveQuery(async () => {
		const order = await db.shops.orderBy('cityId').toArray();
		const shopsGrouped = (await db.shops.toArray()).reduce((acc, item) => {
			const key = item.city;
			acc[key] = acc[key] || [];
			acc[key].push(item);
			return acc;
		}, {});
		const shops = Object.values(shopsGrouped).flat();

		const resolvedShops = await Promise.all(
			shops.map(async (shop) => {
				const city = await db.cities.get(shop.city);
				const fixedShop: Shop = { ...shop, city };
				return fixedShop;
			})
		);

		return resolvedShops;
	});

	let shopCount = liveQuery(async () => db.shops.count());

	let cities = liveQuery(async () => db.cities.toArray());
	let citiesCount = liveQuery(async () => db.cities.count());
	let itemCount = liveQuery(async () => db.items.count());
	console.log(citiesCount);
</script>

<div class="sm:w-full w-3/5 sm:ml-0">
	<div class="card bg-base-100 w-96 shadow-sm">
		<div class="card-body">
			<div>while adventuring...</div>

			<div class="flex">
				<div class="stats">
					<div class="stat">
						<div class="stat-title">You Visited</div>
						<div class="stat-value">{$citiesCount}</div>
						<div class="stat-desc">cities</div>
					</div>
					<div class="stat">
						<div class="stat-title">You Visited</div>
						<div class="stat-value">{$shopCount}</div>
						<div class="stat-desc">shops</div>
					</div>
					<div class="stat">
						<div class="stat-title">You Catalogued</div>
						<div class="stat-value">{$itemCount}</div>
						<div class="stat-desc">items</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="w-full">
	<div class="flex flex-col md:flex-row gap-5">
		<div class="card w-full md:w-1/2 shadow-sm">
			<div class="card-body">
				<div class="flex w-full gap-2 p-2 pl-4 pt-2 bg-base-300 items-center">
					<div class="flex items-center w-full">
						<span>Shops</span>
						<div class="ml-auto">
							<div class="dropdown dropdown-end">
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
				</div>

				{#if $shops}
					<div class="list w-full">
						{#each $shops as shop}
							<ShopEntry {shop} />
						{/each}
					</div>
				{:else}
					No Shops Available
				{/if}
			</div>
		</div>
		<div class="card w-full md:w-1/2 rounded shadow-sm">
			<div class="card-body">
				<div class="flex w-full gap-2 p-2 pl-4 pt-2 bg-base-300 items-center">
					<div class="flex items-center gap-2 w-full">
						<div>Cities</div>
						<div class="ml-auto">
							<div class="dropdown dropdown-end">
								<button tabindex="0" class="btn btn-soft">Add</button>
								<div
									tabindex="1"
									class="menu dropdown-content bg-base-300 rounded-box z-1 mt-4 w-52 p-2 shadow-sm"
								>
									<AddCity />
								</div>
							</div>
						</div>
					</div>
				</div>

				{#if $cities}
					<div class="list w-full gap-4">
						{#each $cities as city}
							<CityEntry {city} />
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
