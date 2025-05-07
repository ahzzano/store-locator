<script lang="ts">
	import { liveQuery } from 'dexie';
	import AddShop from '../components/addShop.svelte';
	import { db } from '../db';

	let cityName = '';
	async function addCity() {
		console.log(cityName);
		try {
			const city = await db.cities.add({ name: cityName });
			console.log(city);
		} catch {}
	}

	db.cities.clear();
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<form on:submit={addCity}>
	<input type="text" bind:value={cityName} required />
	<button type="submit" class="bg-amber-50"> Add City </button>
</form>

<AddShop />
