<script lang="ts">
  import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton'
  import { Trash2Icon } from 'svelte-feather-icons'
  import { notes } from './noteStore'
  import { onMount } from 'svelte'
  import NoteDisplay from './NoteDisplay.svelte'
  import type { Note } from './Note'

  let _notes: { [key: number]: Note }
  let openedNoteId: number = 0
  let editable = false

  onMount(() => {
    notes.subscribe((value) => {
      _notes = value
    })
  })

  function openNote(noteIdStr: string) {
    openedNoteId = parseInt(noteIdStr)
    let note = _notes[openedNoteId]
    const modalSettings: ModalSettings = {
      type: 'component',
      component: 'noteModal',
      title: note.title,
      body: note.body,
      response: closeNote
    }
    modalStore.trigger(modalSettings)
  }

  export function closeNote(modifiedTitle: string, modifiedBody: string) {
    console.log('closeNote', modifiedTitle, modifiedBody)
    if (modifiedTitle === undefined || modifiedBody === undefined) {
      return
    }
    _notes[openedNoteId].title = modifiedTitle
    _notes[openedNoteId].body = modifiedBody
    notes.set(_notes)
  }

  function deleteNote(noteIdStr: string) {
    let parsedNoteId = parseInt(noteIdStr)
    delete _notes[parsedNoteId]
    notes.set(_notes)
  }

  let getHTML: () => string
</script>

{#if _notes}
  <div class="note-grid">
    {#each Object.entries(_notes).reverse() as [noteId, note]}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="note card card-hover">
        {#if note.title}
          <div class="card-header">
            <h6 class="h6" data-toc-ignore>{note.title}</h6>
          </div>
        {/if}
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
          class="p-4 space-y-4"
          style="word-wrap: break-word;"
          on:click={() => {
            openNote(noteId)
          }}
        >
          {#if note.body}
            <article>
              {#key note.body}
                <NoteDisplay bind:content={note.body} bind:editable bind:getHTML />
              {/key}
            </article>
          {/if}
        </div>
        <div class="card card-footer">
          <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
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
{/if}

<style>
  .note-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(min(10rem, 100%), 1fr));
    margin: 2rem;
    align-items: flex-start;
  }
</style>
