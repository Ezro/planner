<script lang="ts">
  import '../../styles/tiptap.scss'
  import '../../styles/taskListStyles.scss'
  import { onMount, onDestroy } from 'svelte'
  import StarterKit from '@tiptap/starter-kit'
  import { Editor } from '@tiptap/core'
  import TaskList from '@tiptap/extension-task-list'
  import TaskItem from '@tiptap/extension-task-item'

  let element: HTMLDivElement
  let editor: Editor
  export let content: string

  onMount(() => {
    console.log(content)
    editor = new Editor({
      element: element,
      extensions: [StarterKit, TaskList, TaskItem],
      content: content,
      editable: false
    })
  })

  onDestroy(() => {
    editor.destroy()
  })
</script>

<div bind:this={element} />
