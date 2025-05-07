<script lang="ts">
	import { liveQuery } from 'dexie';
	import { db } from '../db';
	import type { City } from '../types';

	let shopName = '';
	let shopCity = '';

	let cities = liveQuery(() => db.cities.toArray());

	async function addShop() {
		try {
			const city = await db.cities.where('name').startsWith(shopCity);
			console.log(city);
		} catch (e) {
			console.log(e);
		}
	}
</script>

<span>City</span>
<form on:submit={addShop}>
	<label>Shop Name</label>
	<input type="text" bind:value={shopName} />
	<!-- <input type="text" bind:value={shopCity} /> -->
	<select class="dropdown">
		{#each $cities as city}
			<option value={city.id}>{city.name}</option>
		{/each}
	</select>
	<button type="submit"> Add </button>
</form>
