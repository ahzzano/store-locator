<script lang="ts">
	import { db } from '../db';

	let { city } = $props();
	let newCityName = '';
</script>

<div class="list-row w-full ml-0">
	<div class="w-full">
		<div class="text-lg">{city.name}</div>
	</div>

	<div class="dropdown dropdown-left ml-auto">
		<button class=" btn-ghost ml-auto">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="stroke-white fill-white size-[1.5em]"
				viewBox="0 0 448 512"
				><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path
					d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
				/></svg
			>
		</button>

		<div class="menu dropdown-content w-52 p-4 bg-base-100">
			<button onclick={() => db.cities.delete(city.id)} class=""> Delete</button>
			<div class="dropdown dropdown-left w-full">
				<button>Edit Name</button>
				<div class="dropdown-content w-52 p-4 bg-base-100">
					<form onsubmit={db.cities.update(city.id, { name: newCityName })}>
						<input class="input" type="text" bind:value={newCityName} placeholder="City Name" />
						<button type="submit btn btn-soft w-full">Update</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
