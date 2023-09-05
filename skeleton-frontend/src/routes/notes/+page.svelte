<script lang="ts">
  import NoteTaker from './NoteTaker.svelte'
  import NoteGrid from './NoteGrid.svelte'

  let createNote: () => void

  function documentClick(event: MouseEvent) {
    if (event.target?.parentNode.id === 'page') {
      createNote()
    }
  }
</script>

<svelte:window on:mousedown={documentClick} />

<NoteTaker bind:createNote />
<NoteGrid />
