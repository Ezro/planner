<script lang="ts">
  import { onMount } from 'svelte'
  import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton'

  let takingNote = false

  onMount(() => {
    console.log('notes page')
  })

  function openNote() {
    const modal: ModalSettings = {
      type: 'prompt',
      title: 'Example Note',
      body: 'This is an example note.',
      image: 'https://i.imgur.com/WOgTG96.gif'
    }
    modalStore.trigger(modal)
  }

  function documentClick(event: MouseEvent) {
    if (event.target.parentNode.id !== 'notetaker') {
      takingNote = false
    }
  }
</script>

<svelte:window on:mousedown={documentClick} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if !takingNote}
  <div class="card note-creator" on:click={() => (takingNote = true)}>
    <input placeholder="Take a note..." />
  </div>
{:else}
  <div id="notetaker" class="card note-creator">
    <input placeholder="Title" />
    <input placeholder="Take a note..." />
  </div>
{/if}
<div class="note-grid">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="note card card-hover" on:click={openNote}>
    <header>
      <img
        src="https://images.unsplash.com/photo-1620562303747-ba21ca6f1530?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzY2MjR8&ixlib=rb-4.0.3&w=400&h=175&auto=format&fit=crop"
        alt="Vibrant sombrero skeleton with a guitar"
      />
    </header>
    <div class="p-4 space-y-4">
      <h6 class="h6" data-toc-ignore>Announcements</h6>
      <h3 class="h3" data-toc-ignore>Skeleton is Awesome!</h3>
      <article>
        <p>
          <!-- cspell:disable -->
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam aspernatur provident eveniet
          eligendi cumque consequatur tempore sint nisi sapiente. Iste beatae laboriosam iure molestias
          cum expedita architecto itaque quae rem.
          <!-- cspell:enable -->
        </p>
      </article>
    </div>
    <hr class="opacity-50" />
    <footer class="p-4 flex justify-start items-center space-x-4">
      <div class="flex-auto flex justify-between items-center">
        <h6 class="font-bold" data-toc-ignore>By Alex</h6>
        <small>On {new Date().toLocaleDateString()}</small>
      </div>
    </footer>
  </div>

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="note card card-hover" on:click={openNote}>
    <div class="p-4 space-y-4">
      <h6 class="h6" data-toc-ignore>Announcements</h6>
      <h3 class="h3" data-toc-ignore>Skeleton is Awesome!</h3>
      <article>
        <p>
          <!-- cspell:disable -->
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam aspernatur provident eveniet
          eligendi cumque consequatur tempore sint nisi sapiente. Iste beatae laboriosam iure molestias
          cum expedita architecto itaque quae rem.
          <!-- cspell:enable -->
        </p>
      </article>
    </div>
  </div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="note card card-hover" on:click={openNote}>
    <div class="p-4 space-y-4">
      <article>
        <p>Hi</p>
      </article>
    </div>
  </div>
</div>

<style>
  .note-creator {
    display: flex;
    margin: 2rem;
    max-width: 20rem;
    align-content: center;
  }
  .note-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(min(10rem, 100%), 1fr));
    margin: 2rem;
    align-items: flex-start;
  }
</style>
