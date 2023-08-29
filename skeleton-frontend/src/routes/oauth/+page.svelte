<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { userAuthenticated } from '../store';
  import { Page, currentPage } from '../globals';

  onMount(() => {
    userAuthenticated.useLocalStorage();
    // userAuthenticated.set(true);
    currentPage.set(Page.Weeks);
    goto('/');
  });
</script>
