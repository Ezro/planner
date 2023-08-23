<script>
	import { serverUrl, weeksData } from './stores.js';
	import { onMount } from 'svelte';

	onMount(() => {
		fetchWeekData();
	});

	async function fetchWeekData() {
		const response = await fetch($serverUrl + '/api/weeks');
		$weeksData = await response.json();
	}
</script>

{#if $weeksData}
	{#each Object.entries($weeksData) as [year, yearData]}
		{#each Object.entries(yearData) as [weekNumber, weekInfo]}
			<div class="week-box">
				<h2>Week {weekInfo.weekNumber}</h2>
				<p>Start Date: {weekInfo.startDate}</p>
				<p>End Date: {weekInfo.endDate}</p>
				{#if weekInfo.categories}
					{#each Object.entries(weekInfo.categories) as [category, categoryData]}
						<div class="category-box">
							<h3>{category}</h3>
							<ul>
								{#await fetch($serverUrl + categoryData.notesUrl).then( (response) => response.json() ) then notes}
									{#each notes as note}
										<li>
											<p>{note.text}</p>
											<p>Created: {note.createDate}</p>
										</li>
									{/each}
								{/await}
							</ul>
						</div>
					{/each}
				{/if}
			</div>
		{/each}
	{/each}
{/if}

<style>
	.week-box {
		border: 1px solid #ccc;
		padding: 10px;
		margin: 10px;
	}
	.category-box {
		border: 1px solid #ddd;
		padding: 5px;
		margin: 5px;
	}
</style>
