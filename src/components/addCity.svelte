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

<form on:submit={addCity} class="flex flex-col items-center gap-5">
	<input type="text" bind:value={cityName} required class="input w-full" placeholder="City Name" />
	<button type="submit" class="btn"> Add </button>
</form>
