<script lang="ts">
	import { liveQuery } from 'dexie';
	import { db } from '../../db';

	let cities = liveQuery(async () => db.cities.toArray());
</script>

<div class="flex flex-col">
	<div class="flex w-full gap-2 p-2 bg-base-300">
		<span class="w-2/3"> City </span>
	</div>
	{#each $cities as city}
		<span>{city.name}</span>
	{/each}
</div>
