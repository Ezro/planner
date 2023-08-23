<script>
	import { serverUrl, selectedYear, selectedWeek, weekData, prevYear, prevWeek } from './stores.js';

	export async function refresh(year, week) {
		if ((year != $prevYear) | (week != $prevWeek)) {
			$selectedYear = year;
			$selectedWeek = week;
			console.log(year, week);
			let fetchUrl = `${$serverUrl}/api/weeks/${year}/${week}`;
			const response = await fetch(fetchUrl);
			const responseData = await response.json();
			$weekData = responseData;
			$prevYear = year;
			$prevWeek = week;
		}
	}
</script>

{#if $selectedYear & $selectedWeek}
	{#if $weekData}
		<div class="week-data">
			<h2>Week Number: {$weekData.weekNumber}</h2>
			<p>Start Date: {$weekData.startDate}</p>
			<p>End Date: {$weekData.endDate}</p>
			{#if $weekData.categories}
				<div class="categories">
					{#each Object.entries($weekData.categories) as [category, categoryData]}
						<div class="category">
							<h3>{category}</h3>
							<p>Notes URL: {categoryData.notesUrl}</p>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	{/if}
{/if}

<style>
</style>
