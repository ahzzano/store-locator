<script lang="ts">
	import { db } from '../db';

	async function addCity() {
		console.log(cityName);
		try {
			const city = await db.cities.add({ name: cityName });
			console.log(city);
		} catch {}
	}
	let cityName = '';
</script>

<form on:submit={addCity}>
	<input type="text" bind:value={cityName} required />
	<button type="submit" class="bg-amber-50"> Add City </button>
</form>
