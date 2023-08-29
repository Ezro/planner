<!-- <script lang="ts">
  import Skeleton from './Skeleton.svelte'
  import Login from './Login.svelte'
  import { userAuthenticated } from './store'
  import { onMount } from 'svelte'

  onMount(() => {
    start()
  })

  export function start() {
    userAuthenticated.useLocalStorage()
  }
</script>

{#if $userAuthenticated}
  <Skeleton />
{:else}
  <Login />
{/if} -->
