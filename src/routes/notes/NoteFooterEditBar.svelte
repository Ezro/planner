<script lang="ts">
  import type { Editor } from '@tiptap/core'
  import { ImageIcon } from 'svelte-feather-icons'

  export let editor: Editor

  let fileInput: HTMLInputElement

  const onClick = () => {
    fileInput.click()
  }

  const onFileSelected = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
    let image = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(image)
    reader.onload = (e) => {
      editor.commands.setImage({ src: e.target.result })
    }
  }
</script>

<div class="create-note-footer">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <form style="width: 18px" on:click={onClick}>
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

<style>
  .create-note-footer {
    display: flex;
  }
</style>
