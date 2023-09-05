<script lang="ts">
  import { onMount } from 'svelte'
  import { modalStore } from '@skeletonlabs/skeleton'
  let noteTitle: string
  let noteInputValue: string

  onMount(() => {
    noteTitle = $modalStore[0].title ?? ''
    noteInputValue = $modalStore[0].body ?? ''
  })
  // Props
  /** Exposes parent props to this component. */
  export let parent: any

  // We've created a custom submit function to pass the response and close the modal.
  function onFormSubmit(): void {
    // if ($modalStore[0].response) $modalStore[0].response(formData)
    $modalStore[0].response(noteTitle, noteInputValue)
    modalStore.close()
  }

  // Base Classes
  const cBase = 'card p-4 w-modal shadow-xl space-y-4'
  const cHeader = 'text-2xl font-bold'
</script>

{#if $modalStore[0]}
  <div class={cBase}>
    <header class={cHeader}>
      <div contenteditable="true" bind:innerText={noteTitle} />
    </header>
    <article>
      <textarea bind:value={noteInputValue} class="note-body" />
    </article>
    <!-- prettier-ignore -->
    <footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={() => modalStore.close()}>Cancel</button>
        <button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Save</button>
    </footer>
  </div>
{/if}

<style>
  .note-body {
    color: black;
    width: 100%;
    height: 12rem;
  }
</style>
