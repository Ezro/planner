<script>
	import { Page, currentPage, isSidebarOpen, navbarTitle, weeksData } from './stores.js';
	import Week from './Week.svelte';

	let displayYearWeeks = {};
	let weekComponent;

	export function toggleSidebar() {
		$isSidebarOpen = !$isSidebarOpen;
	}

	function closeSidebar() {
		$isSidebarOpen = false;
	}

	function toggleYearDropdown(year) {
		if (year in displayYearWeeks) {
			delete displayYearWeeks[year];
			displayYearWeeks = displayYearWeeks;
		} else {
			displayYearWeeks[year] = $weeksData[year];
		}
	}

	function selectWeek(year, week) {
		$navbarTitle = `${year} - ${week}`;
		$currentPage = Page.Week;
		weekComponent.refresh(year, week);
	}
</script>

<Week bind:this={weekComponent} />
<div class="sidebar" class:open={$isSidebarOpen}>
	<button class="close-button" on:click={closeSidebar}>X</button>
	{#if $weeksData}
		{#each Object.entries($weeksData) as [year, yearData]}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="year-weeks-dropdown-container">
				<div class="year-weeks-dropdown" on:click={toggleYearDropdown(year)}>
					<h2>Year: {year}</h2>
				</div>
				{#if year in displayYearWeeks}
					{#each Object.entries(displayYearWeeks[year]) as [week, yearWeekData]}
						<div class="year-week" on:click={selectWeek(year, week)}>
							<h3>Week: {week}</h3>
						</div>
					{/each}
				{/if}
			</div>
		{/each}
	{/if}
</div>

<style>
	.sidebar {
		position: fixed;
		top: 54px; /* Adjust the top value to match the navbar's height */
		left: -250px; /* Start off-screen */
		width: 250px;
		height: calc(100vh - 54px); /* Adjust the height to account for the navbar */
		background-color: #ff0000cb;
		color: white;
		transition: left 0.3s;
		z-index: 1; /* Ensure sidebar is behind other content */
	}

	.year-weeks-dropdown-container {
		display: flex;
		flex-direction: column;
		border: 1px solid #ccc;
		/* padding: 5px 25px; */
		/* margin: 35px 5px; */
		color: white;
	}

	.year-weeks-dropdown {
		display: flex;
		flex-direction: column;
		border: 1px solid #ccc;
		padding: 0px 25px;
		margin: 35px 5px;
		color: white;
	}

	.year-week {
		display: flex;
		flex-direction: column;
		border: 1px solid #ccc;
		/* padding: 5px 25px; */
		margin: 5px 5px;
		color: white;
		z-index: 2;
	}

	.open {
		left: 0;
	}

	.close-button {
		position: absolute;
		top: 10px;
		right: 10px;
		background: none;
		border: none;
		color: white;
		cursor: pointer;
	}
</style>
