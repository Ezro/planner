<script lang="ts">
  import { onMount } from 'svelte'
  import { ImageIcon, Trash2Icon } from 'svelte-feather-icons'
  import { notes, nextNoteId } from './noteStore'

  let _notes: { [key: number]: Note }
  let _nextNoteId: number

  let takingNote: boolean = false
  let noteTitle = ''
  let noteInputValue: string = ''
  let noteInput: HTMLDivElement

  onMount(() => {
    notes.subscribe((value) => (_notes = value))
    nextNoteId.subscribe((value) => (_nextNoteId = value))
  })

  function openNoteTaking() {
    takingNote = true
    setTimeout(() => {
      noteInput.focus()
    })
  }

  export function createNote() {
    takingNote = false
    if (noteTitle === '' && noteInputValue === '') {
      return
    }
    let note: Note = {
      title: noteTitle,
      createTime: Date.now(),
      body: noteInputValue
    }
    _notes[_nextNoteId] = note
    notes.set(_notes)
    _nextNoteId += 1
    nextNoteId.set(_nextNoteId)
    noteTitle = ''
    noteInputValue = ''
  }
</script>

{#if !takingNote}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="card note-creator" on:click={openNoteTaking}>
    <div class="p-4 space-y-4">
      <input placeholder="Take a note..." />
    </div>
  </div>
{:else}
  <div id="notetaker" class="card note-creator">
    <div id="notetaker" class="p-4 space-y-4">
      <form id="notetaker" on:submit={createNote}>
        <input bind:value={noteTitle} placeholder="Title" />
      </form>
      <form id="notetaker" on:submit>
        <div contenteditable="true" bind:this={noteInput} bind:innerText={noteInputValue} />
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
</style>
