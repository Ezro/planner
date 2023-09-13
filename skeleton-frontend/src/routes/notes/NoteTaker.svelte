<script lang="ts">
  import { onMount } from 'svelte'
  import { ImageIcon } from 'svelte-feather-icons'
  import { notes, nextNoteId } from './noteStore'
  import NoteTakerInput from './NoteTakerInput.svelte'
  import type { Note } from './Note'
  import NoteEditBar from './NoteEditBar.svelte'
  let _notes: { [key: number]: Note }
  let _nextNoteId: number

  let takingNote: boolean = false
  let noteTitle = ''

  let getHTML: () => string
  let addImage: (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => string

  onMount(() => {
    notes.subscribe((value) => (_notes = value))
    nextNoteId.subscribe((value) => (_nextNoteId = value))
  })

  function openNoteTaking() {
    takingNote = true
  }

  export function createNote() {
    if (!getHTML || !takingNote) {
      return
    }
    takingNote = false
    let noteInputValue = getHTML()
    console.log('createNote', noteInputValue)
    if (noteTitle === '' && (noteInputValue === '' || noteInputValue === '<p></p>')) {
      return
    }
    let note: Note = {
      id: _nextNoteId,
      title: noteTitle,
      createTime: Date.now(),
      body: noteInputValue
    }
    _notes[_nextNoteId] = note
    _nextNoteId += 1
    notes.set(_notes)
    nextNoteId.set(_nextNoteId)
    noteTitle = ''
    noteInputValue = ''
  }

  let fileInput: HTMLInputElement

  const onClick = () => {
    fileInput.click()
  }

  const onFileSelected = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
    addImage(e)
  }
</script>

{#if takingNote}
  <div id="notetaker" class="card note-creator">
    <div id="notetaker" class="p-4 space-y-4">
      <form id="notetaker" on:submit={createNote}>
        <input bind:value={noteTitle} placeholder="Title" />
      </form>
      <NoteTakerInput bind:getHTML bind:addImage />
    </div>
    <div class="card-footer create-note-footer">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <form style="width: 18px; padding-top: 15px" on:click={onClick}>
        <ImageIcon size="18" />
        <input
          style="display:none"
          aria-label="lorem ipsum"
          type="file"
          accept=".jpg, .jpeg, .png"
          on:change={(e) => onFileSelected(e)}
          bind:this={fileInput}
        />
      </form>
    </div>
  </div>
{:else}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="card note-creator" on:click={openNoteTaking}>
    <div class="p-4 space-y-4">
      <input placeholder="Take a note..." />
    </div>
  </div>
{/if}

<style>
  .note-creator {
    margin: 2rem;
    max-width: 20rem;
    align-content: center;
  }
  .create-note-footer {
    display: flex;
  }
</style>
