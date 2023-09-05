<script lang="ts">
  import '@skeletonlabs/skeleton/themes/theme-skeleton.css'
  import '@skeletonlabs/skeleton/styles/skeleton.css'
  import '../app.postcss'
  import { page } from '$app/stores'
  import {
    AppBar,
    AppRail,
    AppRailAnchor,
    AppShell,
    Modal,
    type ModalComponent
  } from '@skeletonlabs/skeleton'
  import { FileIcon } from 'svelte-feather-icons'
  import NoteModal from './notes/NoteModal.svelte'
  const modalComponentRegistry: Record<string, ModalComponent> = {
    noteModal: { ref: NoteModal }
  }
</script>

<Modal components={modalComponentRegistry} />

<svelte:head>
  <title>Planner</title>
</svelte:head>

<AppShell>
  <svelte:fragment slot="header">
    <AppBar>
      <svelte:fragment slot="lead">
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
      </svelte:fragment>
      <svelte:fragment slot="trail">
        {#if $page.data.user}
          <label for="user">{$page.data.user.name}</label>
        {/if}
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
  <svelte:fragment slot="sidebarLeft">
    {#if $page.data.user}
      <AppRail>
        <AppRailAnchor href="/notes" title="notes" selected="true">
          <FileIcon size="24" />
          <span>Notes</span>
        </AppRailAnchor>
        <AppRailAnchor href="/" title="something-else">
          <FileIcon size="24" />
          <span>Something Else</span>
        </AppRailAnchor>
      </AppRail>
    {/if}
  </svelte:fragment>
  <slot />
</AppShell>
