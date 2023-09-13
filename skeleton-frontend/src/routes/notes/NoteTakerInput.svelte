<script lang="ts">
  import '../../styles/tiptap.scss'
  import '../../styles/taskListStyles.scss'
  import StarterKit from '@tiptap/starter-kit'
  import { Editor } from '@tiptap/core'
  import TaskList from '@tiptap/extension-task-list'
  import TaskItem from '@tiptap/extension-task-item'
  import { Image as TipTapImage } from '@tiptap/extension-image'
  import { onMount, onDestroy } from 'svelte'
  import NoteHeaderEditBar from './NoteHeaderEditBar.svelte'
  import NoteFooterEditBar from './NoteFooterEditBar.svelte'

  let element: HTMLDivElement
  let editor: Editor

  onMount(() => {
    editor = new Editor({
      element: element,
      extensions: [StarterKit, TaskList, TaskItem, TipTapImage],
      content: ``,
      onTransaction: () => {
        // force re-render so `editor.isActive` works as expected
        editor = editor
      }
    })
    editor.commands.focus()
  })

  onDestroy(() => {
    editor.destroy()
  })

  export function getHTML(): string {
    return editor.getHTML()
  }
</script>

{#if editor}
  <NoteHeaderEditBar bind:editor />
{/if}
<div bind:this={element} />
{#if editor}
  <NoteFooterEditBar bind:editor />
{/if}
