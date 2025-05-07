<script lang="ts">
	import { liveQuery } from 'dexie';
	import { db } from '../db';
	import type { City } from '../types';
	import Modal from './modal.svelte';

	let shopName = '';
	let shopCity = 0;

	let cities = liveQuery(() => db.cities.toArray());
	let showModal = $state(false);

	async function addShop() {
		try {
			const shopId = db.shops.add({
				city: shopCity,
				name: shopName
			});
		} catch (e) {
			console.log(e);
		}
	}
</script>

<form onsubmit={addShop} class="flex flex-col gap-2">
	<input type="text" bind:value={shopName} class="input" placeholder="shop name" />
	<select class="select" bind:value={shopCity} placeholder="city">
		{#each $cities as city}
			<option value={city.id}>{city.name}</option>
		{/each}
	</select>
	<button type="submit" class="btn"> Add </button>
</form>
