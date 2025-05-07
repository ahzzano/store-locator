<script lang="ts">
	import { liveQuery } from 'dexie';
	import AddShop from '../components/addShop.svelte';
	import { db } from '../db';
	import type { Shop } from '../types';

	let cityName = '';
	let shops = liveQuery(async () => {
		const shops = await db.shops.toArray();
		const resolvedShops = await Promise.all(
			shops.map(async (shop) => {
				const city = await db.cities.get(shop.city); // Get the related city by cityId
				return { ...shop, city }; // Return the shop with city info attached
			})
		);

		return resolvedShops;
	});

	async function addCity() {
		console.log(cityName);
		try {
			const city = await db.cities.add({ name: cityName });
			console.log(city);
		} catch {}
	}

	async function removeShop(shop: Shop) {
		try {
			await db.shops.delete(shop.id);
		} catch {}
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<form on:submit={addCity}>
	<input type="text" bind:value={cityName} required />
	<button type="submit" class="bg-amber-50"> Add City </button>
</form>

<AddShop />

Shops
{#if $shops}
	<div class="flex flex-col w">
		{#each $shops as shop}
			<div class="flex gap-5">
				<span>{shop.name}</span>
				<span>{shop.city.name}</span>
				<button
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
