<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  export let content: string

  onMount(() => {
    console.log(content)
  })

  onDestroy(() => {
    console.log('onDestroy')
  })
</script>

{#if content}
  <div>{content}</div>
{/if}
