<script lang="ts">
	import { liveQuery } from 'dexie';
	import { db } from '../db';
	import type { City } from '../types';

	let shopName = '';
	let shopCity = 0;

	let cities = liveQuery(() => db.cities.toArray());

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

<span>City</span>
<form on:submit={addShop}>
	<span>Shop Name</span>
	<input type="text" bind:value={shopName} class="input" />
	<select class="select-ghost" bind:value={shopCity}>
		{#each $cities as city}
			<option value={city.id}>{city.name}</option>
		{/each}
	</select>
	<button type="submit"> Add </button>
</form>
