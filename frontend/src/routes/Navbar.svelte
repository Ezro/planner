<script>
	import Sidebar from './Sidebar.svelte';
	import { navbarTitle } from './stores.js';

	let searchQuery = '';
	let sidebarComponent;

	function handleSearch(event) {
		searchQuery = event.target.value;
	}
</script>

<Sidebar bind:this={sidebarComponent} />
<div class="navbar">
	<button class="hamburger-button" on:click={sidebarComponent.toggleSidebar()}>☰</button>
	<div class="navbar-label">
		{$navbarTitle}
	</div>
	<input
		type="text"
		class="search-input"
		placeholder="Search..."
		bind:value={searchQuery}
		on:input={handleSearch}
	/>
</div>

<style>
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 20px;
		background-color: #f5020262;
		color: white;
		z-index: 2; /* Ensure navbar is above other content */
	}
	.navbar-label {
		font-size: large;
		color: black;
	}

	.hamburger-button {
		background: none;
		border: none;
		font-size: 24px;
		cursor: pointer;
	}

	.search-input {
		padding: 8px;
		border: none;
		border-radius: 4px;
		background-color: #444;
		color: white;
		margin-right: 40px;
	}
</style>
