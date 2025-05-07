<script>
	let { showModal = $bindable(), header, children } = $props();
	let dialog = $state();

	$effect(() => {
		if (showModal) {
			dialog.showModal();
		} else {
			dialog.close();
		}
	});
</script>

<dialog bind:this={dialog} onclose={() => (showModal = false)} class="modal">
	<div class="modal-box w-11/12 max-w-5xl">
		<div class=" flex flex-col">
			{@render header?.()}
			{@render children?.()}
		</div>
	</div>
</dialog>
