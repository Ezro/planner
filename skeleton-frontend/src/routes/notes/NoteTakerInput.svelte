<script lang="ts">
  import '../../styles/tiptap.scss'
  import '../../styles/taskListStyles.scss'
  import StarterKit from '@tiptap/starter-kit'
  import { Editor } from '@tiptap/core'
  import TaskList from '@tiptap/extension-task-list'
  import TaskItem from '@tiptap/extension-task-item'
  import { onMount, onDestroy } from 'svelte'
  import {
    IconArrowBackUp,
    IconArrowForwardUp,
    IconBlockquote,
    IconBold,
    IconCheckbox,
    IconCode,
    IconFileCode,
    IconItalic,
    IconLetterP,
    IconList,
    IconListNumbers,
    IconSeparatorHorizontal,
    IconStrikethrough
  } from '@tabler/icons-svelte'

  let element: HTMLDivElement
  let editor: Editor
  let iconSize: number = 18
  let iconStroke: number = 2

  onMount(() => {
    editor = new Editor({
      element: element,
      extensions: [StarterKit, TaskList, TaskItem],
      content: ``,
      onTransaction: () => {
        // force re-render so `editor.isActive` works as expected
        editor = editor
      }
    })
  })

  onDestroy(() => {
    editor.destroy()
  })

  export function getHTML(): string {
    return editor.getHTML()
  }
</script>

{#if editor}
  <div>
    <div>
      <button
        on:click={() => editor.chain().focus().toggleTaskList().run()}
        disabled={!editor.can().chain().focus().toggleTaskList().run()}
        class={editor.isActive('taskList') ? 'is-active' : ''}
      >
        <IconCheckbox size={iconSize} stroke={iconStroke} />
      </button>
      <button
        on:click={() => console.log && editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        class={editor.isActive('bold') ? 'is-active' : ''}
      >
        <IconBold size={iconSize} stroke={iconStroke} />
      </button>
      <button
        on:click={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        class={editor.isActive('italic') ? 'is-active' : ''}
      >
        <IconItalic size={iconSize} stroke={iconStroke} />
      </button>
      <button
        on:click={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        class={editor.isActive('strike') ? 'is-active' : ''}
      >
        <IconStrikethrough size={iconSize} stroke={iconStroke} />
      </button>
      <button
        on:click={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        class={editor.isActive('code') ? 'is-active' : ''}
      >
        <IconCode size={iconSize} stroke={iconStroke} />
      </button>
      <button
        on:click={() => editor.chain().focus().setParagraph().run()}
        class={editor.isActive('paragraph') ? 'is-active' : ''}
      >
        <IconLetterP size={iconSize} stroke={iconStroke} />
      </button>
      <button
        on:click={() => editor.chain().focus().toggleBulletList().run()}
        class={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        <IconList size={iconSize} stroke={iconStroke} />
      </button>
      <button
        on:click={() => editor.chain().focus().toggleOrderedList().run()}
        class={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        <IconListNumbers size={iconSize} stroke={iconStroke} />
      </button>
      <button
        on:click={() => editor.chain().focus().toggleCodeBlock().run()}
        class={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        <IconFileCode size={iconSize} stroke={iconStroke} />
      </button>
      <button
        on:click={() => editor.chain().focus().toggleBlockquote().run()}
        class={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        <IconBlockquote size={iconSize} stroke={iconStroke} />
      </button>
      <button on:click={() => editor.chain().focus().setHorizontalRule().run()}>
        <IconSeparatorHorizontal size={iconSize} stroke={iconStroke} />
      </button>
      <button
        on:click={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <IconArrowBackUp size={iconSize} stroke={iconStroke} />
      </button>
      <button
        on:click={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <IconArrowForwardUp size={iconSize} stroke={iconStroke} />
      </button>
    </div>
  </div>
{/if}
<div bind:this={element} />
