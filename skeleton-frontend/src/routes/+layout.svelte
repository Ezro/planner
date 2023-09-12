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
  import { IconFileTime, IconLogout, IconNotebook, IconNotes } from '@tabler/icons-svelte'
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
          <a href="/admin">{$page.data.user.name}</a>
        {/if}
      </svelte:fragment>
      <svelte:fragment slot="trail">
        {#if $page.data.user}
          <form action="/logout" method="POST">
            <button class="btn variant-soft-surface btn-sm hover:variant-soft-primary">
              Sign Out
              <IconLogout size="24" />
            </button>
          </form>
        {/if}
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
  <svelte:fragment slot="sidebarLeft">
    {#if $page.data.user}
      <AppRail>
        <AppRailAnchor href="/notes" title="notes" selected="true">
          <!-- <FileIcon size="24" />
          <span>Notes</span> -->
          <svelte:fragment slot="lead">
            <IconNotes size="24" />
          </svelte:fragment>
          Notes
        </AppRailAnchor>
        <AppRailAnchor href="/" title="something-else">
          <svelte:fragment slot="lead">
            <IconNotebook size="24" />
          </svelte:fragment>
          Pages
        </AppRailAnchor>
        <AppRailAnchor href="/" title="something-else">
          <svelte:fragment slot="lead">
            <IconFileTime size="24" />
          </svelte:fragment>
          History
        </AppRailAnchor>
      </AppRail>
    {/if}
  </svelte:fragment>
  <slot />
</AppShell>
