<script lang="ts">
	import { db } from '../db';
	import { liveQuery } from 'dexie';

	let itemName = '';
	let itemShop = 0;
	let itemCategory = '';
	let itemPrice = 0;

	let shops = liveQuery(() => db.shops.toArray());

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

<form on:submit={addItem}>
	<input bind:value={itemName} class="input" placeholder="name" />
	<input bind:value={itemCategory} class="input" placeholder="category" />
	<input bind:value={itemPrice} type="number" class="input" placeholder="price" />
	<select class="dropdown" bind:value={itemShop}>
		{#each $shops as shop}
			<option value={shop.id}>{shop.name}</option>
		{/each}
	</select>
	<button type="submit">Add Item</button>
</form>
