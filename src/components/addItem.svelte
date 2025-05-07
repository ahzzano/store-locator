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

<form onsubmit={addItem} class="flex flex-col">
	<input bind:value={itemName} class="input" placeholder="name" />
	<input bind:value={itemCategory} class="input" placeholder="category" />
	<input bind:value={itemPrice} type="number" class="input" placeholder="price" />
	<button type="submit">Add Item</button>
</form>
