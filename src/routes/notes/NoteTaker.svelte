<script lang="ts">
  import { onMount } from 'svelte'
  import { notes, nextNoteId } from './noteStore'
  import NoteTakerInput from './NoteTakerInput.svelte'
  import type { Note } from './Note'
  let _notes: { [key: number]: Note }
  let _nextNoteId: number

  let takingNote: boolean = false
  let noteTitle = ''

  let getHTML: () => string

  onMount(() => {
    notes.subscribe((value) => (_notes = value))
    nextNoteId.subscribe((value) => (_nextNoteId = value))
  })

  function openNoteTaking() {
    takingNote = true
  }

  export async function createNote() {
    if (!getHTML || !takingNote) {
      return
    }
    takingNote = false
    let noteInputValue = getHTML()
    if (noteTitle === '' && (noteInputValue === '' || noteInputValue === '<p></p>')) {
      return
    }
    try {
      let title = noteTitle
      let body = noteInputValue
      let id = undefined
      let postBody = JSON.stringify({ title, body, id })
      console.log('postBody', postBody)
      const response = await fetch('/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: postBody
      })

      if (response.status === 201) {
        const { noteId } = await response.json()
        console.log('Note and NoteEvent created:', noteId)
        _nextNoteId = noteId
        let note: Note = {
          id: _nextNoteId,
          title: noteTitle,
          time: Date.now(),
          body: noteInputValue
        }
        _notes[_nextNoteId] = note
        notes.set(_notes)
        nextNoteId.set(_nextNoteId)
      } else {
        console.error('Error creating Note and NoteEvent')
      }
    } catch (error) {
      console.error('Error:', error)
    }
    noteTitle = ''
    noteInputValue = ''
  }
</script>

{#if takingNote}
  <div id="notetaker" class="card note-creator">
    <div id="notetaker" class="p-4 space-y-4">
      <form id="notetaker" on:submit={createNote}>
        <input bind:value={noteTitle} placeholder="Title" />
      </form>
      <NoteTakerInput bind:getHTML />
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
</style>
