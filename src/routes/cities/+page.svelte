<script lang="ts">
	import { liveQuery } from 'dexie';
	import { db } from '../../db';
	import AddCity from '../../components/addCity.svelte';

	let cities = liveQuery(async () => db.cities.toArray());
</script>

<div class="flex flex-col w">
	<div class="flex w-full gap-2 p-2 pl-4 bg-base-300 justify-center items-center">
		<span>City</span>
		<div class="w-2/3">
			<div class="dropdown dropdown-start dropdown-hover">
				<button tabindex="0" class="btn btn-ghost rounded-field">Add</button>
				<div
					tabindex="1"
					class="menu dropdown-content bg-base-300 rounded-box z-1 mt-4 w-52 p-2 shadow-sm"
				>
					<AddCity />
				</div>
			</div>
		</div>
	</div>

	<div class="flex flex-col gap-5 justify-center sm:pl-5 sm:pr-5 mt-2">
		{#each $cities as city}
			<span>{city.name}</span>
		{/each}
	</div>
</div>
