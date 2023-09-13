<script lang="ts">
  import '../../styles/tiptap.scss'
  import '../../styles/taskListStyles.scss'
  import StarterKit from '@tiptap/starter-kit'
  import { Editor } from '@tiptap/core'
  import TaskList from '@tiptap/extension-task-list'
  import TaskItem from '@tiptap/extension-task-item'
  import { Image as TipTapImage } from '@tiptap/extension-image'
  import { onMount, onDestroy } from 'svelte'
  import NoteEditBar from './NoteEditBar.svelte'

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

  export function addImage(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
    let image = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(image)
    reader.onload = (e) => {
      console.log('addImage', e.target.result)
      editor.commands.setImage({ src: e.target.result })
    }
  }
</script>

<NoteEditBar bind:editor />
<div bind:this={element} />
