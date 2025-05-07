<script lang="ts">
	import { db } from '../db';
	import type { Shop } from '../types';
	import Modal from './modal.svelte';

	let { shop } = $props();

	let isOpen = false;

	let close = () => {};

	async function removeShop(shop: Shop) {
		try {
			await db.shops.delete(shop.id);
		} catch {}
	}
</script>

<div class="flex w-full gap-2">
	<button
		class="w-2/3"
		onclick={() => {
			isOpen = true;
			console.log(isOpen);
		}}>{shop.name}</button
	>
	<span class="w-1/3">{shop.city.name}</span>
	<button
		class="w-1/10"
		onclick={async () => {
			await removeShop(shop);
		}}>Remove</button
	>
</div>

<Modal
	open={isOpen}
	close={() => {
		isOpen = false;
	}}
/>
