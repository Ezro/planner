<script lang="ts">
  import '@skeletonlabs/skeleton/themes/theme-skeleton.css'
  import '@skeletonlabs/skeleton/styles/skeleton.css'
  import '../app.postcss'
  import { page } from '$app/stores'
  import { AppBar, AppRail, AppRailTile, AppShell } from '@skeletonlabs/skeleton'
  let currentTile: Number = 0
</script>

<svelte:head>
  <title>SvelteKit Auth</title>
</svelte:head>

<AppShell>
  <svelte:fragment slot="header">
    <AppBar>
      {#if !$page.data.user}
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      {/if}
      {#if $page.data.user}
        <a href="/admin">Admin</a>
        <form action="/logout" method="POST">
          <button type="submit">Log out</button>
        </form>
      {/if}
    </AppBar>
  </svelte:fragment>
  <svelte:fragment slot="sidebarLeft">
    {#if $page.data.user}
      <AppRail>
        <AppRailTile bind:group={currentTile} name="tile-1" value={0} title="tile-1">
          <svelte:fragment slot="lead">(icon)</svelte:fragment>
          <span>Tile 1</span>
        </AppRailTile>
        <AppRailTile bind:group={currentTile} name="tile-2" value={1} title="tile-2">
          <svelte:fragment slot="lead">(icon)</svelte:fragment>
          <span>Tile 2</span>
        </AppRailTile>
        <AppRailTile bind:group={currentTile} name="tile-3" value={2} title="tile-3">
          <svelte:fragment slot="lead">(icon)</svelte:fragment>
          <span>Tile 3</span>
        </AppRailTile>
      </AppRail>
    {/if}
  </svelte:fragment>
  <slot />
</AppShell>
