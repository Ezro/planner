<script>
	import { Page, currentPage, isSidebarOpen } from './stores.js';
	import Navbar from './Navbar.svelte';
	import Sidebar from './Sidebar.svelte';
	import Weeks from './Weeks.svelte';
	import Week from './Week.svelte';
</script>

<div class="app">
	<Sidebar />
	<Navbar />
	<div class="main-content" class:open={$isSidebarOpen}>
		{#if $currentPage === Page.Weeks}
			<Weeks />
		{:else if $currentPage === Page.Week}
			<Week />
		{/if}
	</div>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column; /* Stack components vertically */
		height: 100vh;
		overflow: hidden;
		margin: 0;
		padding: 0;
	}
	.main-content {
		flex-grow: 1;
		padding: 20px;
		margin-top: 60px; /* Adjust margin-top to match the navbar's height */
		transition: margin-left 0.3s;
	}
	.main-content.open {
		margin-left: 250px;
	}
</style>
