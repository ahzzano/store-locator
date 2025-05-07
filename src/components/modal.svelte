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
	<div class="modal-box">
		{@render header?.()}
		{@render children?.()}
	</div>
</dialog>
