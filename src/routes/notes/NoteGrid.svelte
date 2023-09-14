<script lang="ts">
  import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton'
  import { Trash2Icon } from 'svelte-feather-icons'
  import { notes } from './noteStore'
  import NoteDisplay from './NoteDisplay.svelte'
  import type { Note } from './Note'
  import { onMount } from 'svelte'
  import { page } from '$app/stores'

  let _notes: { [key: string]: Note }
  let openedNoteUuid: string = ''
  let editable = false

  onMount(() => {
    notes.subscribe((value) => {
      _notes = value
    })
    notes.set($page.data.user.notes)
  })

  function openNote(noteUuid: string) {
    let note = _notes[noteUuid]
    openedNoteUuid = noteUuid
    const modalSettings: ModalSettings = {
      type: 'component',
      component: 'noteModal',
      title: note.title,
      body: note.body,
      response: closeNote
    }
    modalStore.trigger(modalSettings)
  }

  export async function closeNote(modifiedTitle: string, modifiedBody: string) {
    if (modifiedTitle === undefined || modifiedBody === undefined) {
      return
    }
    try {
      let title = modifiedTitle
      let body = modifiedBody
      let uuid = openedNoteUuid
      const response = await fetch('/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, body, uuid })
      })

      if (response.status === 201) {
        const { uuid } = await response.json()
        _notes[openedNoteUuid].title = modifiedTitle
        _notes[openedNoteUuid].body = modifiedBody
        notes.set(_notes)
      } else {
        console.error('Error creating Note and NoteEvent')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  async function deleteNote(uuid: string) {
    try {
      console.log('deleteNote', uuid)
      const response = await fetch('/notes', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uuid })
      })

      if (response.status === 200) {
        const { uuid } = await response.json()
        delete _notes[uuid]
        notes.set(_notes)
      } else {
        console.error('Error delete Note and NoteEvent')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  let getHTML: () => string
</script>

{#if _notes}
  <div class="note-grid">
    {#each Object.entries(_notes).reverse() as [noteUuid, note]}
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
            openNote(noteUuid)
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
              deleteNote(noteUuid)
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
