<script lang="ts">
  import { onMount } from 'svelte'
  import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton'
  import { ImageIcon, Trash2Icon } from 'svelte-feather-icons'

  let takingNote = false
  let noteTitle = ''
  let noteInputValue = ''
  let noteInput: HTMLInputElement
  let notes = {}
  let noteId = 0
  let noteImages: FileList

  onMount(() => {
    // console.log('notes page');
  })

  function openNote(event: MouseEvent) {
    if (event.target?.closest('.card-footer')) {
      return
    }
    const modal: ModalSettings = {
      type: 'prompt',
      title: 'Example Note',
      body: 'This is an example note.',
      image: 'https://i.imgur.com/WOgTG96.gif'
    }
    modalStore.trigger(modal)
  }

  function documentClick(event: MouseEvent) {
    if (event.target?.parentNode.id !== 'notetaker') {
      createNote()
    }
  }

  function openNoteTaking() {
    takingNote = true
    setTimeout(() => {
      noteInput.focus()
    })
  }

  function createNote() {
    takingNote = false
    if (noteTitle === '' && noteInputValue === '') {
      return
    }
    let note = {
      title: noteTitle,
      createTime: Date.now(),
      body: noteInputValue
    }
    notes[noteId] = note
    notes = notes
    noteId += 1
    noteTitle = ''
    noteInputValue = ''
  }

  function deleteNote(noteIdStr: string) {
    noteId = parseInt(noteIdStr)
    delete notes[noteId]
    notes = notes
  }

  //   {
  //     "name": string,
  //     "createTime": string,
  //     "updateTime": string,
  //     "trashTime": string,
  //     "trashed": boolean,
  //     "attachments": [
  //         {
  //             object(Attachment)
  //         }
  //     ],
  //     "permissions": [
  //         {
  //             object(Permission)
  //         }
  //     ],
  //     "title": string,
  //     "body":
  //     {
  //         object(Section)
  //     }
  //   }
</script>

<svelte:window on:mousedown={documentClick} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if !takingNote}
  <div class="card note-creator" on:click={openNoteTaking}>
    <div class="p-4 space-y-4">
      <input placeholder="Take a note..." />
    </div>
  </div>
{:else}
  <div id="notetaker" class="card note-creator">
    <div id="notetaker" class="p-4 space-y-4">
      <form id="notetaker" on:submit|preventDefault={createNote}>
        <input bind:value={noteTitle} placeholder="Title" />
      </form>
      <form id="notetaker" on:submit|preventDefault={createNote}>
        <input
          bind:this={noteInput}
          bind:value={noteInputValue}
          placeholder="Take a note..."
          on:submit={createNote}
        />
      </form>
    </div>
    <div class="card-footer create-note-footer">
      <form style="width: 18px; padding-top: 15px">
        <ImageIcon size="18" />
      </form>
      <form style="width: 18px; padding-top: 15px">
        <Trash2Icon size="18" />
      </form>
    </div>
  </div>
{/if}
<div class="note-grid">
  {#each Object.entries(notes).reverse() as [noteId, note]}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="note card card-hover"
      on:click={() => {
        openNote(noteId)
      }}
    >
      {#if note.title}
        <div class="card-header">
          <h6 class="h6" data-toc-ignore>{note.title}</h6>
        </div>
      {/if}
      <div class="p-4 space-y-4">
        <article>
          <p>
            <!-- cspell:disable -->
            {note.body}
            <!-- cspell:enable -->
          </p>
        </article>
      </div>
      <div class="card card-footer">
        <form
          on:click={() => {
            deleteNote(noteId)
          }}
          style="width: 18px; padding-top: 15px"
        >
          <Trash2Icon size="18" />
        </form>
      </div>
    </div>
  {/each}
</div>

<style>
  .note-creator {
    display: flex;
    margin: 2rem;
    max-width: 20rem;
    align-content: center;
  }
  .create-note-footer {
    display: flex;
  }
  .note-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(min(10rem, 100%), 1fr));
    margin: 2rem;
    align-items: flex-start;
  }
</style>
