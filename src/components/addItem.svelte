<script lang="ts">
	import { db } from '../db';
	import { liveQuery } from 'dexie';

	let { itemShop } = $props();

	let itemName = '';
	let itemCategory = '';
	let itemPrice = 0;

	async function addItem() {
		try {
			await db.items.add({
				name: itemName,
				price: itemPrice,
				shop: itemShop,
				category: itemCategory
			});
		} catch (e) {}
	}
</script>

<form onsubmit={addItem} class="flex flex-col gap-2">
	<span class="text-center w-full hidden sm:block"> Add Item </span>
	<input bind:value={itemName} class="input w-full" placeholder="name" />
	<input bind:value={itemCategory} class="input w-full" placeholder="category" />
	<input bind:value={itemPrice} type="number " class="input w-full" placeholder="price" />
	<button type="submit" class="btn">Add</button>
</form>
